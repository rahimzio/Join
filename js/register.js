let users = [];

/**
 * Function to initial the 'Register' section
 */
async function initRegister() {
    loadUsers();
}

/**
 * Load the userdata from the online-storage
 * @param {JSON} users 
 */
async function loadUsers() {
    users = JSON.parse(await getItem('users'));
}

/**
 * Save the userdata to the online-storage
 */
async function register() {
    registerButton.disabled = true;
    let lastName = username.value.split(',')[0];
    let firstName = username.value.split(',')[1];
    users.push({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.value,
        password: password.value,
    })

    // await setItem('users', JSON.stringify(users));
    sourceToLogin();
}

/**
 * Function that checks if the email which is wanted to use to register is already exists
 * If it is, a message-box will be ploped out to change the email 
 */
function checkRegistration() {
    let user = users.find(u => u.email == email.value);
    if (user) {
        fault.classList.add('msg-animation');
        email.style.borderColor = 'red';
        registerButton.disabled = true;
    } else {
        fault.classList.remove('msg-animation');
        email.style.borderColor = '';
        registerButton.disabled = false;
    }
}

/**
 * Function that sources the user back to the Log-in-Section and
 * shows an animated pop-out which says that the registration is successful
 */
function sourceToLogin() {
    backToLogin();
    success.classList.add('msg-animation');
}