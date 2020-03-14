"use strict"

module.exports = {

    /* config */
    startCursor: "", // cursor ban đầu, nếu muốn tải từ vị trí từ cuối -> đầu thì để trống.
    dataLength: 20, // số data lấy được trong mỗi request.
    thread: 5, // số ảnh download trong 1 lần.
    
    /**
     * Trả về request header
     * @param {String} cookie
     * @return {Object}  
     */
    createHeaders: function (cookie, userAgent) {

        userAgent = userAgent || 'Mozilla/,5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0'

        return {
            'User-Agent': userAgent,
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.facebook.com/messages/t/2252600751432999',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://www.facebook.com',
            'Connection': 'keep-alive',
            'TE': 'Trailers',
            'Cookie': (cookie) ? cookie : ""
        }
    },
    /**
     * Lấy user id từ cookie
     * @param {String} cookie
     * @return {Int} 
     */
    getUIDFromCookie: function (cookie) {

        let uid;
        cookie.split(";").forEach(e => {
    
            if (e.split("=")[0].trim() === "c_user")
                return uid = e.split("=")[1]
        })
    
        return uid
    },

    /**
     * Chia một số thành s phần bằng nhau  
     * @param {Int} n 
     * @param {Int} s 
     * @return {Array} 
     */
    arrNumberSplit: function (n,s) {
        let m = [];

            for (let i = 0; i < n / s; ++i) {
                m.push(s * i)
            }

            m.push(n)

            return m
    }

}