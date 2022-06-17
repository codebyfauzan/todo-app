document.addEventListener('DOMContentLoaded', function () {

    const toggleBtn = document.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('lightmode');
    });

    const todoList = document.getElementById('todo-list');
    let containerTodoItems = document.querySelectorAll('.container-todo-item');

    // get the form of input text
    const todoForm = document.getElementById('todo-form');
    // add todo function
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
        document.querySelector('.todo-input-text').value = '';
        // update todo items left
        let todoItems = document.getElementsByClassName('active');
        let itemsLeft = document.getElementById('items-left');
        itemsLeft.innerText = todoItems.length + ' items left';
    });
    
    
    // drag function
    containerTodoItems.forEach(containerTodoItem => {
        containerTodoItem.addEventListener('dragstart', (e) => {
            containerTodoItem.classList.add('dragging');
        });
        containerTodoItem.addEventListener('touchstart', (e) => {
            containerTodoItem.classList.add('dragging');
        });
        containerTodoItem.addEventListener('touchend', () => {
            containerTodoItem.classList.remove('dragging');
        });
        containerTodoItem.addEventListener('dragend', () => {
            containerTodoItem.classList.remove('dragging');
        });
    });

    todoList.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoList, e.touches[0].clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            todoList.appendChild(draggable);
        } else {
            todoList.insertBefore(draggable, afterElement);
        }

    });
    todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoList, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            todoList.appendChild(draggable);
        } else {
            todoList.insertBefore(draggable, afterElement);
        }

    });


    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.container-todo-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return {
                    offset: offset,
                    element: child
                }
            } else {
                return closest;
            }
        }, {
            offset: Number.NEGATIVE_INFINITY
        }).element;
    }


    // Change active filter button
    let filterDesktopBtns = document.querySelectorAll(".filter-desktop button");
    for (let i = 0; i < filterDesktopBtns.length; i++) {
        filterDesktopBtns[i].addEventListener("click", function () {
            let current = document.querySelectorAll(".actived-btn");
            current[0].classList.remove('actived-btn');
            this.classList.add('actived-btn');
        });
    }

    // Change active filter button
    let filterMobileBtns = document.querySelectorAll(".filter-mobile button");
    for (let i = 0; i < filterMobileBtns.length; i++) {
        filterMobileBtns[i].addEventListener("click", function () {
            let current = document.querySelectorAll(".actived-mobile-btn");
            current[0].classList.remove('actived-mobile-btn');
            this.classList.add('actived-mobile-btn');
        });
    }

    // update todo items left
    let todoItems = document.getElementsByClassName('active');
    let itemsLeft = document.getElementById('items-left');
    itemsLeft.innerText = todoItems.length + ' items left';


    


    // clear all completed todo
    const clearButton = document.querySelector('.clear-completed');
    clearButton.addEventListener('click', function() {
        const completedTodosNode = document.querySelectorAll('.completed');
        for (let completedTodo of completedTodosNode) {
            completedTodo.parentElement.remove();
        }
    });
    


    todoList.addEventListener('click', function (event) {
        const checkboxes = document.querySelectorAll('.checkbox');

        if (event.target.type == 'checkbox') {
            if (event.target.checked) {
                event.target.parentElement.nextElementSibling.classList.add('completed');
                event.target.parentElement.nextElementSibling.classList.remove('active');
            } else {
                event.target.parentElement.nextElementSibling.classList.remove('completed');
                event.target.parentElement.nextElementSibling.classList.add('active');
            }
        }

        // remove an item
        if (event.target.className == 'delete-todo-item') {
            event.target.parentElement.remove();
            // update todo items left
            let todoItems = document.getElementsByClassName('active');
            let itemsLeft = document.getElementById('items-left');
            itemsLeft.innerText = todoItems.length + ' items left';
        }




        for (let checkbox of checkboxes) {
            checkbox.addEventListener('change', function () {
                // update todo items left
                let todoItems = document.getElementsByClassName('active');
                let itemsLeft = document.getElementById('items-left');
                itemsLeft.innerText = todoItems.length + ' items left';
            });
        }

    });


    // Get All filter buttons
    const filterButtons = document.getElementsByClassName('filter-btn');
    const completedTodos = document.getElementsByClassName('completed');
    const activeTodos = document.getElementsByClassName('active');
    // Filter todos
    for (let filterButton of filterButtons) {
        filterButton.addEventListener('click', function (event) {
            console.log(event.target.classList.contains('completed-btn'));
            if (event.target.classList.contains('completed-btn')) {
                for (activeTodo of activeTodos) {
                    activeTodo.parentElement.style.display = 'none';
                }
                for (completedTodo of completedTodos) {
                    completedTodo.parentElement.style.display = 'flex';
                }
            } else if (event.target.classList.contains('active-btn')) {
                for (completedTodo of completedTodos) {
                    completedTodo.parentElement.style.display = 'none';
                }
                for (activeTodo of activeTodos) {
                    activeTodo.parentElement.style.display = 'flex';
                }
            } else {
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