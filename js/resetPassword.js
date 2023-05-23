function backToLogin() {
    window.location.href = 'login.html';
}

function comparePassword() {
    if (newPassword.value == confirmPassword.value) {
        resetButton.disabled = false;
    } else {
        resetButton.disabled = true;
    }
}

// function changePassword() {
    
// }