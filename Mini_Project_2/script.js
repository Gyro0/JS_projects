
const userInput = document.getElementById('userInput');
const display = document.getElementById('list');
const form = document.getElementById('addtodo');
const search=document.getElementById('searchbar');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function showTodos(LIST){
    display.innerHTML="";

    LIST.forEach((todo, index) => {

    let listitem=document.createElement('li');
    listitem.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center');

    let NewTodo=document.createElement("span");
    NewTodo.textContent=todo;

    let deleteicon=document.createElement('i');
    deleteicon.classList.add("far", "fa-trash-alt" ,"delete");

    deleteicon.addEventListener('click',function(){
        removeTodo(index);
    })
    listitem.appendChild(NewTodo);
    listitem.appendChild(deleteicon);
    display.appendChild(listitem);
})
};

function addTodo(todo){
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    showTodos(todos);
};
function removeTodo(todo_index){
    todos.splice(todo_index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    showTodos(todos);
};

form.addEventListener('submit',function(event){
    event.preventDefault();
    const newTodo=userInput.value.trim();
    if (newTodo!==""){
        addTodo(newTodo);
        userInput.value="";
        showTodos(todos);
    }
});
search.addEventListener('input',function(event){
    event.preventDefault;
    const searched=event.target.value;
    const filteredTodos = todos.filter(todo =>
        todo.toLowerCase().startsWith(searched)
      );
    showTodos(filteredTodos);
});

showTodos(todos);
