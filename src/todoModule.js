var TodoListApp = ( function () {

    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');


    async function fetchTodos() {
        // GET Request
        try {   
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    }


    function addTaskToDOM(task) {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="./assets/images/garbage-bin3.svg" class="delete" data-id="${task.id}" />
        `;

        taskList.append(li);
    }

    function renderList () {
        taskList.innerHTML = '';

        for(let task of tasks) {
            addTaskToDOM(task);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask (taskId) {
        console.log(taskId);
        const task = tasks.filter( task => {
            return task.id == Number(taskId);
        });

        if(task.length > 0) {
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            // showNotification('Task toggled successfully');
            return;
        }

        showNotification('Could not toggle the task');
    }

    function deleteTask (taskId) {
        const newTasks = tasks.filter( task => {
            return task.id != Number(taskId);
        })

        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask (task) {
        if(task) {

            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(task),
            //     })
            //     .then( response => {
            //         return response.json();
            //     })
            //     .then( data => {
            //         // tasks = data.slice(0, 10);
            //         // renderList();
            //         console.log(data);
            //         tasks.push(task);
            //         renderList();
            //         showNotification('Task added successfully');
            //         return;
            //     })
            //     .catch( error => {
            //         console.log('Error', error);
            // })

            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }

        showNotification('Task can not be added');
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeypress(e) {
        if(e.key === 'Enter') {
            const text = e.target.value;

            if(!text) {
                showNotification('Task text can not be empty');
                return;
            }

            const task = {
                userId: 1,
                id: Date.now().toString(),
                title: text,
                completed: false
            }

            e.target.value = '';
            addTask(task);
        }

    }

    function handleClickListener(e) {
        const target = e.target;

        if ( target.className === 'delete' ) {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if ( target.className === 'custom-checkbox' ) {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }

    return {
        initialize: initializeApp
    }

})();
