// focus name field by default
const userName = document.getElementById('name');
const nameEmptyErr = document.getElementById('name-hint');
userName.focus();
// adds real-time validation to name field
userName.addEventListener('keyup', () => { nameFieldHelper(userName); });
userName.addEventListener('blur', () => { nameFieldHelper(userName); });

const userEmail = document.getElementById('email');
// display real-time message if the field is left empty
const emailEmptyErr = document.createElement('span');
emailEmptyErr.textContent = 'Email address cannot be empty';
emailEmptyErr.classList.add('email-hint');
emailEmptyErr.classList.add('hint');
// error message must be added to the parent label 
userEmail.parentElement.appendChild(emailEmptyErr);
// adds real-time validation to the email field
userEmail.addEventListener('keyup', (event) => {
    // this line prevents a message from being displayed right away if field is tabbed into
    if (event.code !== 'Tab'){
        emailFieldHelper(userEmail);
    }
});
userEmail.addEventListener('blur', () => { emailFieldHelper(userEmail); });

// hide other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => showPaymentOption(paymentMethod, paymentMethod.value));

const cardNum = document.getElementById('cc-num');

const cardEmptyErr = document.createElement('span');
cardEmptyErr.textContent = 'Credit card number cannot be empty';
cardEmptyErr.classList.add('cc-hint');
cardEmptyErr.classList.add('hint');
// add error message to the parent label 
cardNum.parentElement.appendChild(cardEmptyErr);
// adds real-time validation to the card input fields
cardNum.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        cardNumberFieldHelper(cardNum);
    }
});
cardNum.addEventListener('blur', () => { cardNumberFieldHelper(cardNum); });

const zipCode = document.getElementById('zip');
const zipEmptyErr = document.createElement('span');
zipEmptyErr.textContent = 'Zip Code cannot be empty';
zipEmptyErr.classList.add('zip-hint');
zipEmptyErr.classList.add('hint');
// add error message to the parent label 
zipCode.parentElement.appendChild(zipEmptyErr);
zipCode.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        zipCodeFieldHelper(zipCode);
    }
});       
zipCode.addEventListener('blur', () => { zipCodeFieldHelper(zipCode); });

const cvv = document.getElementById('cvv');
const cvvEmptyErr = document.createElement('span');
cvvEmptyErr.textContent = 'Zip Code cannot be empty';
cvvEmptyErr.classList.add('zip-hint');
cvvEmptyErr.classList.add('hint');
// add error message to the parent label 
cvv.parentElement.appendChild(cvvEmptyErr);
cvv.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        cvvFieldHelper(cvv);
    }
});
cvv.addEventListener('blur', () => { cvvFieldHelper(cvv); });

// initialize cc dropdown elements
const paymentMethodBox = document.getElementById('payment-method');
const expDate = document.getElementById('exp-month');
const expDateErr = document.createElement('span');
expDateErr.textContent = 'Please select a date from the dropdown';
expDateErr.classList.add('hint');
expDate.parentElement.appendChild(expDateErr);
expDate.addEventListener('blur', () => { expDateFieldHelper(expDate); });

const expYear = document.getElementById('exp-year');
const expYearErr = document.createElement('span');
expYearErr.textContent = 'Please select a year from the dropdown';
expYearErr.classList.add('hint');
expYear.parentElement.appendChild(expYearErr);
expYear.addEventListener('blur', () => { expYearFieldHelper(expYear); });
        
// display hidden field if title is other
const title = document.getElementById('title');
title.addEventListener('change', () => {
    if (title.value === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    } 
});

const color = document.getElementById('color');
color.disabled = true;

const shirtDesigns = document.getElementById('design');
shirtDesigns.addEventListener('change', () => {
    color.disabled = false;
    if (shirtDesigns.value === 'js puns') {
        hideColors(shirtDesigns.value);
    } else if (shirtDesigns.value === 'heart js') {
        hideColors(shirtDesigns.value);
    }
});

