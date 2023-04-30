'use strict';


/**
 * Initial function that gets executed after the document is loaded.
 */
async function init() {
    await includeHTML();
    highlightActiveMenuItem();
    logoutModalEventListener();
}


/**
 * Inserts the HTML from the template files into the referenced file.
 */
async function includeHTML() {
    const includeElements = document.querySelectorAll('[template-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        const file = element?.getAttribute("template-html");

        const resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Highlights the active menu item after the page is loaded. The marking takes place on the basis of the current path.
 */
function highlightActiveMenuItem() {
    const currentPath = location.pathname;
    const legalEl = document.getElementById('legal-desktop');

    switch (currentPath) {
        case '/summary.html':
            addActiveClass('summary');
            break;
        case '/board.html':
            addActiveClass('board');
            break;
        case '/task.html':
            addActiveClass('task');
            break;
        case '/contacts.html':
            addActiveClass('contacts');
            break;
        case '/legal.html':
            legalEl?.classList.add('active');
            break;
        default:
            break;
    }
}


/**
 * Adds the class .active to the given element.
 * @param {string} elem String of the item
 */
function addActiveClass(elem) {
    const desktopEl = document.getElementById(`${elem}-desktop`);
    const mobileEl = document.getElementById(`${elem}-mobile`);

    desktopEl?.classList.add('active');
    mobileEl?.classList.add('active');
}


/**
 * Adds an event listener to the profile picture to toggle the logout modal.
 */
function logoutModalEventListener() {
    const profilePicture = document.getElementById('profile-picture');
    const logoutModal = document.getElementById('logout-modal');

    profilePicture?.addEventListener('click', () => {
        logoutModal?.classList.toggle('d-none');
    });
}


/**
 * Loads the items to the given key from the backend. If no items are available an empty array is returned.
 * @param {string} key Key of the item that should be loaded.
 * @returns Array of items.
 */
async function loadItem(key) {
    return await JSON.parse(backend.getItem(key)) || [];
}


/**
 * Stores the items under the given key in the backend.
 * @param {string} key Name of the key under which the items should be stored.
 * @param {string[]} content Array of items that should be stored.
 */
async function storeItem(key, content) {
    await backend.setItem(key, JSON.stringify(content));
}


/**
 * Formats the date in german notation.
 * @param {string} date Date in format yyyy-mm-dd,
 * @returns Date in format dd.mm.yyyy,
 */
function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}


init();