/**
 * Adds the keydown event listener to the search bar.
 */
function addSeachBarEventListener() {
    const searchBarInp = document.getElementById('search-task');
    searchBarInp.addEventListener('input', () => {
        renderTaskItems(filterTasks(searchBarInp));
    });
}


/**
 * Adds the click event to the add task button.
 */
function addNewTaskButtonEventListener() {
    const modalAddTask = document.getElementById('add-task-form');
    const newTaskBtn = document.getElementById('new-task-btn');

    newTaskBtn.addEventListener('click', () => openAddTaskModal('todo', modalAddTask));
}


/**
 * Adds the click event to every add task button in the colums of the board.
 */
function addNewTaskEventListener() {
    const toDoTaskBtn = document.getElementById('todo-btn');
    const inProgressTaskBtn = document.getElementById('progress-btn');
    const awaitingTaskBtn = document.getElementById('awaiting-btn');
    const doneTaskBtn = document.getElementById('done-btn');
    const modalAddTask = document.getElementById('add-task-form');
    const modalTaskClose = document.getElementById('modal-task-close');

    toDoTaskBtn.addEventListener('click', () => openAddTaskModal('todo', modalAddTask));
    inProgressTaskBtn.addEventListener('click', () => openAddTaskModal('progress', modalAddTask));
    awaitingTaskBtn.addEventListener('click', () => openAddTaskModal('awaiting', modalAddTask));
    doneTaskBtn.addEventListener('click', () => openAddTaskModal('done', modalAddTask));
    modalTaskClose.addEventListener('click', () => closeAddTaskModal(modalAddTask));
}


/**
 * Shows the add task modal and sets a data property with the desired status.
 * @param {string} status Status of the task.
 * @param {HTMLElement} modal Add task modal.
 */
function openAddTaskModal(status, modal) {
    clearInputFields();
    adjustModal('add');
    renderAssigneesBubbles();
    modal.showModal();
    modal.dataset.status = status;
}


/**
 * Closes the modal and clears the input fields.
 * @param {HTMLElement} modal Add task modal.
 */
function closeAddTaskModal(modal) {
    modal.close()
}


/**
 * Adds the click event listener to close the modal.
 */
function addModalCloseEventListener() {
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('modal');

    modalClose.addEventListener('click', () => {
        modal.close();
    })
}