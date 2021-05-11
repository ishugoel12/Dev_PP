// package request => fetches html of provided webpage path

const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

// request is a high order funct.(another func passed in arguments - callback func.)
// when it fetches the data, it calls the callback function(error, response, data) and data contains html content

let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(matchlink, cb);
// hits the matchlink, get htmldata, calls cb and passes data in its arguments

function cb(error , response, data)
{
    // console.log(data);

    // fs.writeFileSync("./match.html", data); //=> write this html content in a file
    // let htmldata = fs.readFileSync("./match.html", "utf8");
    fun(data);
}

function fun(data)
{
    let mydoc = cheerio.load(data);
    // Search in ispect element for how to select the 2 bowler table => class ="table bowler"
    let bothBowlertable = mydoc(".table.bowler");
    // {
    //     "0" : {bowling table 1} ,
    //     "1" : {bowling table 2}
    // }
    // fs.writeFileSync("./bothtable.html", bowlertable+"");
    // let tables = fs.readFileSync("./bothtable.html", "utf8");
    
    let highestWicketsTaken;
    let wicketTakerName;

    for(let i=0; i<bothBowlertable.length; i++)     //for each table
    {
        let table_i = mydoc(bothBowlertable[i]);    //ith table
        let table_i_rows = mydoc(table_i.find("tbody tr"));     //select all rows except header
        // {
        //     "0" : {tr},
        //     "1" : {tr},
        //     "2" : {tr}
        // }
        for(let j=0 ; j<table_i_rows.length ; j++)  //for each row in ith table
        {
            let jth_row = mydoc(table_i_rows[j]);   //jth row
            let table_i_rows_tds = mydoc(jth_row.find("td"));   //break row into td's
            if(i==0 && j==0)    //if first player, then directly add
            {
                highestWicketsTaken = mydoc(table_i_rows_tds[4]).text();    //5th td has no.of-wickets
                wicketTakerName = mydoc(table_i_rows_tds[0]).find("a").text();  //1st td has player name, <td><a>player name</a></td>
            }
            else
            {
                let currentWickets = mydoc(table_i_rows_tds[4]).text();
                if(currentWickets > highestWicketsTaken)
                {
                    highestWicketsTaken = mydoc(table_i_rows_tds[4]).text();
                    wicketTakerName = mydoc(table_i_rows_tds[0]).find("a").text();
                }
            }
        }
    }
    console.log("Highest wicket taker = " + wicketTakerName);
    console.log("highest number of wickets taken = " + highestWicketsTaken);
}