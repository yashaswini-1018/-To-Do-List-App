const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        addTaskToDOM(task);
        saveTasks();
        taskInput.value = '';
    }
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = task.text;
    if(task.completed) span.classList.add('completed');
    li.appendChild(span);

    // Toggle complete on clicking the task text
    span.addEventListener('click', () => {
        task.completed = !task.completed;
        span.classList.toggle('completed');
        saveTasks();
    });

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newText = prompt("Edit task:", task.text);
        if(newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            span.textContent = task.text;
            saveTasks();
        }
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
