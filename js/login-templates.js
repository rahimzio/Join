function initLogin(action) {
    let login = document.getElementById('login');
    login.innerHTML = action;
    
}

function loginHTML() {
    return /*html*/ `
        <header class="d-flex">
            <img class="logo-animation" src="./assets/img/logo_blue.svg">
            <div class="sign-up-section">
                <p class="sign-up-text">Not a Join user?</p>
                <button onclick="initLogin(signUpHTML())" type="button" class="btn btn-primary sign-up-button">Sign up</button>
            </div>
        </header>

        <main class="d-flex-col animation">
            <h1 class="txt-h1">Log in</h1>
            <div class="line"></div>
            <form onsubmit="login(); return false" class="d-flex-col gap-40">
                <input required class="text-input mail-icon" placeholder="Email" type="email">
                <input required class="text-input lock-icon" placeholder="Password" type="password">
                <div class="d-flex gap-10">
                    <input type="checkbox" class="checkbox">
                    <p>Remember me</p>
                    <a onclick="initLogin(forgotPasswordHTML())" class="link">Forgot my password</a>
                </div>
                <div class="d-flex gap-50">
                    <button class="btn btn-primary login txt-h2">Log in</button>
                    <button type="button" onclick="guestLogin()" class="btn btn-secondary login txt-h2">Guest Log in</button>
                </div>
            </form>
        </main>

        <p id="msgBox"></p>
    `;
}

function signUpHTML() {
    return /*html*/ `
        <img class="logo" src="./assets/img/logo_blue.svg">
        <main class="d-flex-col relative">
            <img class="back" onclick="initLogin(loginHTML())" src="./assets/icons/arrow_blue.svg">
            <h1 class="txt-h1">Sign up</h1>
            <div class="line"></div>
            <form onsubmit="register(); return false;" class="d-flex-col gap-40">
                <input pattern="^[^,]*, [^ ,]+$" id="username" class="text-input user-icon" 
                    placeholder="First name, Last name" type="text"
                    title="Please enter your first and last name separated by a comma" required>
                <input id="email" class="text-input mail-icon" placeholder="Email" type="email" onblur="checkRegistration()" required>
                <input pattern=".{8,}" id="password" class="text-input lock-icon" placeholder="Password" 
                    type="password" title="Please enter a password with 8 or more characters" required>
                <button id="registerButton" class="btn btn-primary login txt-h2" disabled>Sign up</button>
            </form>
        </main>
    `;
}

function forgotPasswordHTML() {
    return /*html*/ `
        <img class="logo" src="./assets/img/logo_blue.svg">
        <main class="d-flex-col relative">
            <img class="back" onclick="initLogin(loginHTML())" src="./assets/icons/arrow_blue.svg">
            <h1 class="txt-h1">I forgot my password</h1>
            <div class="line"></div>
            <p class="text">Don't worry! We will send you an email with the instructions to<br>reset your password.</p>
            <form onsubmit="resetPassword()" class="d-flex-col gap-40">
                <input required class="text-input mail-icon" placeholder="Email" type="email">
                <button class="btn btn-primary login txt-h2">Send me the email</button>
            </form>
        </main>
    `;
}

function resetPasswordHTML() {
    return /*html*/ `
        <img class="logo" src="./assets/img/logo_blue.svg">
        <main class="d-flex-col relative">
            <img class="back" onclick="initLogin(loginHTML())" src="./assets/icons/arrow_blue.svg">
            <h1 class="txt-h1">Reset your password</h1>
            <div class="line"></div>
            <p class="text">Change your account password</p>
            <input class="text-input" placeholder="New password" type="text">
            <input class="text-input" placeholder="Confrim password" type="text">
            <button type="button" class="btn btn-primary login txt-h2">Continue</button>
        </main>
    `;
}