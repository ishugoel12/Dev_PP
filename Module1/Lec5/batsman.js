// trim() => trims leading and trailing spaces from the string

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const json2xls = require("json2xls");

function matchdata(matchLink)
{
    request(matchLink , function(error, response , data)
    {   matchprocess(data);
    });
}

module.exports = matchdata;

function matchprocess(html)
{
    let mydoc = cheerio.load(html);     //single match page html
    let bothTable = mydoc(".table.batsman");
    // CAN ALSO REFER SUSHANT SIR's FILE FOR LITTLE DIFFERENT APPROACH
    let tn = mydoc(".Collapsible .header-title.label");   //or ".Collapsible h5"      // both h5 tags with team names 
    for(let i=0 ; i<bothTable.length ; i++)
    {
        let teamName = mydoc(tn[i]).text().split(" INNINGS ")[0].trim();  //to extract just the team name, not extra - "INNINGS (TARGET: 157 RUNS FROM 20 OVERS)"
        console.log("TEAM => " + teamName);
        let tablei = mydoc(bothTable[i]);
        let allRows = tablei.find("tbody tr");
        for(let j=0 ; j<allRows.length ; j+=2)
        {
            let allTds = mydoc(allRows[j]).find("td");
            if (allTds.length > 4)   // 4 to ignore last Extras row. it has 4 tds    //OR allTds.length > 1 and run the j loop for j<allRows.length-1 to ignore last row
            {
                let playerName = mydoc(allTds[0]).text();
                let runs = mydoc(allTds[2]).text();
                let balls = mydoc(allTds[3]).text();
                let four = mydoc(allTds[5]).text();
                let sixes =  mydoc(allTds[6]).text();
                let strikerate = mydoc(allTds[7]).text();
                // console.log("Batsman = " + name + "   " + "Runs = " + runs + "   " +"Balls = " + balls + "   " + "Fours = " + four + "   " + "Sixes = " + sixes + "   " + "Strike Rate = " + strikerate);
                processDetailsfs(teamName, playerName, runs, balls, four, sixes, strikerate);
                processDetailsxls(teamName, playerName, runs, balls, four, sixes, strikerate);
            }
        }
    }
    console.log("##############################################");
}

function processDetailsfs(teamName, playerName, runs, balls, four, sixes, strikerate)
{
    if(teamFolderExists(teamName)){
        if (playerFileExists(teamName, playerName)){
            updateFile(teamName, playerName, runs, balls, four, sixes, strikerate);
        }
        else{
            createPlayerFile(teamName, playerName, runs, balls, four, sixes, strikerate);
        }
    }
    else{
        createTeamFolder(teamName);
        createPlayerFile(teamName, playerName, runs, balls, four, sixes, strikerate);
    }
}

function teamFolderExists(teamName)
{
    let teamFolder = "./IPL/"+teamName;
    return fs.existsSync(teamFolder);
}
function createTeamFolder(teamName)
{
    let teamFolder = "./IPL/" + teamName;
    fs.mkdirSync(teamFolder);
}
function playerFileExists(teamName, playerName)
{
    let playerFile = "./IPL/" + teamName + "/" + playerName + ".json";
    return fs.existsSync(playerFile);
}
function createPlayerFile(teamName, playerName, runs, balls, four, sixes, strikerate)
{
    let playerFile = "./IPL/" + teamName + "/" + playerName + ".json";
    let file = [];  //since out reqd file format is object of each innings in an array
    let inning = {
        Name : playerName,
        Runs : runs,
        Balls : balls,
        Fours : four,
        Sixes : sixes,
        StrikeRate : strikerate
    };
    file.push(inning);  //push in array
    let jsonObj = JSON.stringify(file);
    fs.writeFileSync(playerFile , jsonObj);
}
function updateFile(teamName, playerName, runs, balls, four, sixes, strikerate)
{
    let playerFile = "./IPL/" + teamName + "/" + playerName + ".json";
    let file = JSON.parse(fs.readFileSync(playerFile));
    let inning = {
        Name: playerName,
        Runs: runs,
        Balls: balls,
        Fours: four,
        Sixes: sixes,
        StrikeRate: strikerate
    };
    file.push(inning);
    let jsonObj = JSON.stringify(file);
    fs.writeFileSync(playerFile, jsonObj);
}


function processDetailsxls(teamName, playerName, runs, balls, four, sixes, strikerate)
{
    if (teamFolderExistsxls(teamName)){
        if (playerFileExistsxls(teamName, playerName)){
            updateFilexls(teamName, playerName, runs, balls, four, sixes, strikerate);
        }
        else{
            createPlayerFilexls(teamName, playerName, runs, balls, four, sixes, strikerate);
        }
    }
    else{
        createTeamFolderxls(teamName);
        createPlayerFilexls(teamName, playerName, runs, balls, four, sixes, strikerate);
    }
}

function teamFolderExistsxls(teamName) {
    let teamFolder = "./IPL xls/" + teamName;
    return fs.existsSync(teamFolder);
}
function createTeamFolderxls(teamName) {
    let teamFolder = "./IPL xls/" + teamName;
    fs.mkdirSync(teamFolder);
}
function playerFileExistsxls(teamName, playerName) {
    let playerFile = "./IPL xls/" + teamName + "/" + playerName + ".xlsx";
    return fs.existsSync(playerFile);
}
function createPlayerFilexls(teamName, playerName, runs, balls, four, sixes, strikerate) {
    let playerFile = "./IPL xls/" + teamName + "/" + playerName + ".xlsx";
    let obj = [];  //since out reqd file format is object of each innings in an array
    let inning = {
        Name: playerName,
        Runs: runs,
        Balls: balls,
        Fours: four,
        Sixes: sixes,
        StrikeRate: strikerate
    };
    obj.push(inning);  //push in array
    fs.writeFileSync(playerFile, json2xls(obj), "binary");
}
function updateFilexls(teamName, playerName, runs, balls, four, sixes, strikerate) {
    let playerFile = "./IPL xls/" + teamName + "/" + playerName + ".xlsx";
    let file = JSON.parse(fs.readFileSync(playerFile));
    let inning = {
        Name: playerName,
        Runs: runs,
        Balls: balls,
        Fours: four,
        Sixes: sixes,
        StrikeRate: strikerate
    };
    file.push(inning);
    fs.writeFileSync(playerFile, json2xls(obj), "binary");
}