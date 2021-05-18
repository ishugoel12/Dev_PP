const cheerio = require("cheerio");
const request = require("request");
let google = "https://www.google.com";

function someRandomFunc()
{
    request(google , function(error, response , data)
    {
        callMe(data);
    });
}
module.exports = someRandomFunc;

function callMe(html)
{
    console.log("Hi ! I am call me, i got the html of google.com");
    let mydoc = cheerio.load(html);
    let fromGoogle = mydoc(".NKcBbd").text();
    console.log(fromGoogle);
    // now, i want to send this fromGoogle to b.js
    /*
    we could have done module.exports = fromgoogle here and written require in b.js
    but this won't work because
    assume we run b.js => it calls a.js to take fromgoogle and proceeds further
    here, b.js only took the string didn't run a.js to get content of string from internet
    */
    // SOLUTION
    /*
    we have to run a.js through b.js
    for this, if we export the request function somehow, it would work as
    require calls callme, which fetchees the string from internet
    put require in some random function and then export it
    */
    //  to pass value from b.js to a.js, pass it in the randomfunc, from randomfunc, pass it to
    //  callme and lastly, implement in callme
}