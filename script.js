/* -- USER CONFIG --  */

const GROUP_ID = "1069656803112675" // id của group muốn tải về, có thể là userID 

const LIMIT = 50 // số lượng ảnh muốn tải về (tối đa) 


/* -- END USER CONFIG --*/

const getData = require("./src/getData")
const utils = require("./src/utils");

(async () => {

    let headerString = require("fs").readFileSync("./requestHeaders.txt", "utf-8")

    if (headerString.trim() === "") {
        return console.log("file requestHeader.txt trống, xem hướng dẫn tại: https://github.com/skyneko/mess-dl/blob/master/README.md")

    } else {

        console.log("fetching data ...")
        let userData = utils.getUserDataFromRequestHeaders(headerString)
        userData.fb_dtsg = await utils.getFb_dtsg(userData.cookie)
        
        if (LIMIT !== 0) getData(userData, parseInt(GROUP_ID), LIMIT)
    }

})()