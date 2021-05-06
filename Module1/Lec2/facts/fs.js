const fs = require("fs");
let f1data;

// f1data = fs.readFileSync("./f1.txt","utf-8");
f1data = fs.readFileSync("./f1.txt");   //needs file path
//  ./ is present folder
//  to go to outer folder ../
console.log(f1data+"");//stringify

fs.writeFileSync("f2.txt", "I am a new f2 file");   //overwrites if the file exist
