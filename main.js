const addTodo = document.getElementById("addTodo");
const trueBtn = document.getElementById("true");
const falseBtn = document.getElementById("false");
const titleInput = document.querySelector(".title-input");
const descInput = document.querySelector(".desc-input");
const active = document.querySelector(".active");
const todos = document.querySelector(".todos");
const plus = document.querySelector(".plus");

//-----------------------------------------------------------------------------------------

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JSON.parse(xhr.response);
        const todosArray = JSON.parse(xhr.response).map(e => {
            return {
                title: e.title,
                desc: e.body
            }
        });
        showArrayOfTodos(todosArray);
    }
}



const showArrayOfTodos = (array) => {
    array.forEach(todo => {
        todos.appendChild(createTodoticket(todo.title, todo.desc))
    });
}
const createTodoticket = (title, desc) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");
    todo.innerHTML = `
        <h2 class="todos-title">${title}</h2>
        <p class="todo-content">${desc}</p>
`
 return todo
}

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.send();
addTodo.addEventListener('click', () => {
    plus.style = 'display: none';
    active.style = 'display: block';
    todos.style = 'padding-bottom: 0px;'
    todos.scrollTo(0, todos.scrollHeight);
});
falseBtn.addEventListener('click', () => {
    plus.style = 'display: flex';
    active.style = 'display: none';
    todos.style = 'padding-bottom: 120px;'
    todos.scrollTo(0, 0);
});

trueBtn.addEventListener('click', () => {
    const desc = descInput.value;
    const title = titleInput.value;
    if (title === "") {
        titleInput.style = 'outline: 2px solid #f00;'
    } else {
        titleInput.style = 'outline: 2px solid transparent;'
    }
    if (desc === "") {
        descInput.style = 'outline: 2px solid #f00;'
    } else {
        descInput.style = 'outline: 2px solid transparent;'
    }
    if (title !== "" && desc !== "") {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title: title,
                body: desc
            })
        }).then(res => {
            console.log(res);
            todos.appendChild(createTodoticket(title, desc))
            todos.scrollTo(0, todos.scrollHeight);
            titleInput.value = ""
            descInput.value = ""
            active.style = 'display: none';
            todos.style = 'padding-bottom: 120px;';
            plus.style = 'display: flex';
            
        })
    }
});