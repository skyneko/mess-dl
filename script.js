const fs = require("fs") 

const getData = require("./src/getData")

let user = JSON.parse(fs.readFileSync("./test/user.json", "utf-8"))

getData(user, 2252600751432999, 70)