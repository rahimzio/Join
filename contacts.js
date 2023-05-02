let names = [];
let mails = [];
let numbers = [];
let detailName = [];
let detailMails =[];
let detailNumbers = [];
let alphabetics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

async function init() {
    await includeHTML();


}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    renderContact();
    showContactDetails(); 
}


function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
}


function showEditBox() {
    document.getElementById('editContactBoxBckgr').style.display = 'block';
    document.getElementById('editContactBoxBckgr').style.display = 'flex';
}

function closeContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'none';
}


function renderContact() {
    let contactlist = document.getElementById('contactlist');
    contactlist.innerHTML = ``;

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const mail = mails[i];
        const number = numbers[i];
        contactlist.innerHTML += `
        <div onclick="showContactDetails(${i})" class="contact-box-name-mail">
          <b class="name-height">${name}</b>
          <span>${mail}</span>
        </div>
        
        `;
    }
}


function addContact() {
    let name = document.getElementById('input1');
    let mail = document.getElementById('input2');
    let number = document.getElementById('input3');
    names.push(name.value);
    mails.push(mail.value);
    numbers.push(number.value);
    document.getElementById('newContactBoxBckgr').innerHTML = ``;

    renderContact();
    
}


function deleteContact() {
    names.splice(i, 1);
    mails.splice(i, 1);
    numbers.splice(i, 1);
    document.getElementById('editContactBoxBckgr').innerHTML = ``;
}


function showContactDetails(c) {
    let contactlist = document.getElementById('contactInformation');

    for (let i = 0; i < names.length; c++) {
        const name = names[c];
        const mail = mails[c];
        const number = numbers[c];
        contactlist.innerHTML += `
            <div>
              <b class="name-height">${name}</b>
              <span>${mail}</span>
              <span>${number}</span>
            </div>
         `;
    }  
}

