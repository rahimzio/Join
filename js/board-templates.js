// -------------------
// Templates
// -------------------

/**
 * Returns the HTML template for the board column header.
 * @param {string} title Title of the board column.
 * @param {string} id Id of the img element.
 * @returns 
 */
function taskColHeaderTemp(title, id) {
    return (`
        <div class="task-col-header">
            <h5 class="txt-h5">${title}</h5>
            <img src="./assets/icons/task_button.svg" alt="Add Task Icon" class="task-button" id="${id}" draggable="false">
        </div>
    `);
}


/**
 * Returns the HTML template for the board item.
 * @param {object} task Task object.
 * @param {string} assignees Assignee HTML template string.
 * @returns 
 */
function taskItemHTMLTemp(task, assignees, progress) {
    return (`
        <div class="task-item" data-id="${task.id}" draggable="true">
            <div class="category" style="background:${getCategoryColor(task)}">${task.category}</div>
            <div>
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            ${progress}
            <div class="task-footer">
                <div class="assignees">${assignees}</div>
                <div class="d-flex">
                    <img src="./assets/icons/${task.priority}.svg" alt="Priority Icon" class="priority" draggable="false">
                </div>
            </div>
        </div>
    `);
}


/**
 * Return the HTML template for the board item assignee.
 * @param {string} initials Initials of the contact.
 * @param {string} color Color for the initials bubble.
 * @param {number} offset Osset for the initials bubble.
 * @returns HTML assignee template.
 */
function assigneeHTMLTemp(initials, color, offset) {
    return (`
        <div class="assignee-task" style="right:${offset}px; background: hsl(${color}, 100%, 30%)">${initials}</div>
    `);
}


/**
 * Returns the HTML template for the item modal.
 * @param {object} task Task object.
 * @param {string} assignees Assignee HTML template string.
 * @returns HTML item template.
 */
function modalItemHTMLTemp(task, assignees, subtasks) {
    let subtaskEl = '<div class="modal-subtask-container subtask-container subtask-container d-flex-col" id="subtask-item-container"></div>';
    if (subtasks) {
        subtaskEl = `
            <div><b>Subtasks:</b>
                <div class="modal-subtask-container subtask-container subtask-container d-flex-col" id="subtask-item-container">${subtasks}</div>
            </div>`;
    }
    return (`
        <div class="modal-category"  style="background:${getCategoryColor(task)}">${task.category}</div>
        <div>
            <div class="modal-title txt-h4">${task.title}</div>
            <div class="modal-description">${task.description}</div>
        </div>
        <div class="modal-date"><b>Due Date:&nbsp;</b>${formatDate(task.date)}</div>
        <div class="modal-priority"><b>Priority:&nbsp;</b>
            <p  style="background: var(--${task.priority})">${task.priority}
                <img src="./assets/icons/${task.priority}_white.svg" draggable="false">
            </p>
        </div>
        <div class="modal-assignees"><b>Assigned to:</b>
            <div class="modal-assignee-container d-flex-col">${assignees}</div>
        </div>
        ${subtaskEl}
        <div>
            <button class="btn btn-primary" id="modal-edit" onclick="openEditTaskModal('${task.id}')"><img src="./assets/icons/edit.svg"></button>
            <button class="btn btn-primary" id="modal-delete" onclick="deleteTask('${task.id}')"><img src="./assets/icons/trash_white.svg"></button>
        </div>
    `);
}


/**
 * Returns the HTML template for the assignee dropdown.
 * @param {string} initials Initials of the contact.
 * @param {object} contact Contact object.
 * @returns HTML assignee template
 */
function modalAssigneHTMLTemp(initials, contact) {
    return (`
        <div class="modal-assignee d-flex">
            <div class="modal-assignee-initials" style="background:hsl(${contact.color}, 100%, 30%)">${initials}</div>
            <div>${contact.firstname} ${contact.lastname}</div>
        </div>
    `);
}


/**
 * Returns the HTML template for the subtask progress.
 * @param {number} progress Progress of the subtasks.
 * @param {number} total Total number of subtasks.
 * @param {number} completed Number of completed subtasks.
 * @returns HTML assignee template
 */
function subtaskProgressHTMLTemp(progress, total, completed) {
    return (`
        <div class="d-flex flex-center">
            <div id="subtask-progress-bar"><div id="subtask-progress" style="width: ${progress}%"></div></div>
            <div>${completed}/${total}</div>
        </div>
    `);
}