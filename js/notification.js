'use strict';


/**
 * Displays a notification.
 * @param {string} message Message that should be displayed in the notification box.
 */
function notify(message = 'Succesfully created!') {
    const notifyEl = document.getElementById('notification');

    notifyEl.innerHTML = message;
    notifyEl.style.display = 'flex';
    notifyEl.classList.remove('fade-out');
    notifyEl.classList.add('fade-in');

    setTimeout(() => {
        notifyEl.classList.remove('fade-in');
        notifyEl.classList.add('fade-out');
    }, 4500);

    setTimeout(() => {
        notifyEl.style.display = 'none';
    }, 4990);
}