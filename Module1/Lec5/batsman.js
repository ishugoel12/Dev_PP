const request = require("request");
const cheerio = require("cheerio");

// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function matchdata(matchLink)
{
    request(matchLink , function(error, response , data)
    {   matchprocess(data);
    });
}

module.exports = matchdata;

function matchprocess(html)
{
    let mydoc = cheerio.load(html);
    let bothTable = mydoc(".table.batsman");
    let teamname = mydoc(".Collapsible .header-title.label");   //or ".Collapsible h5"
    for(let i=0 ; i<bothTable.length ; i++)
    {
        let tn = mydoc(teamname[i]).text().split(" INNINGS ");
        console.log("TEAM => " + tn[0].trim());
        let tablei = mydoc(bothTable[i]);
        let allRows = tablei.find("tbody tr");
        for(let j=0 ; j<allRows.length ; j+=2)
        {
            let allTds = mydoc(allRows[j]).find("td");
            if(allTds.length > 4)
            {
                let name = mydoc(allTds[0]).text();
                let runs = mydoc(allTds[2]).text();
                let balls = mydoc(allTds[3]).text();
                let four = mydoc(allTds[5]).text();
                let sixes =  mydoc(allTds[6]).text();
                let strikerate = mydoc(allTds[7]).text();
                console.log("Batsman = " + name + "   " + "Runs = " + runs + "   " +"Balls = " + balls + "   " + "Fours = " + four + "   " + "Sixes = " + sixes + "   " + "Strike Rate = " + strikerate);
            }
        }
    }
    console.log("##############################################");
}