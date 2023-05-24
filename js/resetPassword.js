/**
 * Sources back to the Log-in-page
 */
function backToLogin() {
    window.location.href = 'login.html';
}

/**
 * Compares the written passwords
 * if they are the same, the password-change will be accept
 */
function comparePassword() {
    if (newPassword.value == confirmPassword.value) {
        resetButton.disabled = false;
    } else {
        resetButton.disabled = true;
    }
}