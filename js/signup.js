'use strict';


let users = [];


/**
 * Initial function that gets executed after the document has loaded.
*/
async function init() {
    await downloadFromServer();
    users = await loadItem('users');
    signUpEventListener();
}


/**
 * Sets up a event listener for the sign up button.
 */
function signUpEventListener() {
    const signUpBtn = document.getElementById('sign-up');

    signUpBtn.addEventListener('click', () => createUser());
}


/**
 * Creates a new user with the data from the input fields and stores it in the 'backend'.
 */
function createUser() {
    const usernameInp = document.getElementById('sign-up-username');
    const emailInp = document.getElementById('sign-up-email');
    const passwordInp = document.getElementById('sign-up-password');

    const user = {
        username: usernameInp.value,
        email: emailInp.value,
        password: passwordInp.value
    }

    validateInput(usernameInp, emailInp, passwordInp, user);
}


/**
 * Validates the input and stores the user if all checks are passed.
 * @param {HTMLElement} usernameInp Element of the username input.
 * @param {HTMLElement} emailInp Element of the email input.
 * @param {HTMLElement} passwordInp Element of the password input.
 * @param {Object} user Object of the new User
 */
async function validateInput(usernameInp, emailInp, passwordInp, user) {
    if (usernameInp.checkValidity() && emailInp.checkValidity() && passwordInp.checkValidity()) {
        if (!checkIfUserExists(user)) {
            users.push(user);
            await storeItem('users', users);
            window.location.href = 'index.html';
        } else {
            alert(`A user with email ${user.email} already exists!`);
        }
    }
}


/**
 * Checks if the new user already exists in the database.
 * @param {Object} newUser Object with the data of the new user.
 * @returns 
 */
function checkIfUserExists(newUser) {
    return users.find(user => user.email === newUser.email);
}


init();