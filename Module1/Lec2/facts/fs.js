//  ./ is present folder
//  To go to parent folder ../

// fs.writefilesync(file, content) => always over-writes

const fs = require("fs");
let f1data;

// f1data = fs.readFileSync("./f1.txt","utf-8");
f1data = fs.readFileSync("./f1.txt");   //needs file path
console.log(f1data+"");//stringify

fs.writeFileSync("f2.txt", "I am a new f2 file");   //overwrites if the file exist