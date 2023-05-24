'use strict';


let users = [];


/**
 * Initial function that gets executed after the document has loaded.
*/
async function init() {
    await downloadFromServer();
    users = await loadItem('users');
    buttonEventListener();
}


/**
 * Sets up event listeners for all buttons.
 */
function buttonEventListener() {
    const signupBtn = document.getElementById('signup');
    const loginBtn = document.getElementById('login');
    const guestLoginBtn = document.getElementById('guest-login');

    signupBtn?.addEventListener('click', () => window.location.href = 'sign-up.html');
    loginBtn?.addEventListener('click', (event) => loginUser(event));
    guestLoginBtn?.addEventListener('click', (event) => loginGuest(event));
}


/**
 * Logs the user in if the login credentials are correct.
 */
function loginUser(event) {
    event.preventDefault();
    const loginInp = document.getElementById('login-email');
    const passwordInp = document.getElementById('login-password');
    const user = users.find(user => user.email === loginInp.value);
    const isCredentialsCorrect = user?.password === passwordInp.value;

    if (user && isCredentialsCorrect) {
        const currentUser = { username: user.username }

        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'summary.html';
    } else {
        notify('Wrong credentials!');
    }
}


/**
 * Logs the user in with the guest account.
 */
function loginGuest(event) {
    event.preventDefault();
    const currentUser = { username: 'Guest' }

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = 'summary.html';
}


init();