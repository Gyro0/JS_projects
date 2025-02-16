// recuperer les elements html necessaires
const userInput = document.getElementById('userInput');
const display = document.getElementById('list');
const form = document.getElementById('addtodo');
const search = document.getElementById('searchbar');

// charger les todos depuis le localstorage ou initialiser un tableau vide
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// fonction pour afficher la liste des todos
function showTodos(LIST) {
    display.innerHTML = ""; // vider la liste avant de la mettre à jour

    LIST.forEach((todo, index) => {
        // creer un element li pour chaque todo
        let listitem = document.createElement('li');
        listitem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // creer un element span pour afficher le texte du todo
        let NewTodo = document.createElement("span");
        NewTodo.textContent = todo;

        // creer une icone de suppression
        let deleteicon = document.createElement('i');
        deleteicon.classList.add("far", "fa-trash-alt", "delete");

        // ajouter un eventlistener pour supprimer un todo au clic sur l'icone
        deleteicon.addEventListener('click', function () {
            removeTodo(index);
        });

        // ajouter les elements au li et le li a la liste
        listitem.appendChild(NewTodo);
        listitem.appendChild(deleteicon);
        display.appendChild(listitem);
    });
};

// fonction pour ajouter un todo
function addTodo(todo) {
    todos.push(todo); // ajouter le nouveau todo a la liste
    localStorage.setItem('todos', JSON.stringify(todos)); // sauvegarder dans le localstorage
    showTodos(todos); // mettre a jour l'affichage
};

// fonction pour supprimer un todo
function removeTodo(todo_index) {
    todos.splice(todo_index, 1); // supprimer l'element du tableau
    localStorage.setItem('todos', JSON.stringify(todos)); // mettre a jour le localstorage
    showTodos(todos); // mettre a jour l'affichage
};

// ecouter la soumission du formulaire pour ajouter un nouveau todo
form.addEventListener('submit', function (event) {
    event.preventDefault(); // empecher le rechargement de la page
    const newTodo = userInput.value.trim(); // recuperer la valeur de l'input
    if (newTodo !== "") { // verifier que l'input n'est pas vide
        addTodo(newTodo); // ajouter le todo
        userInput.value = ""; // vider l'input
        showTodos(todos); // mettre a jour l'affichage
    }
});

// ecouter l'input de recherche pour filtrer les todos
search.addEventListener('input', function (event) {
    event.preventDefault(); // empecher le comportement par defaut
    const searched = event.target.value.toLowerCase(); // recuperer la valeur et mettre en minuscule
    const filteredTodos = todos.filter(todo =>
        todo.toLowerCase().startsWith(searched) // filtrer les todos qui commencent par la recherche
    );
    showTodos(filteredTodos); // afficher la liste filtree
});

// afficher les todos au chargement de la page
showTodos(todos);
