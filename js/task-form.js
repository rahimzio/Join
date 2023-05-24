'use strict';


/**
 * Initial function that gets executed after the document is loaded.
 */
function initTask() {
    buttonEventListener();
    renderAssignees();
    setMinTaskDate();
}


/**
 * Adds click event listeners to all listed elements
 */
function buttonEventListener() {
    const clearTaskBtn = document.getElementById('clear-task');
    const assigneeMenu = document.getElementById('assignee');
    const subtaskBtn = document.getElementById('subtask-add');

    assigneeMenu.addEventListener('click', toggleDropdown);
    clearTaskBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        clearInputFields();
    })
    subtaskBtn.addEventListener('click', addSubtaskToTask);
}


/**
 * Sets the min date for the datepicker.
 */
function setMinTaskDate() {
    const date = document.getElementById('date');

    date.min = getCurrentFormattedDate();
}


/**
 * Return the current date in the yyyy-mm-dd format.
 * @returns Formated date yyyy-mm-dd.
 */
function getCurrentFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthTwoDigit = month < 10 ? `0${month}` : month;
    const day = currentDate.getDate();
    const dayTwoDigit = day < 10 ? `0${day}` : day;

    return `${year}-${monthTwoDigit}-${dayTwoDigit}`;
}


/**
 * Adds and stores the new task to the database.
 */
function addTask() {
    const createdWithStatus = document.getElementById('add-task-form').dataset.status;
    const id = Date.now().toString(36);
    const titleInp = document.getElementById('title');
    const descriptionInp = document.getElementById('description');
    const categoryInp = document.getElementById('category');
    const dateInp = document.getElementById('date');
    const priorityInp = document.querySelector('input[name="priority"]:checked');
    const priority = priorityInp != null ? priorityInp.value : 'low';
    const assignees = [];
    const assigneeInp = document.querySelectorAll('.assignee input[type="checkbox"]:checked');
    assigneeInp.forEach(assignee => assignees.push(assignee.value));
    const subtasks = getSubtasks();

    if (isInputValid(assignees)) {
        const task = {
            id: id,
            title: titleInp.value,
            description: descriptionInp.value,
            category: categoryInp.value,
            assignees: assignees,
            date: dateInp.value,
            priority: priority,
            status: createdWithStatus,
            subtasks: subtasks
        }

        storeTasks(task);
    }
}


/**
 * Gets all subtask that have been added to the form.
 * @returns Array of subtasks.
 */
function getSubtasks() {
    const subtasksEl = document.querySelectorAll('label.subtask');
    const subtaskArr = [];

    subtasksEl.forEach(label => {
        const subtaskTitle = label.innerText;
        const isSubtaskChecked = label.children.namedItem(label.htmlFor).checked;
        subtaskArr.push({
            id: label.htmlFor,
            title: subtaskTitle,
            isChecked: isSubtaskChecked
        });
    })
    return subtaskArr;
}


/**
 * Validates the user input.
 * @param {array} assignees Array of assignees.
 * @returns 
 */
function isInputValid(assignees) {
    const titleInp = document.getElementById('title');
    const categoryInp = document.getElementById('category');
    const dateInp = document.getElementById('date');
    const assigneeCheck = document.getElementById('assignee-check');
    const isInputValid = titleInp.checkValidity() && categoryInp.checkValidity() && dateInp.checkValidity() && assignees.length > 0;
    assigneeCheck.checked = false;

    if (assignees.length === 0) {
        assigneeCheck.reportValidity()
    } else {
        assigneeCheck.checked = true;
    }
    return isInputValid;
}


/**
 * Clears the input fields of the form.
 */
function clearInputFields() {
    const titleInp = document.getElementById('title');
    const descriptionInp = document.getElementById('description');
    const categoryInp = document.getElementById('category');
    const dateInp = document.getElementById('date');
    const assigneeInp = document.querySelectorAll('input[type="checkbox"]:checked');
    const priority = document.querySelector('input[name="priority"]:checked');
    const subtaskContainer = document.getElementById('subtask-container');

    titleInp.value = '';
    descriptionInp.value = '';
    categoryInp.value = '';
    assigneeInp.forEach(assignee => assignee.checked = false);
    dateInp.value = '';
    subtaskContainer.innerHTML = '';

    if (priority) {
        priority.checked = false;
    }
}


/**
 * Stores the task in the database and clears the input fields.
 * @param {object} task Task object.
 */
async function storeTasks(task) {
    tasks.push(task);
    await storeItem('tasks', tasks);
    clearInputFields();
    window.location.pathname = '/join/board.html';
}


/**
 * Toggles the custom dropdown menu for the assignees.
 */
