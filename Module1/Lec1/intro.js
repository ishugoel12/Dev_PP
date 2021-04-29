console.log("-------------------NEW OUTPUT-------------------");

// let is block scoped
//dynamic initialisation for a variable
let a = 10; 
console.log(a);
if(true)
{
    let a = 32;
    console.log(a);
}
console.log(a);

//const 
const pi = 22/7;
console.log(pi);
// pi = 3.14; - gives error

//missing declaration, initialisation and declaration of const in same line
// const b;
// b = 25;

let c;
console.log(c);     // => undefined

//any datatype in a single array
var avengers = ["Captain america", "Iron man", "Thor", "The Hulk"];
console.log(avengers);
//push - pop for last index of array
avengers.push(3000);
avengers.push(3.5);
console.log(avengers);

console.log("popped value : " + avengers.pop());
console.log(avengers);

//shift(delete) - unshift(add) for first index
console.log("first value popped : " + avengers.shift());
console.log(avengers);
avengers.unshift("Cap");
console.log(avengers);

//objects ==> key : value pairs
let obj = {
    name : "ishu",
    age : 21,
    college : ["kmv", "igdtuw"],
    friends : ["shreya", {
        fname : "pranjal",
        lname : ["maheshwari"],
        company : "sopra"
    }]
};
console.log(obj);
//retieve value using key from object
console.log(obj.name + " " + obj.age);
console.log(obj.college) ;
//dot operator => literal check

let highSchool = "college";
// console.log(obj.highSchool);   => doesn't work bcz highSchool is not a key of obj 
// console.log(obj."name"); => no ket "name"

//square bracket => value inside check
console.log(obj[highSchool]);
console.log(obj["name"]);
// console.log(obj[college]); won't work bcz no value of college defined

obj.school = ["kiit"]; //if does not exist, new created
obj.age = 20;  //if exist, over-written
console.log(obj);

//access friend->lname->w
console.log(obj.friends[1].lname[0][6]);
// lname[0] bcz lname is array

console.log(obj.friends[1].lname[0].substring(6));
console.log(obj.friends[1].lname[0].substring(0,6));