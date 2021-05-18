//attr(attribute name) => return value of given attribute, cheerio function

const cheerio = require("cheerio");
const request = require("request");
let getallMatchLink = require("./allMatches");

let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";  //homepage

request(matchlink, function (err, response,  data){
    processdata(data)
});

function processdata(html)
{
    let mydoc = cheerio.load(html);     //homepage html
    let atag = mydoc(".widget-items.cta-link a");       //to get link on the button to go to next page with match consolidated scorecard
    let reqdMatchLink = atag.attr("href");  // atag had half link, so we combine it with basic link further
    //OR
    // console.log(atag);
    // let reqdMatchLink = atag["0"].attribs.href;   => print atag and figure to how to reach to that link
    let allMatchLink = "https://www.espncricinfo.com" + reqdMatchLink;      //link to next page with all matches consolidated scorecard
    // console.log(allMatchLink);
    getallMatchLink(allMatchLink);      // send this link to allmatches.js to extract links of all matches from here
}