// trim() => trims leading and trailing spaces from the string

const request = require("request");
const cheerio = require("cheerio");

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
    let teamname = mydoc(".Collapsible .header-title.label");   //or ".Collapsible h5"      // both h5 tags with team names 
    for(let i=0 ; i<bothTable.length ; i++)
    {
        let tn = mydoc(teamname[i]).text().split(" INNINGS ");  //to extract just the team name, not extra - "INNINGS (TARGET: 157 RUNS FROM 20 OVERS)"
        console.log("TEAM => " + tn[0].trim());
        let tablei = mydoc(bothTable[i]);
        let allRows = tablei.find("tbody tr");
        for(let j=0 ; j<allRows.length ; j+=2)
        {
            let allTds = mydoc(allRows[j]).find("td");
            if (allTds.length > 4)   // 4 to ignore last Extras row. it has 4 tds    //OR allTds.length > 1 and run the j loop for j<allRows.length-1 to ignore last row
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