function hideColors(theme) {
    for(let i = 0; i < color.options.length; i++) {
        const option = color.options[i];
        if (option.dataset.theme !== theme){
            option.hidden = true;
        } else {
            option.hidden = false;
        } 
    }
}

const activities = document.getElementById('activities');
activities.addEventListener('change', () => {
    const checkboxes = activities.getElementsByTagName('input');
    const activitiesCost = document.getElementById('activities-cost');
    let costCount = 0;
    let totalCost = '';
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            costCount += parseInt(checkbox.dataset.cost);
            totalCost = activitiesCost.textContent.replace(/\d+/, `${costCount}`);
            activitiesCost.textContent = totalCost;
            isScheduleConflict(checkbox, checkboxes, true);
        } else {
            isScheduleConflict(checkbox, checkboxes, false);
        }
    }
    // set cost count to zero if all the activities remain unchecked 
    if(!costCount) {
        totalCost = activitiesCost.textContent.replace(/\d+/, `${costCount}`);
        activitiesCost.textContent = totalCost;
        // throw an error if checkbox left unchecked
        checkboxEventsHelper(checkboxes);
    } else {
        checkboxEventsHelper(checkboxes);
    }
});

function isScheduleConflict(checkbox, checkboxes, disable) {
    for (let j = 1; j < checkboxes.length; j++) {
        if (checkboxes[j].dataset.dayAndTime === checkbox.dataset.dayAndTime && checkboxes[j].name !== checkbox.name) {
            checkboxes[j].disabled = disable;
            disable ? checkboxes[j].parentElement.classList.add('disabled') : checkboxes[j].parentElement.classList.remove('disabled');
        }
    }
}

const checkboxes = activities.getElementsByTagName('input');
// add a focus and blur listener to all checkboxes
for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.classList.add('focus');
    });
    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.classList.remove('focus');
    });
}

// shows the specified option passed as the second parameter, and hides all other payment options 
function showPaymentOption(optionList, optionVal = 'credit-card') {
    const option = document.getElementById(optionVal);
    option.hidden = false;
    // hide unselected payment options
    for (let i = 1; i < optionList.length; i++) {
        if (optionVal !== optionList[i].value) {
            const hideOption = document.getElementById(optionList[i].value);
            hideOption.hidden = true;
        }
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    if (!nameFieldHelper(userName)) { event.preventDefault(); }

    if (!emailFieldHelper(userEmail)) { event.preventDefault(); }
    
    if (!checkboxEventsHelper(activities.getElementsByTagName('input'))) { event.preventDefault(); }

    if (paymentMethod.value === 'credit-card') {
        
        if (!expDateFieldHelper(expDate)) { event.preventDefault(); }

        if (!expYearFieldHelper(expYear)) { event.preventDefault(); }
        
        if (!cardNumberFieldHelper(cardNum)) { event.preventDefault(); }
        
        if (!zipCodeFieldHelper(zipCode)) { event.preventDefault(); }
        
        if (!cvvFieldHelper(cvv)) { event.preventDefault(); }
    }
});

function nameFieldHelper(name) {
    if (!name.value) {
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        nameEmptyErr.style.display = 'inline';
        return false;
    } else {
        name.parentElement.classList.add('valid');
        name.parentElement.classList.remove('not-valid');
        nameEmptyErr.style.removeProperty('display');
        return true;
    }
}

function emailFieldHelper(email) {
    const emailFormatError = document.getElementById('email-hint');
    // display correct message based on error being thrown
    if (!email.value) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');        
        emailEmptyErr.style.display = 'inline';
        emailFormatError.style.removeProperty('display');
        return false;
    } else if (!testEmail(email.value)){
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        emailFormatError.style.display = 'inline';
        emailEmptyErr.style.removeProperty('display');
        return false;
    } else {
        email.parentElement.classList.add('valid');
        email.parentElement.classList.remove('not-valid'); 
        emailFormatError.style.removeProperty('display');
        emailEmptyErr.style.removeProperty('display');
        return true;
    }
}

