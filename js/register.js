let users = [];

async function initRegister() {
    loadUsers();
}

async function loadUsers() {
    users = JSON.parse(await getItem('users'));
}

async function register() {
    registerButton.disabled = true;
    let firstName = username.value.split(', ')[0];
    let lastName = username.value.split(', ')[1];
    users.push({
        firstName: firstName,
        lastName: lastName,
        email: email.value,
        password: password.value,
    })

    // await setItem('users', JSON.stringify(users));
    sourceToLogin();
}

function checkRegistration() {
    let user = users.find(u => u.email == email.value);
    if (user) {
        document.getElementById('fault').classList.remove('d-none');
        document.getElementById('email').style.borderColor = 'red';
        registerButton.disabled = true;
    } else {
        registerButton.disabled = false;
    }
}

function sourceToLogin() {
    backToLogin();
    document.getElementById('success').classList.remove('d-none');
}