function toggleDropdown() {
    const assigneeBackground = document.getElementById('assignee-background');
    const assigneeContainer = document.getElementById('assignee-container');

    assigneeBackground.classList.toggle('d-none');
    assigneeContainer.classList.toggle('d-none');
}


/**
 * Renders the assignees (all available contacts) into the dropdown selection.
 */
function renderAssignees() {
    const assigneeContainer = document.getElementById('assignee-container');

    assigneeContainer.innerHTML = '';
    contacts.forEach(contact => {
        assigneeContainer.innerHTML += assigneeTemp(contact);
    });
}


/**
 * Renders the assignees bubbles of the selected assignees.
 * @returns undefined
 */
function renderAssigneesBubbles() {
    const assigneeBubblesEl = document.getElementById('assignee-bubbles');
    const selectedAssignees = document.querySelectorAll('#assignee-container input[type="checkbox"]:checked');
    let assigneesHTML = '';
    assigneeBubblesEl.innerHTML = '';

    for (let i = 0; i < selectedAssignees.length; i++) {
        const contact = contacts.find(contact => contact.id === selectedAssignees[i].id);
        const firstnameChar = contact.firstname.charAt(0).toUpperCase();
        const lastnameChar = contact.lastname.charAt(0).toUpperCase();
        const initials = `${firstnameChar}${lastnameChar}`;
        const assigneeOffset = i * 12;

        if (i == 10) {
            assigneesHTML += assigneeHTMLTemp(`+${selectedAssignees.length - i}`, contact.color, assigneeOffset);
            assigneeBubblesEl.innerHTML = assigneesHTML;
            return;
        } else {
            assigneesHTML += assigneeHTMLTemp(initials, contact.color, assigneeOffset);
            assigneeBubblesEl.innerHTML = assigneesHTML;
        }
    }
}


/**
 * Adds a subtask to the task form.
 */
function addSubtaskToTask() {
    const subtaskInp = document.getElementById('subtask-input');
    const subtaskContainerEl = document.getElementById('subtask-container');
    const inputValue = subtaskInp.value.trim();
    const id = Date.now().toString(36);

    if (inputValue.length > 0) {
        subtaskContainerEl.innerHTML += subtaskEditHTMLTemp(subtaskInp.value, id);
        subtaskInp.value = '';
    }
}


/**
 * Renders the subtasks.
 * @param {object} task Task object.
 * @returns 
 */
function renderSubtasks(task) {
    let subtasksHTML = '';

    task.subtasks.forEach(subtask => {
        subtasksHTML += subtaskHTMLTemp(task.id, subtask.title, subtask.id, subtask.isChecked);
    })

    return subtasksHTML
}


/**
 * Deletes the subtask from the task form.
 * @param {string} id Id of the subtask.
 */
function deleteSubtaskFromTask(id) {
    const subtaskEl = document.getElementById(`subtask-item-${id}`);

    subtaskEl.remove();
}


/**
 * HTML template for rendering the assignee.
 * @param {Object} contact Conact that should be rendered
 * @returns HTML assignee template
 */
function assigneeTemp(contact) {
    return `
        <label for="${contact.id}" class="assignee">${contact.firstname} ${contact.lastname}
            <input type="checkbox" name="${contact.id}"id="${contact.id}" value="${contact.id}"  onchange="renderAssigneesBubbles()">
            <span class="checkmark"></span>
        </label>`;
}


/**
 * Return the HTML template for the assignees bubble.
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
 * Returns the HTML template for the subtask.
 * @param {string} subtaskText Text of the subtask.
 * @param {string} id Id of the subtask.
 * @returns  HTML subtask template.
 */
function subtaskHTMLTemp(taskId, subtaskText, id, isChecked=false) {
    return (`
        <div class="d-flex subtask-item" id="subtask-item-${id}" data-id="${id}">
            <label for="${id}" class="subtask">${subtaskText}
                <input type="checkbox" name="${id}" id="${id}" value="${id}" onchange="updateSubtasks('${taskId}', '${id}')" ${isChecked ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
        </div>
    `);
}


/**
 * Returns the HTML template for the subtask.
 * @param {string} subtaskText Text of the subtask.
 * @param {string} id Id of the subtask.
 * @returns  HTML subtask template.
 */
function subtaskEditHTMLTemp(subtaskText, id, isChecked=false) {
    return (`
        <div class="d-flex subtask-item" id="subtask-item-${id}" data-id="${id}">
            <label for="${id}" class="subtask">${subtaskText}
                <input type="checkbox" name="${id}" id="${id}" value="${id}" ${isChecked ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <img src="./assets/icons/trash.svg" class="subtask-delete" onclick="deleteSubtaskFromTask('${id}')">
        </div>
    `);
}