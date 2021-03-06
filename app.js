// selectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector(".filter-todo")

// event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)


// functions

function addTodo(event){
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    // create li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    // save to local storage
    saveLocalTodos(todoInput.value)

    // checked btn
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // trash btn
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // append to parent todoList
    todoList.appendChild(todoDiv)

    //  clear input field
    todoInput.value = ""
}


function deleteCheck(e){
    const item = e.target
    // delete
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        // animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function(){
            todo.remove()
        })

    }
    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed")
        
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(todo => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
        }
    })
}

function saveLocalTodos(todo){
    // check if you have any todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
} 

function getTodos(){
    // check if you have any todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        // todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    // create li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    // checked btn
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // trash btn
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // append to parent todoList
    todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    // check if you have any todos
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

