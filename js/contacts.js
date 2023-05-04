
let contacts = [{name: 'Marco', surname: 'Loch', email: 'marco@loch.de', color: 'hsl(123, 100%, 30%)', id: 01112121}];


/**
 * Initial function that gets executed after the document is loaded
 */

async function init() {
    debugger;
    const contacts = getItem(contacts);
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
 * Event listener to set the correct data for the modal when creating a new contact
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
 * Adds a contact to the contact list with the data from the input fields
 */
function addContact() {
    const firstnameInp = document.getElementById('new-firstname');
    const lasttnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');

    const { id } = createContact(firstnameInp, lasttnameInp, emailInp, phoneInp);
    storeContact(id, 'Succesfully Created');
}

/**
 * Creates a contact from the given data
 * @param {HTMLElement} firstnameInp Contact firstname.
 * @param {HTMLElement} lasttnameInp Contact lastname.
 * @param {HTMLElement} emailInp Contact email.
 * @param {HTMLElement} phoneInp Contact phone.
 */
function createContact(firstnameInp, lasttnameInp, emailInp, phoneInp) {
    const id = Date.now().toString(36);
    const color = Math.floor(Math.random() * 355);

    const contact = {
        id: id,
        name: firstnameInp?.value.trim(),
        surname: lasttnameInp?.value.trim(),
        email: emailInp?.value.trim(),
        phone: phoneInp?.value.trim(),
        color: color
    }

    contacts.push(contact);
    return contact;
}

/**
 * Event listener to set the correct data for the modal when editing an existing contact
 * @param {string} id Unique ID of the contact 
 */
function editContactEventListener(id) {
    const modal = document.getElementById('modal');
    const modalSubmitBtn = document.getElementById('modal-submit');
    const modalHeader = document.getElementById('modal-header');
    const contact = contact.find(contact => contact.id === id);

    modalHeader.innerHTML = 'Edit Contact';
    modalSubmitBtn.innerHTML = 'Save Contact';
    modalSubmitBtn.innerHTML += '<img src="./assets/icons/check_white.svg" class="btn-icon">';
    modalSubmitBtn.onclick = () => editContact(id);
    prefillInputFields(contact);
    modal?.showModal();
}

/**
 * Updates the contact from the list with the given modal input fields
 * @param {string} id Unique ID of the contact 
 */
function editContact(id) {
    const firstnameInp = document.getElementById('new-firstname');
    const lasttnameInp = document.getElementById('new-lastname');
    const emailInp = document.getElementById('new-email');
    const phoneInp = document.getElementById('new-phone');
    const contact = contact.find(contact => contact.id === id);

    contact.name = firstnameInp.value;
    contact.surname = lasttnameInp.value;
    contact.email = emailInp.value;
    contact.phone = phoneInp.value;

    storeContact(id, 'Successfully Saved');
}


/**
 * Deletes the contact from the contact list
 * @param {string} id Unique ID of the contact 
 */
function deleteContact(id) {
    const contactDetailsEl = document.getElementById('contact-details-body');
    const contact = contact.find(contact => contact.id === id);
    const index = contacts.indexOf(contact);

    contacts.splice(index, 1);
    contactDetailsEl.classList.add('d-none');
    setItem('contacts', contacts);
    renderContactList();
    notify('Succesfully deleted!');

    if(window.matchMedia('(max-width: 576px)')) {
        const contactDetails = document.getElementById('contact-details');

        contactDetails.style.display = 'none';
    }
}


/**
 * Stores the sorted contact list and renders the updated contacts and saves contact details 
 * @param {string} id Unique ID of the contact
 * @param {*} text Notification text
 */
function storeContact(id, text = null) {
    sortContacts();
    setItem('contacts', contacts);
    renderContactList();
    showContactDetails(id);
    text ? notify(text) : notify();;
}

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
    bubbleEl.style = `background: hsl(${contact.color}, 100%, 33%)`;
    initialsEl.innerHTML = `${contact.name.charAt(0).toUpperCase()}${contact.surname.charAt(0).toUpperCase()}`;
    nameEl.innerHTML = `${contact.name} ${contact.surname}`;
    emailEl.innerHTML = contact.email;
    emailEl.href = `mailto:${contact.email}`;
    phoneEl.innerHTML = contact.phone;
    phoneEl.href = `tel:${contact.phone}`;
    editBtn.onclick = () => editContactEventListener(id);
    deleteBtn.onclick = () => deleteContact(id);

    if(window.matchMedia('(max-width: 576px)')) {
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

    firstnameInp.value = contact.name;
    lastnameInp.value = contact.surname;
    emailInp.value = contact.email;
    phoneInp.value = contact.phone;
}


/**
 * Sorts the contact list by lastname.
 */
function sortContacts() {
    contacts = contacts.sort((contactA, contactB) => {
        return contactA.surname.toLowerCase().localeCompare(contactB.surname.toLowerCase()) ||
            contactA.name.toLowerCase().localeCompare(contactB.name.toLowerCase())
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
        const lastnameChar = contact.surname.toUpperCase().charAt(0);
        const initials = `${contact.name.charAt(0).toUpperCase()}${contact.surname.charAt(0).toUpperCase()}`;

        if (lastnameChar != char) {
            char = lastnameChar;
            contactList += contactSeparatorTemp(lastnameChar);
        }
        contactList += contactTemp(contact, initials);
    }
    contactListEl.innerHTML = contactList;
}


init();





// let names = [];
// let mails = [];
// let numbers = [];
// let detailNames = [];
// let detailMails =[];
// let detailNumbers = [];
// let alphabetics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];




// function showContactBox() {
//     document.getElementById('newContactBoxBckgr').style.display = 'block';
//     document.getElementById('newContactBoxBckgr').style.display = 'flex';
// }


// function showEditBox() {
//     document.getElementById('editContactBoxBckgr').style.display = 'block';
//     document.getElementById('editContactBoxBckgr').style.display = 'flex';
// }

// function closeContactBox() {
//     document.getElementById('newContactBoxBckgr').style.display = 'none';
// }


// function renderContact() {
//     let contactlist = document.getElementById('contactlist');
//     contactlist.innerHTML = ``;

//     for (let i = 0; i < names.length; i++) {
//         const name = names[i];
//         const mail = mails[i];
//         const number = numbers[i];
//         contactlist.innerHTML += `
//         <div onclick="addToDetails()" class="contact-box-name-mail">
//           <b class="name-height">${name}</b>
//           <span>${mail}</span>
//         </div>
        
//         `;
//     }
// }


// function addContact() {
//     let name = document.getElementById('input1');
//     let mail = document.getElementById('input2');
//     let number = document.getElementById('input3');
//     names.push(name.value);
//     mails.push(mail.value);
//     numbers.push(number.value);
//     document.getElementById('newContactBoxBckgr').innerHTML = ``;

//     renderContact();
    
// }


// function deleteContact() {
//     names.splice(i, 1);
//     mails.splice(i, 1);
//     numbers.splice(i, 1);
//     document.getElementById('editContactBoxBckgr').innerHTML = ``;
// }


// function showContactDetails() {
//     let contactlist = document.getElementById('contactInformation');

//     for (let i = 0; i < detailNames.length; c++) {
//         const detailName = detailNames[c];
//         const detailMail =  detailMails[c];
//         const detailNumber = detailNumbers[c];
//         contactlist.innerHTML += `
//             <div>
//               <b class="name-height">${detailName}</b>
//               <span>${detailMail}</span>
//               <span>${detailNumber}</span>
//             </div>
//          `;
//     }  
// }

// function addToDetails() {
//     let name = names[i];
//     let mail = mails[i];
//     let number = numbers[i];
//     detailNames.push(name);
//     detailMails.push(mail);
//     detailNumbers.üush(number);

//     showContactDetails();
//     renderContact();
// }
