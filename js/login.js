function guestLogin() {
    window.location.href = 'summary.html?msg=guest login';
}

function login() {
    let user = users.find(u => u.email == loginMail.value && u.password == loginPassword.value);
    if (user) {
        window.location.href = `summary.html?msg=logged in`;
    } 
    else {
        document.getElementById('loginPassword').style.borderColor = 'red';
    }

    saveData();
}

function saveData() {
    if (checkbox.checked) {
        localStorage.setItem('JoinEmail', loginMail.value);
        localStorage.setItem('JoinPassword', loginPassword.value);
    }
}

function loadData() {
    let savedMail = localStorage.getItem('JoinEmail');
    let savedPassword = localStorage.getItem('JoinPassword');
    loginMail.value = savedMail;
    loginPassword.value = savedPassword;
}