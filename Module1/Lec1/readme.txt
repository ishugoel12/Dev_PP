"let" is block scoped

let c;  => undefined

//any datatype in a single array
var avengers = ["Captain america", "Iron man", {Odinson :"Thor"}, 56];
//push(ele) - pop(ele) for last index of array
//shift(ele)=(delete) - unshift(ele)=(add) for first index

//objects ==> key : value pairs
let obj = {
    name : "ishika",
    age : 21,
    college : ["kmv", "igdtuw"],
    friends : ["shreya", {
        fname : "sana",
        lname : ["jain"],
        company : "sopra"
    }]
};
obj.college    ====   dot operator => literal key check
//square bracket => inside value check      ====>   console.log(obj[highSchool]);
obj.newkey = value;     ===>    adds new key:value pair, or overwrite the existing one

string.substring(start);
string.substring(start, end);

function fun()
    {-----}
//function expression = function acts like a variable
let sayHi = function()
{    console.log("say hi!!");   }
sayHi();

//global execution context
1. memory allocation phase => variable gets undefined, func_name gets function body
2. code execution phase  => variable gets its value (var a=10), since func_name has the code by now, where ever you call it, it doesn't matter, it will execute
//in case of var=func(), not same

let say;
say = function ()
{    console.log("Say Hiii !!");    }
say();
//in this case, say is a var, in memory allocation phase it get undefined and then in code execution phase it gets the function and 
//then it can get executed as the call is made afterwards but if call made before function assignment to say, say would contain undefined and
// wouldn't know it's supposed to be a function and will throw error

//high order func => accepts function as argument
//callback function => which is passed as an argument in other func

//sync func => normal function ie does complete work no matter how much time it consumes then move fwd
//async func => multitasking kind, does work in bg and in fg does some other independent tasks
//usage of callback => implement async functions

-----FUNCTION-----
array = string.split(" ")