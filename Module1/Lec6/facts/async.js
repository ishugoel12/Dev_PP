/*
STACK : same as java, flow of control amd execution is managed through stack
Node implementation {
    NODE API : every async function call when encountered by stack is put here and hence does not occupy the 
        stack and the stack assumes it has executed the function. It works parallel to stack. as soon as the
        work of async is done, async func makes call to callback func specified. Now this callback has to be 
        executed, it is put into waiting queue
    WAITING QUEUE : it holds the callback func call made by async func (which got executed in node api)
    EVENT LOOP : Its only task is to keep checking if the stack is empty (i.e. the prog executed fully), as 
        soon as it finds the stack empty, it removes first callback from head of waiting queue and pushes it 
        into the stack for execution.
}
*/

const fs = require("fs");

console.log("start");

fs.readFile("./f1.txt", function(error, data){
    console.log(data + "");
})

console.log("end");

/*
start printed
encounters async func, throws it in node api and processes further, readfile being executed in node api, 
    as soon as it is done, call is made to callback function, callback put in waiting queue
end printed
stack empty
event loop sees stack empty, push callback from wwaiting queue on stack and it get executed and file contents 
    printed
*/