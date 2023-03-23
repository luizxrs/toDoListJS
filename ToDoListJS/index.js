let btnAdd = document.querySelector('#add-task-input');
let tasks = document.querySelector('#task-text-input');
let toAddTasks = document.querySelector('.allTasks');
let clearAllButton = document.querySelector('#clear-all')
let errorToAdd = false;
var allTasks = [];
displayTasks();

btnAdd.addEventListener('click', function saveTask() {
    if(tasks.value.length <= 0) {
        errorToAdd = true;
        return;
    } else {
        addTasks(tasks.value);
    }
})

function addTasks(value) {
    let task = value;
    let tasks = JSON.parse(localStorage.getItem('to-do')) || [];
    tasks.push(task);
    localStorage.setItem('to-do', JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    allTasks = JSON.parse(localStorage.getItem('to-do')) || [];
    let taskList = document.createElement('ul')
    taskList.className = 'task-box';
    for(let i = 0; i < allTasks.length; i++) {
        let taskItem = document.createElement('li')
        let button = document.createElement('button')
        button.className = 'btn-style-remove btn-hover';
        button.id = `deleteTask-${i}`;
        button.innerText = `X`
        button.addEventListener('click', () => {
            delLi(i)
        })
        taskItem.className = 'task-content';
        taskItem.innerHTML = allTasks[i];
        taskList.appendChild(taskItem);
        taskItem.appendChild(button);
    }
    let divContent = document.createElement('div');
    divContent.className = 'tasks';
    divContent.appendChild(taskList);
    toAddTasks.innerHTML = '';
    toAddTasks.appendChild(divContent);
    document.getElementById('footerText').innerHTML = `Voce ainda tem ${allTasks.length} tarefas faltando.`;

}

clearAllButton.addEventListener('click', () => {
    clearAllTasks()
})

function clearAllTasks() {
    localStorage.removeItem('to-do')
    displayTasks();
}

function delLi(value) {
    console.log('delLi')
    allTasks.splice(value, 1)
    localStorage.setItem('to-do', JSON.stringify(allTasks));
    displayTasks();
}

