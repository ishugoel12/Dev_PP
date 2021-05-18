const cheerio = require("cheerio");
const request = require("request");
let matchdata = require("./batsman");

function getAllMatchLink(allMatchLink)
{
    request(allMatchLink, function(error, response, data) { compute(data); }   );
}

module.exports = getAllMatchLink;

function compute(html)
{
    let mydoc = cheerio.load(html);     // all match consolidated scorecard html
    let allATag = mydoc('a[data-hover="Scorecard"]');   //all a tags to single match scorecard pages
    console.log(allATag.length);
    for(let i=0 ; i<allATag.length ; i++)
    {
        let matchLink = "https://www.espncricinfo.com" + mydoc(allATag[i]).attr("href");    //complete link
        // console.log(matchLink);
        matchdata(matchLink);   //send these links of individual match pages to batsman.js
    }
}