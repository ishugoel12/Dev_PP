// for comments => highestWicketTaker.js

const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

let matchlink = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-kolkata-knight-riders-21st-match-1254078/full-scorecard";
request(matchlink, cb);

function cb(error, response, data) {
    fun(data);
}

function fun(data) 
{
    let highestSixes;
    let playerName;

    let mydoc = cheerio.load(data);
    let bothtable = mydoc(".table.batsman");

    for(let i=0 ; i<bothtable.length ; i++)
    {
        let ith_table = mydoc(bothtable[i]);
        let allrows = ith_table.find("tbody tr");
        for(let j=0 ; j<allrows.length ; j+=2)
        {
            let jth_row = mydoc(allrows[j]);
            let all_tds = mydoc(jth_row).find("td");
            if(i==0 && j==0)
            {
                highestSixes = mydoc(all_tds[6]).text();
                playerName = mydoc(all_tds[0]).find("a").text();
            }
            else
            {
                let presentSixes = mydoc(all_tds[6]).text();
                if(presentSixes > highestSixes)
                {
                    highestSixes = presentSixes;
                    playerName = mydoc(all_tds[0]).find("a").text();
                }
            }
        }
    }

    console.log("Player with highest number of sixes = " + playerName);
    console.log("number of sixes = " + highestSixes);
}