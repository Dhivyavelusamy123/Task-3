const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', modifyTask);

// Functions

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTask(taskText);
    taskInput.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => li.classList.toggle('completed'));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        removeTask(taskText);
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}

function saveTask(taskText) {
    let tasks = getTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(taskText => {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
    });
}
