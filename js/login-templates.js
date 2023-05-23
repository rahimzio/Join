/**
 * Initial function that gets executed after the document is loaded.
 * @param {HTMLElement} action Parameter that defers which HTML-Template got executed.
 */
function initLogin(action) {
    let login = document.getElementById('login');
    login.innerHTML = action;
    if (action == loginHTML()) {
        loadData();
    }
}

/**
 * Function that removes the animation by return on the Login page
 */
function backToLogin() {
    let login = document.getElementById('login');
    login.innerHTML = loginHTML();
    logo.classList.remove('logo-animation');
    loginBox.classList.remove('animation');
    signUpButton.classList.remove('animation');
    loadData();
}

/**
 * Returns the HTML-Template for the 'Login' section
 * @returns HTML-Login 
 */
function loginHTML() {
    return /*html*/ `
        <header class="d-flex">
            <img id="logo" class="logo logo-animation" src="./assets/img/logo_blue.svg">
            <div id="signUpButton" class="sign-up-section animation">
                <p class="sign-up-text">Not a Join user?</p>
                <button onclick="initLogin(signUpHTML())" type="button" class="btn btn-primary sign-up-button">Sign up</button>
            </div>
        </header>

        <main id="loginBox" class="d-flex-col animation">
            <h1 class="txt-h1">Log in</h1>
            <div class="line"></div>
            <form onsubmit="login(); return false;" class="d-flex-col gap-40">
                <input id="loginMail" required class="text-input mail-icon" placeholder="Email" type="email">
                <input id="loginPassword" required class="text-input lock-icon" placeholder="Password" type="password">
                <div class="d-flex gap-10">
                    <input id="checkbox" type="checkbox" checked class="checkbox">
                    <p>Remember me</p>
                    <a onclick="initLogin(forgotPasswordHTML())" class="link">Forgot my password</a>
                </div>
                <div class="d-flex gap-50">
                    <button class="btn btn-primary login txt-h2">Log in</button>
                    <button type="button" onclick="guestLogin()" class="btn btn-secondary login txt-h2">Guest Log in</button>
                </div>
            </form>
        </main>
        <span class="msgBox">
            <p id="success" class="msg">Registration successful</p>
        </span>
    `;
}

/**
 * Returns the HTML-Template for the 'Sign up' section
 * @returns HTML-Sign up
 */
function signUpHTML() {
    return /*html*/ `
        <img class="logo" src="./assets/img/logo_blue.svg">
        <main class="d-flex-col relative">
            <img class="back" onclick="backToLogin()" src="./assets/icons/arrow_blue.svg">
            <h1 class="txt-h1">Sign up</h1>
            <div class="line"></div>
            <form onsubmit="register(); return false;" class="d-flex-col gap-40">
                <input pattern="^[^,]+, *[^ ,]+$" id="username" class="text-input user-icon" 
                    placeholder="Last name, First name" type="text"
                    title="Please enter your last and first name separated by a comma" required>
                <input id="email" class="text-input mail-icon" placeholder="Email" type="email" oninput="checkRegistration()" required>
                <input pattern=".{8,}" id="password" class="text-input lock-icon" placeholder="Password" 
                    type="password" title="Please enter a password with 8 or more characters" required>
                <button id="registerButton" class="btn btn-primary login txt-h2">Sign up</button>
            </form>
        </main>
        <span class="msgBox">
            <p id="fault" class="msg">Email already exists</p>
        </span>
    `;
}

/**
 * Returns the HTML-Template for the 'Forgot password' section
 * @returns HTML-Forgot password
 */
function forgotPasswordHTML() {
    return /*html*/ `
        <img class="logo" src="./assets/img/logo_blue.svg">
        <main class="d-flex-col relative">
            <img class="back" onclick="backToLogin()" src="./assets/icons/arrow_blue.svg">
            <h1 class="txt-h1">I forgot my password</h1>
            <div class="line"></div>
            <p class="text">Don't worry! We will send you an email with the instructions to<br>reset your password.</p>
            <form method="post" class="d-flex-col gap-40">
                <input required id="email" name="mail" class="text-input mail-icon" placeholder="Email" type="email" oninput="deleteMessageBox()" onblur="checkMail()">
                <button id="resetButton" class="btn btn-primary login txt-h2">Send me the email</button>
            </form>
        </main>

        <div class="msgBox">
            <p id="fault" class="msg">Email doesn't exists</p>
        </div>
    `;
}