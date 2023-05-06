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

function checkRegistration() {
    let user = users.find(u => u.email == email.value);
    if (user) {
        throw `Email: ${email.value} already exists.`;
    }
}

function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
    registerButton.disabled = false;
}