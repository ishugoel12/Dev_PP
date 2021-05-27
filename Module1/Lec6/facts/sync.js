// DRAWBACK OF SYNC FUNCTIONS:
// until and unless the execution of a sync func gets completed, the flow of control won't move further
// irrespective of how much time it takes.
/* for ex : fs.readFileSync(file path , "utf-8");
    even if this file is of 100 gb and might take an hour to get read, it will be read first then 
    any further code will be executed
*/

const fs = require("fs");

console.log("start");

let f1KaContent = fs.readFileSync("./f1.txt"); // 100gb file
console.log(f1KaContent + "");

console.log("end");

/*
always of the form :
 
start
//filecontent
end
*/