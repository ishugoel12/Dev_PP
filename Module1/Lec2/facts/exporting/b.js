let obj = require("./a.js");
console.log(obj);
// obj = {
//     school : "kiit",
//     clg : "kmv"
// }

//to use clg => obj.clg

// if it was a huge incoming object and you want a part of it :
//obj destructuring = extracting just 1/some key
let { clg } = require("./a.js");
console.log(clg);