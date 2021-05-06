const fs = require("fs");

// get contents from the files and check if any invalid file passed
function getFileContent(files) {
    let content = "";
    for (let i = 0; i < files.length; i++) {
        if (fs.existsSync(files[i]) == false) {
            console.log("One or more files dont exist");
            return;
        }
        content += fs.readFileSync(files[i]);
        if (i != files.length - 1)
            content += "\r\n";
        // would cause little problems further if only \n, since you know now every line is distinguished by \r\n use it
    }
    return content;
}


// -s flag implementation
//remove extra space
function sFlag(data) 
{
    let splittedData = data.split("\r\n");
    // console.log(splittedData);
    let removedSpaces = [];
    let lastCharSpace = false;
    for (let i = 0; i < splittedData.length; i++) {
        if (splittedData[i] == "") {
            if (lastCharSpace == false) {
                removedSpaces.push(splittedData[i]);
                lastCharSpace = true;
            }
        }
        else {
            removedSpaces.push(splittedData[i]);
            lastCharSpace = false;
        }
    }
    // console.log(removedSpaces);
    let result = removedSpaces.join("\r\n");
    return result;
}


// -b flag implementation
// adds line number on non empty lines
let bFlag = function (data) 
{
    let splittedData = data.split("\r\n");
    // console.log(splittedData);
    let count = 1;
    for (let i = 0; i < splittedData.length; i++) {
        if (splittedData[i] != "") {
            splittedData[i] = count + ". " + splittedData[i];
            count++;
        }
    }

    let result = splittedData.join("\r\n");
    return result;
}


// -n flag implementation
// add line number on all lines
let nFlag = function (data) 
{
    let splittedData = data.split("\r\n");
    // console.log(splittedData);
    let count = 1;
    for (let i = 0; i < splittedData.length; i++) {
        splittedData[i] = count + ". " + splittedData[i];
        count++;
    }

    let result = splittedData.join("\r\n");
    return result;
}

//if we declare module.exports like this, the key name and value are same, ie it works
    module.exports = {
    getFileContent,
    sFlag,
    bFlag,
    nFlag
};

// module.exports.bFlag = bFlag;
// module.exports.sFlag = sFlag;
// module.exports.nFlag = nFlag;