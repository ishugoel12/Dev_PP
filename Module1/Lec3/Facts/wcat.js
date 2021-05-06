/*Functions used : 
1. fs.readFileSync(file path from present folder, encoding);
encoding => if not given print data in wierd format. to make it readable use utf8 or while printing +""

/r => last char of a line generally, sends pointer to start of line
/n => send pointer to next line

2. string.split(on what basis) => return array

3. array.join(on what basis) => return string

4. slice(start idx, end idx)
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));      =>       expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));   =>       expected output: Array ["camel", "duck"]
console.log(animals.slice(1, 5));   =>       expected output: Array ["bison", "camel", "duck", "elephant"]

*/

const fs = require("fs");

let f1data = fs.readFileSync("./f1.txt", "utf8");
// let f2data = fs.readFileSync("./f2.txt", "utf8");
// let combined = f1data + "\r\n" + f2data;
// console.log(f1data + "");   //or utf8 to stringify
// console.log(f1data + "\n" + f2data + "");

// -s flag implementation
//remove extra space
function sFlag(f1data)
{
    let splittedData = f1data.split("\r\n");
    console.log(splittedData);
    let removedSpaces = [];
    let lastCharSpace = false;
    for (let i = 0; i < splittedData.length; i++) 
    {
        if (splittedData[i] == "") 
        {
            if (lastCharSpace == false) 
            {
                removedSpaces.push(splittedData[i]);
                lastCharSpace = true;
            }
        }
        else {
            removedSpaces.push(splittedData[i]);
            lastCharSpace = false;
        }
    }
    console.log(removedSpaces);

    let result = removedSpaces.join("\r\n");
    return result;
}

let solnString = sFlag(f1data);
console.log(solnString);

let bFlag = function (f1data)
{
    // add line number on non empty lines
    let splittedData = f1data.split("\r\n");
    console.log(splittedData);
    let count = 1;
    for (let i = 0; i < splittedData.length; i++) 
    {
        if (splittedData[i] != "") {
            splittedData[i] = count + ". " + splittedData[i];
            count++;
        }
    }

    let result = splittedData.join("\r\n");
    return result;
}

// let solnString = bFlag(f1data);
// console.log(solnString);

let nFlag = function (f1data) {
    // add line number on all lines
    let splittedData = f1data.split("\r\n");
    console.log(splittedData);
    let count = 1;
    for (let i = 0; i < splittedData.length; i++) {
            splittedData[i] = count + ". " + splittedData[i];
            count++;
    }

    let result = splittedData.join("\r\n");
    return result;
}

// let solnString = nFlag(f1data);
// console.log(solnString);