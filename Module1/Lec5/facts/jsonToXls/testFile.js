const json2xls = require("json2xls");
const fs = require("fs");

let obj = [{
    name : "ishu",
    runs : 56,
    sixes : 5,
    four : 0
}];
// {
//     name:"ojas",
//     runs : 106,
//     sixes : 12,
//     four : 13
// }];

fs.writeFileSync("./test.xlsx" , json2xls(obj) , 'binary');

// console.log(fs.readFileSync("./test.xlsx")+"");