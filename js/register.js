let users = [];

async function initRegister() {
    loadUsers();
}

async function loadUsers() {
    users = JSON.parse(await getItem('users'));
}

async function register() {
    registerButton.disabled = true;
    users.push({
        username: username.value,
        email: email.value,
        password: password.value,
    })

    // await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
    registerButton.disabled = false;
}