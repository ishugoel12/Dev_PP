// 1.
// initialise npm by "npm init -y" in cmd here (one time step) => makes package.json which defines the folder
// dev_pp here, i.e. the dependencies and installed modules

// 2.
// install cheerio by "npm install cheerio", command => npm install <package name> ==> basically cheerio gets 
// downloaded in node_modules && package_lock.json is also created

// 3.
// let obj = cheerio.load(read_html_file);
// load html file in cheerio and it returns an object

// 4.
// let obj1 = cheerio_returned_obj("html_tag_name")
// returns huge object called "initialize" of all accurances of that tag in html file

// 5.
// let tag_data = cheerio_returned_obj("html_tag_name").text();
// returns concatenated data of all occurances of the tag, and works only on whole_cheerio_returned_obj, not a part of it


const fs = require("fs");
const cheerio = require("cheerio");

let htmlfile = fs.readFileSync("./index.html","utf8");

let htmlfile_obj = cheerio.load(htmlfile);

// let h1element = htmlfile_obj("h1");
// console.log(h1element);

let h1data = htmlfile_obj("h1").text();
console.log(h1data);

let secondh1tag = htmlfile_obj("h1")["1"];
// secondh1tag now has a part of initialize obj
// htmlfile_obj("h1")["1"].text() won't work bcz now htmlfile_obj("h1")["1"] is not a cheerio obj / initialize
console.log(htmlfile_obj(secondh1tag).text());
// we pass the part object to cheerio_returned_file_object and then call text() on it



// SELECTORS

console.log(htmlfile_obj("ul a").text());
// "a b" => selects all b's which are children of a's, here, returns all a tags which are children of ul

console.log(htmlfile_obj("ul li a").text());
// returns data of all a tags which are chidren of li, and li are children of ul

// FOR DIRECT CHILD!!
// console.log(htmlfile_obj("ul a").text()) will give both youtube and google but if we only want google which is direct child of ul
console.log(htmlfile_obj("ul>a").text());



// CLASS - same class can be given to multiple elements ('.')

/* <li class="first ul"> list item is child of ul</li> */
// this li has 2 classes namely : first and ul
// if you want to access data of only this li, add a class to it so that it becomes identifiable 
console.log(htmlfile_obj(".first.ul").text());



// ID - can only belong to 1 element, no duplification ('#')

// <h1 id="main-heading">hello</h1> this h1 has id main-heading
console.log(htmlfile_obj("#main-heading").text());
