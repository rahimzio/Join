/**
 * Adds the event listener for the board item.
 */
function addDragItemEventListener() {
    const draggableItems = document.querySelectorAll('.task-item');
    const dropContainers = document.querySelectorAll('.task-col');

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', () => itemDragStartEvent(item, dropContainers));
        item.addEventListener('dragend', () => itemDragEndEvent(item, dropContainers));
        item.addEventListener('click', () => itemClickEvent(item));
    });
}


/**
 * Marks the dragging item and the drop containers.
 * @param {object} item Task object.
 * @param {array} dropContainers Array of drop containers.
 */
function itemDragStartEvent(item, dropContainers) {
    item.classList.add('dragging');
    dropContainers.forEach(container => container.classList.add('mark-drop'));
}


/**
 * Removes the marking and updates the item.
 * @param {object} item Task object.
 * @param {array} dropContainers Array of drop containers.
 */
function itemDragEndEvent(item, dropContainers) {
    item.classList.remove('dragging');
    dropContainers.forEach(container => container.classList.remove('mark-drop'));
    updateItem(item);
}


/**
 * Opens the board item modal on click.
 * @param {object} item Task object.
 */
function itemClickEvent(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const task = tasks.find(task => task.id === item.dataset.id);
    const subtasks = renderSubtasks(task);
    let assignees = '';

    task.assignees.forEach(assignee => {
        const contact = contacts.find(contact => contact.id === assignee);
        const firstnameChar = contact.firstname.charAt(0).toUpperCase();
        const lastnameChar = contact.lastname.charAt(0).toUpperCase();
        const initials = `${firstnameChar}${lastnameChar}`;
        assignees += modalAssigneHTMLTemp(initials, contact);
    })

    modalContent.innerHTML = modalItemHTMLTemp(task, assignees, subtasks);
    modal.showModal()
}


/**
 * Adds the dragover event to each board column.
 */
function addDragContainerEventListener() {
    const dropContainers = document.querySelectorAll('.task-col');
    dropContainers.forEach(container => {
        container.addEventListener('dragover', event => containerDragOverEvent(event, container));
    });
}


/**
 * Dragover function for the board colums.
 * @param {object} event Dragover event object.
 * @param {HTMLElement} container Board column container.
 */
function containerDragOverEvent(event, container) {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const draggedItem = document.querySelector('.dragging');

    if (afterElement == null) {
        container.appendChild(draggedItem);
    } else {
        container.insertBefore(draggedItem, afterElement);
    }
}


/**
 * Gets the drag after element.
 * @param {HTMLElement} container Board column container.
 * @param {number} y Y mouse position.
 * @returns 
 */
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}