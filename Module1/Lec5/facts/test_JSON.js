// JSON => javascript object notation, either object or collection of objects in an array
//jsonObjectWhichCanBeWrittenInJsonFile =  JSON.stringify(object or array of objects)   (js -> json)
// object = JSON.parse(read data from json file)    //convert json object into readble format for js    (json -> js)

let fs = require("fs");

// let obj = {
//     "Runs": "10",
//     "Balls": "2"
// }

// fs.writeFileSync("./a.json", obj);   => here throwing error, else it would display Object:object in json file

// let jsonObj = JSON.stringify(obj)
// fs.writeFileSync("./a.json" , jsonObj);

// let obj = fs.readFileSync("./a.json");      //return in wierd language
let obj = JSON.parse(fs.readFileSync("./a.json"));
console.log(obj);