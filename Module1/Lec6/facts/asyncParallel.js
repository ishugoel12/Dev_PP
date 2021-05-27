const fs = require("fs");

console.log("start");
fs.readFile("./f1.txt" , function(error, data){
    console.log(data + "");
})
fs.readFile("./f2.txt", function (error, data) {
    console.log(data + "");
})
fs.readFile("./f3.txt", function (error, data) {
    console.log(data + "");
})
console.log("end");

/*
1. start
2. encountered async func => send to node api
3. encountered async func => send to node api
4. encountered async func => send to node api
5. end

as soon as any async func's on node api gets completely executed, it calls for callback function, 
which is put in the waiting queue  
Since the time fraction difference in encounteriing the 3 async func are negligible, 
the working is equialent to paralle processing
*/

/*
same sequence of execution when readfile() called from within a loop
(take array of file names and pass them[i] in readfile()) 
*/