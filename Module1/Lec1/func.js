//function -> keyword
//std function
// function fun()
// {
//     console.log("hi!!");
// }


//function acts like a variable
//function expression
let sayHi = function(){
    console.log("say hi!!");
}
sayHi();


//global execution context
//1. memory allocation phase => any variable gets undefined, func_name get function body
//2. code execution phase  => variable gets its value (var a=10), since func_name has the code by now, where ever you call it, it doesn't 
//matter, it will execute
//in case of var=func(), not same
let say;
say = function () {
    console.log("Say Hiii !!");
}
say();
//in this case, say is a var, in memory allocation phase it get undefined and then in code execution phase it gets the function and 
//then it can get executed as the call is made afterwards but if call made before function assignment to say, say would contain undefined and
// wouldn't know it's supposed to be a function and will throw error


//callback thing
//high order func => accepts function as argument
//callback function => which is passed as an argument in other func
function argument(){
    console.log("hello there");
}
function highorder(cb)
{
    console.log("entered highorder");
    cb();
    console.log("exiting highorder");
}
highorder(argument);
//sync func => normal function ie does complete work no matter how much time it consumes then move fwd
//async func => multitasking kind, does work in bg and in fg does some other independent tasks
//usage of callback => implement async functions
