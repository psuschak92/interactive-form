// focus name field by default
const userName = document.getElementById('name');
const nameEmptyErr = document.getElementById('name-hint');
userName.focus();
// add real-time validation to name field
userName.addEventListener('keyup', () => { requiredFieldHelper(userName, nameEmptyErr); });
userName.addEventListener('blur', () => { requiredFieldHelper(userName, nameEmptyErr); });

const userEmail = document.getElementById('email');
// display real-time message if the field is left empty
const emailFormatErr = document.getElementById('email-hint');
const emailBlankErr = document.createElement('span');
emailBlankErr.textContent = 'Email address cannot be empty';
emailBlankErr.classList.add('email-hint');
emailBlankErr.classList.add('hint');
// error message must be added to the parent label 
userEmail.parentElement.appendChild(emailBlankErr);
// add real-time validation to the email field
userEmail.addEventListener('keyup', (event) => {
    // this line prevents a message from being displayed right away if field is tabbed into
    if (event.code !== 'Tab'){
        requiredFieldHelper(userEmail, emailBlankErr, emailFormatErr, /^\S+@\S+\.\S+$/);
    }
});
userEmail.addEventListener('blur', () => { requiredFieldHelper(userEmail, emailBlankErr, emailFormatErr, /^\S+@\S+\.\S+$/); });

// hide other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

const cardNum = document.getElementById('cc-num');
const cardFormatErr = document.getElementById('cc-hint');
const cardBlankErr = document.createElement('span');
cardBlankErr.textContent = 'Credit card number cannot be empty';
cardBlankErr.classList.add('cc-hint');
cardBlankErr.classList.add('hint');
// add error message to the parent label 
cardNum.parentElement.appendChild(cardBlankErr);
// add real-time validation to the card input fields
cardNum.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        requiredFieldHelper(cardNum, cardBlankErr, cardFormatErr, /^\d{13,16}$/);
    }
});
cardNum.addEventListener('blur', () => { requiredFieldHelper(cardNum, cardBlankErr, cardFormatErr, /^\d{13,16}$/); });

const zipCode = document.getElementById('zip');
const zipFormatErr = document.getElementById('zip-hint');
const zipBlankErr = document.createElement('span');
zipBlankErr.textContent = 'Zip Code cannot be empty';
zipBlankErr.classList.add('zip-hint');
zipBlankErr.classList.add('hint');
// add error message to the parent label 
zipCode.parentElement.appendChild(zipBlankErr);
zipCode.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        requiredFieldHelper(zipCode, zipBlankErr, zipFormatErr, /^\d{5}$/);
    }
});       
zipCode.addEventListener('blur', () => { requiredFieldHelper(zipCode, zipBlankErr, zipFormatErr, /^\d{5}$/); });

const cvv = document.getElementById('cvv');
const cvvFormatErr = document.getElementById('cvv-hint');
const cvvEmptyErr = document.createElement('span');
cvvEmptyErr.textContent = 'Zip Code cannot be empty';
cvvEmptyErr.classList.add('zip-hint');
cvvEmptyErr.classList.add('hint');
// add error message to the parent label 
cvv.parentElement.appendChild(cvvEmptyErr);
cvv.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        requiredFieldHelper(cvv, cvvEmptyErr, cvvFormatErr, /^\d{3}$/);
    }
});
cvv.addEventListener('blur', () => { requiredFieldHelper(cvv, cvvEmptyErr, cvvFormatErr, /^\d{3}$/); });

// initialize cc dropdown elements
const paymentMethodBox = document.getElementById('payment-method');
const expDate = document.getElementById('exp-month');
const expDateErr = document.createElement('span');
expDateErr.textContent = 'Please select a date from the dropdown';
expDateErr.classList.add('hint');
expDate.parentElement.appendChild(expDateErr);
expDate.addEventListener('change', () => { expirationFieldHelper(expDate, expDateErr, 'Select Date'); });
expDate.addEventListener('blur', () => { expirationFieldHelper(expDate, expDateErr, 'Select Date'); });

