function addTodo() {
    // get todo list element
    const todoList = document.querySelector('.todo-list');

    // get todo text
    const todoText = document.querySelector('.todo-input-text').value;

    // make todo
    const todo = makeTodo(todoText);

    // get the todo into todo list 
    todoList.insertBefore(todo, todoList.children[0]);
}


function makeTodo(text) {
    // create input checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');

    // create checkmark
    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    // create label checkbox
    const todoLabelCheckbox = document.createElement('label');
    todoLabelCheckbox.classList.add('todo-label-checkbox');

    // get the checkbox and checkmark into the label checkbox
    todoLabelCheckbox.append(checkbox, checkmark);

    // create todo item 
    const todoItem = document.createElement('span');
    todoItem.classList.add('todo-item');

    // adding text to todo item
    todoItem.innerText = text;

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo-item');

    // create container todo item
    const containerTodoItem = document.createElement('li');
    containerTodoItem.classList.add('container-todo-item');
    containerTodoItem.setAttribute('draggable', 'true');
    // drag event
    containerTodoItem.addEventListener('dragstart', () => {
        containerTodoItem.classList.add('dragging');
    });
    containerTodoItem.addEventListener('dragend', () => {
        containerTodoItem.classList.remove('dragging');
    });
    containerTodoItem.addEventListener('touchstart', () => {
        containerTodoItem.classList.add('dragging');
    });
    containerTodoItem.addEventListener('touchend', () => {
        containerTodoItem.classList.remove('dragging');
    });
    

    const isTodoChecked = document.getElementById('checkbox').checked;
    if (isTodoChecked) {
        todoItem.classList.add('completed');
        checkbox.checked = 'checked';
    } else {
        todoItem.classList.add('active');
    }

    // get the label checkbox, todo item, and delete button into container todo item
    containerTodoItem.append(todoLabelCheckbox, todoItem, deleteButton);

    return containerTodoItem;
}

// Drag Function
