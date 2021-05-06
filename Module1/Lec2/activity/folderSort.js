// readdirSync(path) => returns array of all file or folder names
// mkdirSync(path) => makes a directory/folder on given path
// arrayname.includes(element) => check for availability of element
// existsSync(path) => check if thegiven path exists

let fs = require("fs");

var extensionsMapping = require("./util.js");
// console.log(extensionsMapping);

let testfolderPath = "./Downloads";
let allFileNames = fs.readdirSync(testfolderPath);

for(let i=0 ; i<allFileNames.length ; i++)
{
    sort(allFileNames[i]);
}

function sort(file)
{
    let fileExtension = getExtension(file);
    checkExtensionFolder(fileExtension);

}

function getExtension(file)
{
    file = file.split('.');
    return file[1];
}

function checkExtensionFolder(fileExtension)
{
    let folderName;
    for(let key in extensionsMapping)
    {
        let fileTypes = extensionsMapping[key];
        if(fileTypes.includes(fileExtension)==true)
        {
            folderName = key;
            break;
        }
    }
    let isFolderExist = fs.existsSync(testfolderPath+"/"+folderName);
    if(isFolderExist==true)
    {
        //folder exists
    }
    else
    {
        fs.mkdirSync(testfolderPath + "/" + folderName);
    }
    //move file, copy => delete
}