const expYear = document.getElementById('exp-year');
const expYearErr = document.createElement('span');
expYearErr.textContent = 'Please select a year from the dropdown';
expYearErr.classList.add('hint');
expYear.parentElement.appendChild(expYearErr);
expYear.addEventListener('change', () => { expirationFieldHelper(expYear, expYearErr, 'Select Year'); });
expYear.addEventListener('blur', () => { expirationFieldHelper(expYear, expYearErr, 'Select Year'); });

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => { showPaymentOption(paymentMethod, paymentMethod.value); });
        
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
        checkboxEventHelper(checkboxes);
    } else {
        checkboxEventHelper(checkboxes);
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
        // reset the error messages if a alternate payment method is selected
        if (optionVal !== 'credit-card') {
            cardNum.parentElement.classList.remove('not-valid');
            cardFormatErr.style.removeProperty('display');
            cardBlankErr.style.removeProperty('display');

            zipCode.parentElement.classList.remove('not-valid');
            zipFormatErr.style.removeProperty('display');
            zipBlankErr.style.removeProperty('display');

            cvv.parentElement.classList.remove('not-valid');
            cvvFormatErr.style.removeProperty('display');
            cvvEmptyErr.style.removeProperty('display');

            expDate.parentElement.classList.remove('not-valid');
            expDateErr.style.removeProperty('display');

            expYear.parentElement.classList.remove('not-valid');
            expYearErr.style.removeProperty('display');

            paymentMethodBox.style.removeProperty('padding-bottom');
        } 
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    if (!requiredFieldHelper(userName, nameEmptyErr)) { event.preventDefault(); }

    if (!requiredFieldHelper(userEmail, emailBlankErr, emailFormatErr, /^\S+@\S+\.\S+$/)) { event.preventDefault(); }
    
    if (!checkboxEventHelper(activities.getElementsByTagName('input'))) { event.preventDefault(); }

    if (paymentMethod.value === 'credit-card') {
        
        if (!expirationFieldHelper(expDate, expDateErr, 'Select Date')) { event.preventDefault(); }

        if (!expirationFieldHelper(expYear, expYearErr, 'Select Year')) { event.preventDefault(); }
        
        if (!requiredFieldHelper(cardNum, cardBlankErr, cardFormatErr, /^\d{13,16}$/)) { event.preventDefault(); }
        
        if (!requiredFieldHelper(zipCode, zipBlankErr, zipFormatErr, /^\d{5}$/)) { event.preventDefault(); }
        
        if (!requiredFieldHelper(cvv, cvvEmptyErr, cvvFormatErr, /^\d{3}$/)) { event.preventDefault(); }
    }
});

function checkboxEventHelper(checkboxes) {
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

function expirationFieldHelper(date, dateFieldErr, optionVal) {
    if(date.value === optionVal) {
        date.parentElement.classList.add('not-valid');
        date.parentElement.classList.remove('valid');
        paymentMethodBox.style.paddingBottom = '20px';
        dateFieldErr.style.display = 'inline';
        return false;
    } else {
        date.parentElement.classList.add('valid');
        date.parentElement.classList.remove('not-valid');
        dateFieldErr.style.removeProperty('display');
        if (!expYearErr.style.display && !expDateErr.style.display) {
            paymentMethodBox.style.removeProperty('padding-bottom');
        } 
        return true;
    }
}
// validates the required fields
function requiredFieldHelper(requiredField, blankErr, formatErr = null, regex = null) {
    // display correct message based on error being thrown
    if (!requiredField.value) {
        requiredField.parentElement.classList.add('not-valid');
        requiredField.parentElement.classList.remove('valid');
        blankErr.style.display = 'inline';
        if (formatErr !== null) {
            formatErr.style.removeProperty('display');
        }
        return false;
    } else if (!regexTest(regex, requiredField.value)) {
        requiredField.parentElement.classList.add('not-valid');
        requiredField.parentElement.classList.remove('valid');
        formatErr.style.display = 'inline';
        blankErr.style.removeProperty('display');
        return false;
    } else {
        requiredField.parentElement.classList.add('valid');
        requiredField.parentElement.classList.remove('not-valid');
        if (formatErr !== null) {
            formatErr.style.removeProperty('display');
        }
        blankErr.style.removeProperty('display');
        return true;
    }
}
// test the required input elements using regex 
function regexTest(regex, val) {
    if (regex === null) {
        return true;
    } else {
        return regex.test(val);
    }
}

