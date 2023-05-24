/**
 * Function to check if the mail exists, if it´s not, an animation will be plop and the bordercolor turns to red.
 * @param {Array} users Parameter with the saved userdata
 */
function checkMail() {
    let user = users.find(u => u.email == email.value);
    if (user) {
        email.style.borderColor = '';
    }
    else {
        fault.classList.add('msg-animation');
        email.value = '';
        email.style.borderColor = 'red';
    }
}

/**
 * Resets the animation, which shows that the mail is already exists.
 */
function deleteMessageBox() {
    let user = users.find(u => u.email != email.value);
    if (user) {
        fault.classList.remove('msg-animation');
    }
}