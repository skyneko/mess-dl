"use strict"

const request = require("request-promise")

module.exports = {

    /* config */
    startCursor: "", // cursor ban đầu, nếu muốn tải từ vị trí từ cuối -> đầu thì để trống.
    dataLength: 200, // số data lấy được trong mỗi request.
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
     * @param {String} curl
     * @return {Object}  
     */
    getUserDataFromRequestHeaders: function (headerString) {

        let result = new Object()
    
        headerString.split("\n").forEach(e => {
    
            if (e.split(":")[0] === "Cookie")
                result.cookie = e.split(":")[1].trim()
            
            if (e.split(":")[0] === "User-Agent")
                result.userAgent = e.split(":")[1].trim()     
        })
    
        return result
    },

    /**
     * @param {String} cookie
     * @return {String}  
     */
    getFb_dtsg : function(cookie) {
        return new Promise ((resolve, reject) => {

            request({
                method: "GET",
                uri: "https://facebook.com/",
                headers: this.createHeaders(cookie)
            })
            .then(html => {
                
                let fb_dtsg = this.getFromHTML(html, 'name="fb_dtsg" value="', '"')
                resolve(fb_dtsg)
            })
            .catch(reject)
        })
    },

    /**
     * Lấy một giá trị phần tử trong chuỗi HTML
     * 
     * @param {String} str 
     * @param {String} startToken
     * @param {String} endToken
     * @return {String} 
     */
    getFromHTML: function (str, startToken, endToken) {
        var start = str.indexOf(startToken) + startToken.length;
        if (start < startToken.length) return "";

        var lastHalf = str.substring(start);
        var end = lastHalf.indexOf(endToken);
        if (end === -1) {
            throw Error(
                "Could not find endTime `" + endToken + "` in the given string."
            );
        }
        return lastHalf.substring(0, end);
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