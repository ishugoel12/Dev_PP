const cheerio = require("cheerio");
const request = require("request");
let getallMatchLink = require("./allMatches");

let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(matchlink, function (err, response,  data){
    processdata(data)
});

function processdata(html)
{
    let mydoc = cheerio.load(html);
    let atag = mydoc(".widget-items.cta-link a");
    let reqdMatchLink = atag.attr("href");   //attr(attribute name) => return value of given attribute, cheerio function
    //OR
    // console.log(atag);
    // let reqdMatchLink = atag["0"].attribs.href;   => print atag and figure to how to reach to that link
    let allMatchLink = "https://www.espncricinfo.com" + reqdMatchLink;
    // console.log(allMatchLink);
    getallMatchLink(allMatchLink);
}