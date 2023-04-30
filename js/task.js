'use strict';


let tasks = [];
let contacts = [];


/**
 * Initial function that gets executed after the document is loaded.
 */
async function init() {
    await downloadFromServer();
    contacts = await loadItem('contacts');
    tasks = await loadItem('tasks');
    addTaskEventListener();
    initTask();
}


/**
 * Sets the event listener for the add task button.
 */
function addTaskEventListener() {
    const addTaskBtn = document.getElementById('add-task'); +
    addTaskBtn?.addEventListener('click', addTask);
}


init();