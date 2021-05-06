/* process.argv (an array) contains =>
[1] => location of node
[2] => location of present file
[3],[4],...=> any other arguments you pass while running the file
*/

const fs = require("fs");

// get flag functions
const flagFunctions = require("./util");
// console.log(flagFunctions);

// get passed files and flags
let contents = process.argv.slice(2);
// console.log(process.argv);
// console.log(contents);

const flags = [];
const files = [];

// separate out files and flags in different arrays
for (let i = 0; i < contents.length; i++) {
    if (contents[i].startsWith("-")) {
        flags.push(contents[i]);
    } else {
        files.push(contents[i]);
    }
}
console.log("flags : ");
console.log(flags);
console.log("files : ");
console.log(files);
console.log("OUTPUT : ");

let fileContent = flagFunctions.getFileContent(files);

if(fileContent != undefined)
{
    if (flags.includes("-s")) {
        fileContent = flagFunctions.sFlag(fileContent);
    }

    if (flags.includes("-b") && flags.includes("-n")) {
        if (flags.indexOf("-b") < flags.indexOf("-n"))
            fileContent = flagFunctions.bFlag(fileContent);
        else
            fileContent = flagFunctions.nFlag(fileContent);
    }
    else if (flags.includes("-b")) {
        fileContent = flagFunctions.bFlag(fileContent);
    }
    else if (flags.includes("-n")) {
        fileContent = flagFunctions.nFlag(fileContent);
    }

    console.log(fileContent);
}