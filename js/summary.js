'user strict';


let tasks = [];


/**
 * Initial function that gets executed after the document has loaded.
*/
async function init() {
    await downloadFromServer();
    tasks = await loadItem('tasks');
    setTaskNumbers();
    setUrgentTasks();
    addTaskEventListener();
}


/**
 * Sets event listener to redirect to the board when you click on a box.
 */
function addTaskEventListener() {
    const taskBoxes = document.querySelectorAll('.box');
    taskBoxes.forEach(box => {
        box.addEventListener('click', () => window.location.href = './board.html');
    });
}


/**
 * Sets the number of the display element for the corresponding task type.
 */
function setTaskNumbers() {
    const tasksEl = document.getElementById('tasks');
    const toDoEl = document.getElementById('to-do');
    const inProgressEl = document.getElementById('in-progress');
    const awaitingEl = document.getElementById('awaiting');
    const doneEl = document.getElementById('done');
    const numTasks = countTasks();

    tasksEl.innerHTML = tasks.length;
    toDoEl.innerHTML = numTasks.toDo;
    inProgressEl.innerHTML = numTasks.inProgress;
    awaitingEl.innerHTML = numTasks.awaiting;
    doneEl.innerHTML = numTasks.done;
}


/**
 * Counts the tasks for each task status.
 * @returns Object with counted tasks.
 */
function countTasks() {
    const numTasks = {
        toDo: 0,
        inProgress: 0,
        awaiting: 0,
        done: 0
    }

    tasks.forEach(task => {
        switch (task.status) {
            case 'todo':
                numTasks.toDo += 1;
                break;
            case 'progress':
                numTasks.inProgress += 1;
                break;
            case 'awaiting':
                numTasks.awaiting += 1;
                break;
            case 'done':
                numTasks.done += 1;
                break;
        }
    });

    return numTasks;
}


/**
 * Sets the number and date of the display element for the urgent tasks.
 */
function setUrgentTasks() {
    const urgentEl = document.getElementById('urgent');
    const urgentDateEl = document.getElementById('urgent-date');
    const urgentTasks = getUrgentTasks();
    
    urgentEl.innerHTML = urgentTasks.length;

    if (urgentTasks.length > 0) {
        const upcomingDeadline = getUpcomingDeadline(urgentTasks);
        urgentDateEl.innerHTML = formatDate(upcomingDeadline);
    }
}


/**
 * Returns an array of the filtered urgent tasks.
 * @returns Array of urgent tasks.
 */
function getUrgentTasks() {
    return tasks.filter(task => task.priority === 'urgent');
}


/**
 * Sorts the urgent task by date and returns the date of the most urgent task.
 * @param {Array} urgentTasks Array of urgent tasks.
 * @returns Date string of the umpcoming deadline.
 */
function getUpcomingDeadline(urgentTasks) {
    return urgentTasks.sort((taskA, taskB) => taskA.date.localeCompare(taskB.date))[0].date;
}


init();