function checkboxEventsHelper(checkboxes) {
    const activitiesHint = document.getElementById('activities-hint');
    let isSelected = false;
    for (let i = 0; i < checkboxes.length; i++) {
        // at least one box must be checked
        if (checkboxes[i].checked) {
            isSelected = true;
            break;
        }
    }
    if (!isSelected) {
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activitiesHint.style.display = 'inline';
        return false;
    } else {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activitiesHint.style.removeProperty('display');
        return true;
    }
}

function expDateFieldHelper(expDate) {
    if(expDate.value === 'Select Date') {
        expDate.parentElement.classList.add('not-valid');
        expDate.parentElement.classList.remove('valid');
        paymentMethodBox.style.paddingBottom = '20px';
        expDateErr.style.display = 'inline';
        return false;
    } else {
        expDate.parentElement.classList.add('valid');
        expDate.parentElement.classList.remove('not-valid');
        paymentMethodBox.style.removeProperty('padding-bottom');
        expDateErr.style.removeProperty('display');
        return true;
    }
}

function expYearFieldHelper(expYear) {
    if(expYear.value === 'Select Year') {
        expYear.parentElement.classList.add('not-valid');
        expYear.parentElement.classList.remove('valid');
        paymentMethodBox.style.paddingBottom = '20px';
        expYearErr.style.display = 'inline';
        return false;
    } else {
        expYear.parentElement.classList.add('valid');
        expYear.parentElement.classList.remove('not-valid');
        paymentMethodBox.style.removeProperty('padding-bottom');
        expYearErr.style.removeProperty('display');
        return true;
    }
}



function cardNumberFieldHelper(card) {
    const cardFormatError = document.getElementById('cc-hint');
    // display correct message based on error being thrown
    if (!card.value) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardEmptyErr.style.display = 'inline';
        cardFormatError.style.removeProperty('display');
        return false;
    } else if (!testCardNum(card.value)) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardFormatError.style.display = 'inline';
        cardEmptyErr.style.removeProperty('display');
        return false;
    } else {
        card.parentElement.classList.add('valid');
        card.parentElement.classList.remove('not-valid');
        cardFormatError.style.removeProperty('display');
        cardEmptyErr.style.removeProperty('display');
        return true;
    }
}

function zipCodeFieldHelper(zip) {
    const zipFormatErr = document.getElementById('zip-hint');
    // display correct message based on error being thrown
    if (!zip.value) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipEmptyErr.style.display = 'inline';
        zipFormatErr.style.removeProperty('display');
        return false;
    } else if (!testZipCode(zip.value)) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipFormatErr.style.display = 'inline';
        zipEmptyErr.style.removeProperty('display');
        return false;
    } else {
        zip.parentElement.classList.add('valid');
        zip.parentElement.classList.remove('not-valid');
        zipFormatErr.style.removeProperty('display');
        zipEmptyErr.style.removeProperty('display');
        return true;
    }
}

function cvvFieldHelper(cvv) {
    const cvvFormatError = document.getElementById('cvv-hint');
    // display correct message based on error being thrown
    if (!cvv.value) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvEmptyErr.style.display = 'inline';
        cvvFormatError.style.removeProperty('display');
        return false;
    } else if (!testCVV(cvv.value)) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvFormatError.style.display = 'inline';
        cvvEmptyErr.style.removeProperty('display');
        return false;
    } else {
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.classList.remove('not-valid');
        cvvFormatError.style.removeProperty('display');
        cvvEmptyErr.style.removeProperty('display');
        return true;
    }
}

// test the required input elements using regex 
function testEmail(email) {
    const regex = /^\S+@\S+\.\w+$/;
    return regex.test(email);
}

function testCardNum(cardNum) {
    const regex = /^\d{13,16}$/;
    return regex.test(cardNum);
}

function testZipCode(zipCode) {
    const regex = /^\d{5}$/;
    return regex.test(zipCode);
}

function testCVV(cvv) {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
}
