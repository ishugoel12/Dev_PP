let name = "ishu";
let age = 21;
let clg = "kmv";
let school = "kiit";

//if you want to *use school, clg in other file*
//module.export is an empty object that every js file has
//in next line, you add key 'school' to module.exports and assign it the value of variable school
module.exports.school = school;
module.exports.clg = clg;

//now it has => 
// module.exports = {
//     school : "kiit",
//     clg : "kmv"
// }
// OR 
//you can do the same task by writing (direct assignment)
// module.exports = {
//     school : "kiit",
//     clg : "kmv"
// }


// if you know you'll need just 1 value/var out of this file
// module.exports = age
// it is now a number not an object