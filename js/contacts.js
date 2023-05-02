let names = [];
let mails = [];
let numbers = [];
let detailNames = [];
let detailMails =[];
let detailNumbers = [];
let alphabetics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];




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
        <div onclick="addToDetails()" class="contact-box-name-mail">
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


function showContactDetails() {
    let contactlist = document.getElementById('contactInformation');

    for (let i = 0; i < detailNames.length; c++) {
        const detailName = detailNames[c];
        const detailMail =  detailMails[c];
        const detailNumber = detailNumbers[c];
        contactlist.innerHTML += `
            <div>
              <b class="name-height">${detailName}</b>
              <span>${detailMail}</span>
              <span>${detailNumber}</span>
            </div>
         `;
    }  
}

function addToDetails() {
    let name = names[i];
    let mail = mails[i];
    let number = numbers[i];
    detailNames.push(name);
    detailMails.push(mail);
    detailNumbers.üush(number);

    showContactDetails();
    renderContact();
}
