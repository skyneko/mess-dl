"use strict"

const request = require("request-promise")
const qs = require("querystring")
const downloadAll = require("./downloader")
const utils = require("./utils")

/**  
 * request và trả về dữ liệu ảnh. 
 * @param {Object} userData
 * @param {Int} groupID 
 * @return {Array} image url 
 */
async function getImageData(userData, groupID, limit) {

    let uid = utils.getUIDFromCookie(userData.cookie)
    let imageCount = 0
    let result = []

    // nếu số lượng ảnh trong 1 lần request lớn hơn limit 
    let dataLength = (utils.dataLength > limit) ? limit : utils.dataLength 
    
    const form = qs.stringify({
        __user: uid,
        __a: '1',
        __dyn:
            '7AgNeQ4qmfxd2u6aJGeFxqewRyWzEsheC11xGdwIhE98nwgUaoepovHyorxuEbbxWUW3KawUz8S2SUS4e2q6oszaxbwq8kxa2m4oqwi88U8k3GEd821CwlU4W4rG7ooxu6Uao4a5oaUvw9G78-U8U6a6oix62Px-8xLwzxmfz9rxC2i0-qG69FXAy8aEaoGqfwl8cEry84uq2l2UtxXx-2y8xa487m7EbUbGwCxe1Ty9o9o-7EowrU4S2G3y0yU',
        __csr: '',
        __req: '22',
        __beoa: '0',
        __pc: 'PHASED:DEFAULT',
        dpr: '1',
        __rev: '1001812466',
        __s: 'jbr7e8:hmkp2q:s1b9ts',
        __hsi: '6802563110380840034-0',
        __comet_req: '0',
        fb_dtsg: userData.fb_dtsg,
        jazoest: '22006',
        __spin_r: '1001812466',
        __spin_b: 'trunk',
        __spin_t: '1583805019'
    });

    /**
     * Xử lý mảng url sau khi lấy hết 
     * @param {Array} result
     * @return {None} 
     */
    function onComplete(result) {
        downloadAll(result, "./images", () => console.log("done."))
    }

    /**  
     * Sử dụng đệ quy để request lần lượt.
     * Facebook lưu thứ tự ảnh dưói dạng môt dãy ngẫu nhiên gọi là cursor, 
     * dùng cursor đứng trước để request cái tiếp theo 
     * @param {String} cursor
     * @return {None}
     */
    (async function get(cursor) {

        let query = qs.stringify({
            query_id: '515216185516880',
            variables:
                JSON.stringify({
                    id: groupID,
                    after:
                        cursor,
                    first: dataLength
                })
        })
    
        let res = await request({
            method: "POST",
            headers: utils.createHeaders(userData.cookie),
            body: form,
            uri: 'https://www.facebook.com/webgraphql/query/?' + query
        })
    
        /* handle response data */ 
        let json = JSON.parse(res.slice(res.indexOf('{"'), res.length) /*  loại bỏ for (;;); để data về chuỗi json */ )  
    
        json.payload[groupID].message_shared_media.edges.forEach(e => {
            
            if ((++imageCount) <= limit)
                result.push({ image: e.node.image2.uri, id: e.node.legacy_attachment_id, cursor: e.cursor })
        })

        let lastCursor = (result[result.length - 1] !== undefined) ? result[result.length - 1].cursor : null

        if (imageCount < limit && lastCursor !== null) 
            get(lastCursor)
        else 
            onComplete(result) 

    })(utils.startCursor)

}

module.exports = getImageData