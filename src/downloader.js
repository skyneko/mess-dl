"use strict"

const request = require("request-promise")
const cliProgress = require('cli-progress')
const fs = require("fs")
const utils = require("./utils")

/* Progress Bar */
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

/**
 * Tải về và lưu một ảnh.
 * @param {String} url 
 * @param {String} path - nơi lưu file
 */
function download(url, path) {
    return new Promise((resolve) => {
        return request({
            method: "GET",
            headers: utils.createHeaders(),
            uri: url
        })
        .pipe(fs.createWriteStream(path))
        .on("close", () => resolve(path))
    })
} 

/**
 * Chia arrayUrl thành các phần bằng nhau có số lượng bằng thread
 * , sử dụng Promise.all download từng nhóm nhỏ.
 * Dùng đệ quy để download lần lượt từng nhóm.
 * 
 * callback: 
 * thực hiện sau khi hoàn tất.
 * 
 * @param {Array} arrayUrl
 * @param {String} dirName 
 * @return {None}
 * @callback {None} 
 */
function downloadAll (arrayUrl, dirName, callback) {

    /* kiểm tra dirName */
    if (!fs.existsSync(dirName))
        fs.mkdirSync(dirName)
    
    progressBar.start(arrayUrl.length, 0);

    let intArray = utils.arrNumberSplit(arrayUrl.length, utils.thread)

    /* số lần download */
    let count = 0;

    /* dùng đệ quy để loop lần lượt */
    (function loop(n) {
        let promiseArray = []

        // stack {thread} promise vào trong promiseArray
        for (let i=intArray[n]; i< intArray[n+1]; ++i) {

            let imagePath = dirName+"/"+(++count+1) +".jpg"
            
            if (arrayUrl[i+1] !== undefined)
                promiseArray.push( download(arrayUrl[i+1].image, imagePath) )
        }
        Promise.all(promiseArray)
            .then((imagePath) => {

                progressBar.increment(imagePath.length)

                if (intArray[n+1] !== undefined)
                    loop(n+1)
                else {
                    progressBar.stop()
                    callback()
                }    
            })
    
    })( 0 )
}

/* export module */
module.exports= downloadAll