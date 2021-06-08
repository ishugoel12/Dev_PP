// value of attribute = cheerioobj.attr("attribute_name")

const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";  //ipl2020 page

request(matchlink, function (err, response, data) {
    fetcheddata(data)
});

function fetcheddata(html) {
    let mydoc = cheerio.load(html);
    let atag = mydoc(".widget-items.cta-link a");
    let reqdMatchLink = atag.attr("href");
    let allMatchLink = "https://www.espncricinfo.com" + reqdMatchLink;  //consolidated-scorecard
    request(allMatchLink, function (error, response, data) {
        allMatches(data);
    });
}

function allMatches(html) {
    let mydoc = cheerio.load(html);     // all match consolidated scorecard html
    let allATag = mydoc('a[data-hover="Scorecard"]');   //all 'a' tags to single match scorecard pages
    for (let i = 0; i < allATag.length; i++)
    {
        let matchLink = "https://www.espncricinfo.com" + mydoc(allATag[i]).attr("href");
        request(matchLink, function (error, response, data) {    //links of individual match pages
            matchprocess(data);
        });
    }
}

let matchCounter = 0;

function matchprocess(html)
{
    matchCounter++;
    console.log(matchCounter);
    let mydoc = cheerio.load(html);     //single match page html
    let bothTable = mydoc(".table.batsman");
    let tn = mydoc(".Collapsible .header-title.label");   //or ".Collapsible h5"      // both h5 tags with team names 
    for (let i = 0; i < bothTable.length; i++)
    {
        let teamName = mydoc(tn[i]).text().split(" INNINGS ")[0].trim();  //to extract just the team name, not extra - "INNINGS (TARGET: 157 RUNS FROM 20 OVERS)"
        let tablei = mydoc(bothTable[i]);
        let allRows = tablei.find("tbody tr");
        for (let j = 0; j < allRows.length; j += 2)
        {
            let allTds = mydoc(allRows[j]).find("td");
            if (allTds.length > 4)   // 4 to ignore last Extras row. it has 4 tds    //OR allTds.length > 1 and run the j loop for j<allRows.length-1 to ignore last row
            {
                let playerName = mydoc(allTds[0]).text();
                let runs = mydoc(allTds[2]).text();
                let balls = mydoc(allTds[3]).text();
                let four = mydoc(allTds[5]).text();
                let sixes = mydoc(allTds[6]).text();
                processDetails(teamName, playerName, runs, balls, four, sixes);
            }
        }
    }
    if(matchCounter == 60)
    {
        createStrikeRate();
    }
    console.log("##############################################");
}

function processDetails(teamName, playerName, runs, balls, four, sixes) 
{
    if (PlayerExists(playerName)) 
    {
        updatePlayer(teamName, playerName, runs, balls, four, sixes);
    }
    else {
        createPlayer(teamName, playerName, runs, balls, four, sixes);
    }
}

function PlayerExists(playerName) {
    let leaderboardFile = "./leaderboard.json";
    let json_obj = JSON.parse(fs.readFileSync(leaderboardFile));    //an array hopefully
    if(json_obj.length == 0)
    {
        return false;
    }
    for(let i=0 ; i<json_obj.length ; i++)
    {
        let obji = json_obj[i];
        if(obji.Name == playerName)
            return true;
    }
    return false;
}
function createPlayer(teamName, playerName, runs, balls, four, sixes) {
    let leaderboardFile = "./leaderboard.json";
    let jsonFile = JSON.parse(fs.readFileSync(leaderboardFile));    //an array hopefully
    let inning = {
        Name: playerName,
        Team:teamName,
        Runs: parseInt(runs),       // or Number(runs)
        Balls: parseInt(balls),
        Fours: parseInt(four),
        Sixes: parseInt(sixes),
        No_of_matches: parseInt(1)
    };
    jsonFile.push(inning);  //push in array
    let jsonObj = JSON.stringify(jsonFile);
    fs.writeFileSync(leaderboardFile, jsonObj);
}
function updatePlayer(teamName, playerName, runs, balls, fours, sixes, strikerate) {
    let leaderboardFile = "./leaderboard.json";
    let jsonFile = JSON.parse(fs.readFileSync(leaderboardFile));    //an array hopefully
    let obji;
    for(let i=0 ; i<jsonFile.length ; i++)
    {
        obji = jsonFile.shift();
        if(obji.Name == playerName)
            break;
        else
            jsonFile.push(obji);
    }
    let run = parseInt(obji.Runs) + parseInt(runs);
    let ball = parseInt(obji.Balls) + parseInt(balls);
    let four = parseInt(obji.Fours) + parseInt(fours);
    let six = parseInt(obji.Sixes) + parseInt(sixes);
    let match = parseInt(1) + parseInt(obji.No_of_matches);
    obji = {
        Name: playerName,
        Team: teamName,
        Runs: run,
        Balls: ball,
        Fours: four,
        Sixes: six,
        No_of_matches : match,
    };
    jsonFile.push(obji);
    let jsonObj = JSON.stringify(jsonFile);
    fs.writeFileSync(leaderboardFile, jsonObj);
}

function createStrikeRate()
{
    let leaderboardFile = "./leaderboard.json";
    let json_obj = JSON.parse(fs.readFileSync(leaderboardFile));    //an array hopefully
    for (let i = 0; i < json_obj.length; i++)
    {
        let obji = json_obj.shift();
        let runs = Number(obji.Runs);
        let balls = Number(obji.Balls);
        let sR = runs / balls * 100;
        obji.StrikeRate = sR;
        json_obj.push(obji);
    }
    let jsonObj = JSON.stringify(json_obj);
    fs.writeFileSync(leaderboardFile, jsonObj);
    console.table(json_obj);
}