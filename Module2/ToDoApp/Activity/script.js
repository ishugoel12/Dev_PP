let addButtonField = document.querySelector(".add-todo");
let inputField = document.querySelector(".todo-input");
let todoslist = document.querySelector(".todos-list");

/*
inputField.addEventListener("keypress" , addTodoToListOnEnter);
function addTodoToListOnEnter(e){
    if(e.key == "Enter"){
        let enteredValue = inputField.value;
        console.log(enteredValue);
        inputField.value = "";
    }
}

// attach click event on addButtonField
addButtonField.addEventListener("click", addTodoToListOnClick);
function addTodoToListOnClick(e){
    let enteredValue = inputField.value;
    // falsy value => ""  , 0 , false , undefined , null
    if(enteredValue){
        console.log(enteredValue);
        // it will empty the inputField
        inputField.value = "";
    }
}
*/

inputField.addEventListener("keypress", function(e){
    if (e.key == "Enter")
        addTodoItemToList();
});

addButtonField.addEventListener("click", addTodoItemToList);

function addTodoItemToList(e) {
    let enteredValue = inputField.value;
    if (enteredValue) {
        // console.log(enteredValue);
        appendItemToList(enteredValue);
        inputField.value = "";
    }
}

function appendItemToList(val)
{
    let newItemDiv = document.createElement("div");
    newItemDiv.classList.add("todo-item");

    let newItemPtag = document.createElement("p");
    newItemPtag.classList.add("todo");
    newItemPtag.textContent = val;
// textContent - ui
// value - stored
    let newItemDeleteBtn = document.createElement("button");
    newItemDeleteBtn.classList.add("delete-todo");
    newItemDeleteBtn.textContent = "DELETE";
    newItemDeleteBtn.addEventListener("click" , deleteItem);

    newItemDiv.append(newItemPtag);
    newItemDiv.append(newItemDeleteBtn);
    todoslist.append(newItemDiv);
}

function deleteItem(event)
{
    event.target.parentNode.remove();   
}