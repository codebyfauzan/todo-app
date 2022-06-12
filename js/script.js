document.addEventListener('DOMContentLoaded', function() {

    // update todo items left
    let todoItems = document.getElementsByClassName('active');
    let itemsLeft = document.getElementById('items-left').innerText;
    itemsLeft = todoItems.length + ' items left';
    console.log('todo items length = '+todoItems.length);
    console.log(itemsLeft);

    


    // get the form of input text
    const todoForm = document.getElementById('todo-form');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTodo();
        document.querySelector('.todo-input-text').value = '';
    });

    const todoList = document.getElementById('todo-list');
    todoList.addEventListener('click', function(event) {
        if (event.target.type == 'checkbox') {
            if (event.target.checked) {
                event.target.parentElement.nextElementSibling.classList.add('completed');
                event.target.parentElement.nextElementSibling.classList.remove('active');
                itemsLeft = `${todoItems} items left`;
            } else {
                event.target.parentElement.nextElementSibling.classList.remove('completed');
                event.target.parentElement.nextElementSibling.classList.add('active');
                itemsLeft = `${todoItems} items left`;
            }
        }

        if (event.target.className == 'delete-todo-item') {
            event.target.parentElement.remove();
        }
    });

    // clear all completed todo
    const filterButtons = document.getElementsByClassName('filter-btn');
    const completedTodos = document.getElementsByClassName('completed');
    const completedTodosNode = document.querySelectorAll('.completed');
    const activeTodos = document.getElementsByClassName('active');

    const clearCompletedTodo = document.getElementById('clear-completed');

    clearCompletedTodo.addEventListener('click', function(e) {
        for (let completedTodo of completedTodos) {
            console.log(completedTodo);
            completedTodo.parentElement.remove();
        }
    });


    // Filter todos
    for (let filterButton of filterButtons) {
        filterButton.addEventListener('click', function(element) {
            if (element.target.id == 'completed-btn') {
                for (activeTodo of activeTodos) {
                    activeTodo.parentElement.style.display = 'none';
                }
                for (completedTodo of completedTodos) {
                    completedTodo.parentElement.style.display = 'flex';
                }
            }
            else if (element.target.id == 'active-btn') {
                for (completedTodo of completedTodos) {
                    completedTodo.parentElement.style.display = 'none';
                }
                for (activeTodo of activeTodos) {
                    activeTodo.parentElement.style.display = 'flex';
                }
            }
            else {
                for (completedTodo of completedTodos) {
                    completedTodo.parentElement.style.display = 'flex';
                }
                for (activeTodo of activeTodos) {
                    activeTodo.parentElement.style.display = 'flex';
                }
            }

        });
    }
});