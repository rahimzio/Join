let toResetPw;

function checkMail() {
    let user = users.find(u => u.email == email.value);
    if (user) {
        toResetPw = email.value;
        email.style.borderColor = '';
    }
    else {
        fault.classList.add('msg-animation');
        email.value = '';
        email.style.borderColor = 'red';
    }
}

function deleteMessageBox() {
    let user = users.find(u => u.email != email.value);
    if (user) {
        fault.classList.remove('msg-animation');
    }
}