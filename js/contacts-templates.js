// -------------------
// Templates
// -------------------

/**
 * Returns the HTML template for the contact card.
 * @param {string} id Unique id of the contact.
 * @returns HTML contact card template.
 */
function contactTemp({ firstname, lastname, email, color, id }, initials) {
    return (`
        <div class="contact" onclick="showContactDetails('${id}')">
            <div class="contact-bubble" style="background: hsl(${color}, 100%, 30%);">
                <p class="contact-initials txt-h7">${initials}</p>
            </div>
            <div>
                <h5 class="contact-full-name txt-h5">${firstname} ${lastname}</h5>
                <p class="contact-email">${email}</p>
            </div>
        </div>
    `);
}


/**
 * Returns the HTML template for the contact separator.
 * @param {string} character Character that will be rendered in the separator
 * @returns HTML separator template
 */
function contactSeparatorTemp(character) {
    return (`
        <div class="contact-separator">
            <h5 class="character">${character}</h5>
            <div class="separator-line"></div>
        </div>
    `);
}