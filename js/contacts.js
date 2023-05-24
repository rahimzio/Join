'use strict';


let contacts = [];


/**
 * Initial function that gets executed after the document is loaded.
 */
async function init() {
    await downloadFromServer();
    contacts = await loadItem('contacts');
    buttonEventListener();
    renderContactList();
}


/**
 * Adds click event listeners to all listed elements
 */
function buttonEventListener() {
    const modal = document.getElementById('modal');
    const newContactBtn = document.getElementById('new-contact');
    const closeModalBtn = document.getElementById('close-modal');

    newContactBtn?.addEventListener('click', () => addContactEventListener());
    closeModalBtn?.addEventListener('click', () => modal?.close());
}


/**
 * Event listener to set the correct data for the modal when creating a new contact.
 */
function addContactEventListener() {
    const modalHeader = document.getElementById('modal-header');
    const modalSubmitBtn = document.getElementById('modal-submit');

    modalHeader.innerHTML = 'Add Contact';
    modalSubmitBtn.innerHTML = 'Create Contact';
    modalSubmitBtn.innerHTML += '<img src="./assets/icons/check_white.svg" class="btn-icon">';
    modalSubmitBtn.onclick = addContact;
    clearInputFields();
    modal?.showModal();
}


/**
 * Adds a contact to the contact list with the data from the modal input fields. 
 */
function addContact() {
    const firstnameInp = document.getElementById('new-firstname');
    const lastnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');

    if (firstnameInp.checkValidity() && lastnameInp.checkValidity() && emailInp.checkValidity() && phoneInp.checkValidity()) {
        const { id } = createContact(firstnameInp, lastnameInp, emailInp, phoneInp);
        storeContact(id);
    }
}


/**
 * Creates a contact from the given data.
 * @param {HTMLElement} firstnameInp Contact firstname.
 * @param {HTMLElement} lastnameInp Contact lastnam.
 * @param {HTMLElement} emailInp Contact email.
 * @param {HTMLElement} phoneInp contact phone.
 */
function createContact(firstnameInp, lastnameInp, emailInp, phoneInp) {
    const id = Date.now().toString(36);
    const color = Math.floor(Math.random() * 355);

    const contact = {
        id: id,
        firstname: firstnameInp?.value.trim(),
        lastname: lastnameInp?.value.trim(),
        email: emailInp?.value.trim(),
        phone: phoneInp?.value.trim(),
        color: color
    }

    contacts.push(contact);
    return contact;
}


/**
 * Event listener to set the correct data for the modal when editing an existing contact.
 */
function editContactEventListener(id) {
    const modal = document.getElementById('modal');
    const modalSubmitBtn = document.getElementById('modal-submit');
    const modalHeader = document.getElementById('modal-header');
    const contact = contacts.find(contact => contact.id === id);

    modalHeader.innerHTML = 'Edit Contact';
    modalSubmitBtn.innerHTML = 'Save Contact';
    modalSubmitBtn.innerHTML += '<img src="./assets/icons/check_white.svg" class="btn-icon">';
    modalSubmitBtn.onclick = () => editContact(id);
    prefillInputFields(contact);
    modal?.showModal();
}


/**
 * Updates the contact from the contact list with the given data from the modal input fields. 
 * @param {string} id Unique id of the contact.
 */
function editContact(id) {
    const firstnameInp = document.getElementById('new-firstname');
    const lastnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');
    const contact = contacts.find(contact => contact.id === id);

    if (firstnameInp.checkValidity() && lastnameInp.checkValidity() && emailInp.checkValidity() && phoneInp.checkValidity()) {
        contact.firstname = firstnameInp.value;
        contact.lastname = lastnameInp.value;
        contact.email = emailInp.value;
        contact.phone = phoneInp.value;

        storeContact(id, 'Succesfully saved!');
    }
}


/**
 * Deletes the contact from the contact list. 
 * @param {String} id Unique id of the contact
 */
