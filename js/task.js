let btnAddTaskEl = document.querySelector('#btnNew')
let taskNameEl   = document.querySelector('#inputName')


let tasks = getTaskFromLocalStorage ()

renderTasks (tasks)

btnAddTaskEl.addEventListener('click', function() {
    if (!taskNameEl.value) {
        alert('Please input name!')
        return false;
    }

    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage ()
    let task = { name: taskNameEl.value}

    if (taskId == 0 || taskId) {
        tasks[taskId] = task
        this.removeAttribute('id')
    } else {

        
        tasks.push(task)
        
    }
        taskNameEl.value = ''

    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)

})

function editTask(id) {
    let tasks = getTaskFromLocalStorage()

    if (tasks.length > 0) {
        taskNameEl.value = tasks[id].name
        btnAddTaskEl.setAttribute('id', id)
    }

}

function deleteTask(id) {
    if (confirm('Bạn có thực sự muốn xóa task')) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}

function renderTasks(tasks = []) {

    let content = '<ul>'

    tasks.forEach((task, index) => {
        content += `<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Edit</a>
            <a href="#" onclick="deleteTask(${index})">Del</a>
    </li>`
    })

    content += '</ul>'

    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}