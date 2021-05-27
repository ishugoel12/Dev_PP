const fs = require("fs");
// f1 => f2 => f3

console.log("start");

fs.readFile("./f1.txt", function (error, data) {
    console.log(data + "");
    fs.readFile("f2.txt" , function(error, data){
        console.log(data + "");
        fs.readFile("f3.txt", function(error, data){
            console.log(data + "");
        })
    })
})

console.log("end");

/*
1. start
2. async function encountered => send to node api
3. end
async func fetches f1 data and as soon as it is done, calls callback
4. callback1 on waiting queue, event loop sees empty stack since whole code is executed, puts callback1 on stack
5. callback 1 execution : print f1
6. async function encountered => send to node api
async func fetches f2 data and as soon as it is done, calls callback
7. callback2 on waiting queue, event loop sees empty stack since whole code is executed, puts callback2 on stack
8. callback 2 execution : print f2
6. async function encountered => send to node api
async func fetches f3 data and as soon as it is done, calls callback
7. callback3 on waiting queue, event loop sees empty stack since whole code is executed, puts callback3 on stack
8. callback 3 execution : print f3

THUS, only when u fetch f1data and execute it's callback, yoou get to fetch f2data and further
SEQUENCIAL FLOW OF PROG.

DRAWBACK : CALLBACK HELL => nested async functions in callbacks
*/

/*
series execution can't be dont through loops
recursion might work
*/