function deleteContact(id) {
    const contactDetailsEl = document.getElementById('contact-details-body');
    const contact = contacts.find(contact => contact.id === id);
    const index = contacts.indexOf(contact);

    contacts.splice(index, 1);
    contactDetailsEl.classList.add('d-none');
    storeItem('contacts', contacts);
    renderContactList();
    notify('Succesfully deleted!');
    if (window.matchMedia("(max-width: 576px)")) {
        const contactDetails = document.getElementById('contact-details');

        contactDetails.style.display = 'none';
    }
}


/**
 * Stores the sorted contact list and renders the updated contacts.
 * @param {string} id Id of the contact.
 * @param {string} text Notification text.
 */
function storeContact(id, text = null) {
    sortContacts();
    storeItem('contacts', contacts);
    renderContactList();
    showContactDetails(id);
    text ? notify(text) : notify();;
}


/**
 * Shows the details of the contact.
 * @param {string} id Unique id of the contact.
 */
function showContactDetails(id) {
    const contactDetailsEl = document.getElementById('contact-details-body');
    const bubbleEl = document.getElementById('contact-details-bubble');
    const initialsEl = document.getElementById('contact-details-initials');
    const nameEl = document.getElementById('contact-details-name');
    const emailEl = document.getElementById('contact-details-email');
    const phoneEl = document.getElementById('contact-details-phone');
    const editBtn = document.getElementById('edit-contact');
    const deleteBtn = document.getElementById('delete-contact');
    const contact = contacts.find(contact => contact.id === id);

    contactDetailsEl.style.display = 'flex';
    bubbleEl.style = `background: hsl(${contact.color}, 100%, 30%)`;
    initialsEl.innerHTML = `${contact.firstname.charAt(0).toUpperCase()}${contact.lastname.charAt(0).toUpperCase()}`
    nameEl.innerHTML = `${contact.firstname} ${contact.lastname}`;
    emailEl.innerHTML = contact.email;
    emailEl.href = `mailto:${contact.email}`;
    phoneEl.innerHTML = contact.phone;
    phoneEl.href = `tel:${contact.phone}`;
    editBtn.onclick = () => editContactEventListener(id);
    deleteBtn.onclick = () => deleteContact(id);
    if (window.matchMedia("(max-width: 576px)")) {
        hideDetailsOnMobileButton();
    }
}


/**
 * Shows the hide details button on mobile view.
 */
function hideDetailsOnMobileButton() {
    const contactDetails = document.getElementById('contact-details');
    const hideDetailsBtn = document.getElementById('hide-details');

    contactDetails.style.display = 'block';
    hideDetailsBtn.addEventListener('click', () => {
        contactDetails.style.display = 'none';
    })
}


/**
 * Clears the input fields of the modal.
 */
function clearInputFields() {
    const firstnameInp = document.getElementById('new-firstname');
    const lastnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');

    firstnameInp.value = '';
    lastnameInp.value = '';
    emailInp.value = '';
    phoneInp.value = '';
}


/**
 * Prefills the input fields of the modal if the contact gets edited.
 * @param {object} contact Object of the contact.
 */
function prefillInputFields(contact) {
    const firstnameInp = document.getElementById('new-firstname');
    const lastnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');

    firstnameInp.value = contact.firstname;
    lastnameInp.value = contact.lastname;
    emailInp.value = contact.email;
    phoneInp.value = contact.phone;
}


/**
 * Sorts the contact list by lastname.
 */
function sortContacts() {
    contacts = contacts.sort((contactA, contactB) => {
        return contactA.lastname.toLowerCase().localeCompare(contactB.lastname.toLowerCase()) ||
            contactA.firstname.toLowerCase().localeCompare(contactB.firstname.toLowerCase())
    });
}


/**
 * Renders the complete contact list including contact seperators.
 */
function renderContactList() {
    const contactListEl = document.getElementById('contact-list')
    let contactList = '';
    let char = '';

    for (let contact of contacts) {
        const lastnameChar = contact.lastname.toUpperCase().charAt(0);
        const initials = `${contact.firstname.charAt(0).toUpperCase()}${contact.lastname.charAt(0).toUpperCase()}`;

        if (lastnameChar != char) {
            char = lastnameChar;
            contactList += contactSeparatorTemp(lastnameChar);
        }
        contactList += contactTemp(contact, initials);
    }
    contactListEl.innerHTML = contactList;
}


init();