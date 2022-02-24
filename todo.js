const todoInput = document.querySelector(".input");
const addButton = document.querySelector(".add-button");
const myToDo = document.querySelector(".my-to-do");
const filterOption = document.querySelector(".filter");




addButton.addEventListener("click", addFunction);
myToDo.addEventListener("click", removeCheck);
filterOption.addEventListener("click", filterToDo)
document.addEventListener("DOMContentLoaded", getLocalTodo);
//add to do to list with +
function addFunction(e) {
    e.preventDefault();

    const divToDo = document.createElement("div");
    divToDo.classList.add("to-do-list");
    const newToDo = `  <div class="icons">
            <i class="fas fa-trash-alt"></i>
            <i class="far fa-edit"></i>
            <i class="far fa-check-square"></i>
        </div>
        <div class="to-do">${todoInput.value}</div>`;

    divToDo.innerHTML = newToDo;

    myToDo.appendChild(divToDo);
    savedLocalTodos(todoInput.value)
    todoInput.value = "";
}

//remove and cheked todo
function removeCheck(el) {

    const classList = [...el.target.classList];

    const item = el.target;
    if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocal(todo);
        todo.remove();
    } else if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;

        todo.classList.toggle("completed");
    }
}

//filter to do
function filterToDo(e) {
    console.log(e.target.value);

    const todos = Array.from(myToDo.childNodes);
    console.log(todos)

    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none"
                };
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none";
                }
                break;

        }

    })
}


//saved todo in local

function savedLocalTodos(todo) {
    // localStorage.getItem('todo');
    // localStorage.setItem("todo",JSON.stringify(todo))
    let savedLocal = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];

    savedLocal.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedLocal))

}

//show todo to DOM with refresh

function getLocalTodo() {
    // localStorage.getItem('todo');
    // localStorage.setItem("todo",JSON.stringify(todo))
    let savedLocal = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];


    savedLocal.forEach((todos) => {

        const divToDo = document.createElement("div");
        divToDo.classList.add("to-do-list");
        const newToDo = `  <div class="icons">
            <i class="fas fa-trash-alt"></i>
            <i class="far fa-edit"></i>
            <i class="far fa-check-square"></i>
        </div>
        <div class="to-do">${todos}</div>`;

        divToDo.innerHTML = newToDo;

        myToDo.appendChild(divToDo);
    })



}

//remove todo in local and DOM

function removeLocal(todo) {
    console.log(todo.children[1].innerHTML)
    let savedLocal = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    const filterTodo = savedLocal.filter((todos) => todos !== todo.children[1].innerHTML);
    localStorage.setItem("todos", JSON.stringify(filterTodo));
}