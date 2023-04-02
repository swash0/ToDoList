const newToDoForm = document.querySelector("#new-todo-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const todoList = document.querySelector("#todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// function to save the todos to local storage
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function to render the todos to the page
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        listItem.innerHTML = `<span>${todo.title}:</span> ${todo.description}`;
        deleteButton.innerHTML = "Delete";
        editButton.innerHTML = "Edit";

        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            saveToLocalStorage();
            renderTodos();
        });

        editButton.addEventListener("click", () => {
            editTodo(index);
        });

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);

        todoList.appendChild(listItem);
    });
}

// function to add a new todo
function addTodo() {
    const todo = {
        title: titleInput.value,
        description: descriptionInput.value,
    };

    todos.push(todo);
    saveToLocalStorage();
    renderTodos();

    titleInput.value = "";
    descriptionInput.value = "";
}

// function to edit a todo
function editTodo(index) {
    const todo = todos[index];

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;

    todos.splice(index, 1);

    saveToLocalStorage();
    renderTodos();
}

// add event listener for form submit
newToDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});

// render initial todos
renderTodos();
