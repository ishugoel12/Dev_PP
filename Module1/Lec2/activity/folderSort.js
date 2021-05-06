/*
1. fs.readdirSync(path) => returns array of all file or folder names in the given directory path

2. fs.mkdirSync(path) => makes a directory/folder on given path(till required folder name)

3. fs.existsSync(path) => check if the given path exists

4. fs.copyFileSync(srcPath, destPath) => copies file from source path to destination path(both till file name)

5. fs.unlinkSync(path) => deletes the FILE (path tile filename), does not work on directories

6. fs.rmdirSync(path) => deletes directories

7. arrayname.includes(element) => check for availability of element

*/

let fs = require("fs");

var extensionsMapping = require("./util.js");
console.log(extensionsMapping);

let testfolderPath = "./Downloads";
let allFileNames = fs.readdirSync(testfolderPath);

for (let i = 0; i < allFileNames.length; i++) {
    sortFile(allFileNames[i]);
}

function sortFile(file) {
    // get file extension for respective file
    let fileExtension = getExtension(file);
    // get folder name for respective file type from extensionsMapping
    let folderName;
    for (let key in extensionsMapping) {
        let fileTypes = extensionsMapping[key];
        if (fileTypes.includes(fileExtension) == true) {
            folderName = key;
            break;
        }
    }
    // check existence of folder, if folder does not exist make it
    let isFolderExist = fs.existsSync(testfolderPath + "/" + folderName);
    if (isFolderExist == false) {
        fs.mkdirSync(testfolderPath + "/" + folderName);
    }
    //move file, copy => delete
    moveFile(file, folderName);
}

function getExtension(file) {
    file = file.split('.');
    return file[1];
}

function moveFile(fileName, folderName) {
    // copy file from the source path to destination path !!
    let srcPath = testfolderPath + "/" + fileName;
    let destPath = testfolderPath + "/" + folderName + "/" + fileName;
    fs.copyFileSync(srcPath, destPath);
    // then delete file from the source path !!
    fs.unlinkSync(srcPath);
}