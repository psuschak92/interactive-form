/*

    **GLOBAL VARIABLES**

    * This section includes all the required fields and their listener events
    * The hint fields are updated according to the type of error 
    * 
    
*/
/*

    **NAME FIELDS**
    
*/
const nameField = document.getElementById('name');
const nameHint = document.getElementById('name-hint');
nameField.focus();
nameField.addEventListener('keyup', (event) => { 
    console.log(event.code);
    if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        removeErrorMessage(nameField, nameHint); 
    }
});
nameField.addEventListener('blur', () => { fieldHelper(nameField, nameHint, nameHint.textContent); });
/*

    **EMAIL FIELDS**
    
*/
const emailField = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
// save the original message
const emailFormatErr = emailHint.textContent;
emailField.addEventListener('keyup', (event) => {
    if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        // hide the error as the user types
        removeErrorMessage(emailField, emailHint); 
    }
});
// call the helper function if the field is left blank or formatted incorrectly
emailField.addEventListener('blur', () => { fieldHelper(emailField, emailHint, 'Email address cannot be blank', emailFormatErr, /^\S+@\S+\.\S+$/); });

// hide other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

/*

    **CREDIT CARD FIELDS**
    
*/
const cardNum = document.getElementById('cc-num');
const cardHint = document.getElementById('cc-hint');
const cardFormatErr = cardHint.textContent;
cardNum.addEventListener('keyup', (event) => {
    if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        removeErrorMessage(cardNum, cardHint);
    }
});
cardNum.addEventListener('blur', () => { fieldHelper(cardNum, cardHint, 'Credit card number cannot be blank', cardFormatErr, /^\d{13,16}$/); });

const zipCode = document.getElementById('zip');
const zipCodeHint = document.getElementById('zip-hint');
const zipCodeFormatErr = zipCodeHint.textContent;
zipCode.addEventListener('keyup', (event) => {
    if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        removeErrorMessage(zipCode, zipCodeHint);
    }
});       
zipCode.addEventListener('blur', () => { fieldHelper(zipCode, zipCodeHint, 'Zip Code cannot be blank', zipCodeFormatErr, /^\d{5}$/); });

const cvv = document.getElementById('cvv');
const cvvHint = document.getElementById('cvv-hint');
const cvvFormatErr = cvvHint.textContent;
cvv.addEventListener('keyup', (event) => {
    if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        removeErrorMessage(cvv, cvvHint);
    }
});
cvv.addEventListener('blur', () => { fieldHelper(cvv, cvvHint, 'Card Verification Value cannot be blank', cvvFormatErr, /^\d{3}$/); });

// added id to payment method div in index.html
const paymentMethodBox = document.getElementById('payment-method');
const expDate = document.getElementById('exp-month');
const expDateErr = document.createElement('span');
expDateErr.textContent = 'Please select a date from the dropdown';
expDateErr.classList.add('hint');
expDate.parentElement.appendChild(expDateErr);
expDate.addEventListener('change', () => { removeErrorMessage(expDate, expDateErr); });
expDate.addEventListener('blur', () => { expirationFieldHelper(expDate, expDateErr, 'Select Date'); });

const expYear = document.getElementById('exp-year');
const expYearErr = document.createElement('span');
expYearErr.textContent = 'Please select a year from the dropdown';
expYearErr.classList.add('hint');
expYear.parentElement.appendChild(expYearErr);
expYear.addEventListener('change', () => { removeErrorMessage(expYear, expYearErr); });
expYear.addEventListener('blur', () => { expirationFieldHelper(expYear, expYearErr, 'Select Year'); });

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => { showPaymentOption(paymentMethod, paymentMethod.value); });
/*

    **JOB ROLE FIELD**
    
*/
const title = document.getElementById('title');
title.addEventListener('change', () => {
    if (title.value === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    } 
});
/*

    **T-SHIRT INFO FIELDS**
    
*/
const color = document.getElementById('color');
color.disabled = true;

const shirtTheme = document.getElementById('design');
shirtTheme.addEventListener('change', () => {
    color.disabled = false;
    if (shirtTheme.value === 'js puns') {
        hideColors(shirtTheme.value);
    } else if (shirtTheme.value === 'heart js') {
        hideColors(shirtTheme.value);
    }
});
// hides color options based on selected theme
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
/*

    **REGISTER FOR ACTIVITIES FIELDS**
    
*/
const activities = document.getElementById('activities');
activities.addEventListener('change', () => {
    const checkboxes = activities.getElementsByTagName('input');
    const activitiesCost = document.getElementById('activities-cost');
    // track the sum of event costs 
    let costCount = 0;
    // dynamically update the textContent of 'activitiesCost' 
    let totalCost = '';
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            costCount += parseInt(checkbox.dataset.cost);
            totalCost = activitiesCost.textContent.replace(/\d+/, `${costCount}`);
            activitiesCost.textContent = totalCost;
            // disable the event with an overlapping schedule by passing 'true'
            scheduleConflict(checkbox, checkboxes, true);
        } else {
            // enable the event if checkbox unchecked by passing 'false'
            scheduleConflict(checkbox, checkboxes, false);
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

const checkboxes = activities.getElementsByTagName('input');
// add a focus and blur listener to all checkboxes for accessibility purposes
for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.classList.add('focus');
    });
    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.classList.remove('focus');
    });
}
/*

    **FORM FIELD**
    
*/
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // store validation results in boolean values
    const nameHelper = fieldHelper(nameField, nameHint, nameHint.textContent);
    const emailHelper = fieldHelper(emailField, emailHint, 'Email address cannot be blank', emailFormatErr, /^\S+@\S+\.\S+$/);
    const checkboxHelper = checkboxEventHelper(activities.getElementsByTagName('input'));
    let expDateHelper = true;
    let expYearHelper = true;
    let cardNumHelper = true;
    let zipCodeHelper = true;
    let cvvHelper = true;

    if (paymentMethod.value === 'credit-card') {
        expDateHelper = expirationFieldHelper(expDate, expDateErr, 'Select Date');
        expYearHelper = expirationFieldHelper(expYear, expYearErr, 'Select Year');
        cardNumHelper = fieldHelper(cardNum, cardHint, 'Credit card number cannot be blank', cardFormatErr, /^\d{13,16}$/);
        zipCodeHelper = fieldHelper(zipCode, zipCodeHint, 'Zip Code cannot be blank', zipCodeFormatErr, /^\d{5}$/);
        cvvHelper = fieldHelper(cvv, cvvHint, 'Card Verification Value cannot be blank', cvvFormatErr, /^\d{3}$/);
    }
    // if any one of the fields fail do not let form submit
    if (!nameHelper || !emailHelper || !checkboxHelper || !expDateHelper || !expYearHelper || !cardNumHelper || !zipCodeHelper || !cvvHelper) {
        event.preventDefault();
    }
});
/*

    **FUNCTIONS**

    * This section includes all the functions called by the event listeners
    * The helper functions are called throughout the code to dynamically update the form
    * The removeErrorMessage function removes a potential error message while the user enters data into a required field
*/

// checks if selected event conflicts with another
function scheduleConflict(checkbox, checkboxes, disable) {
    for (let j = 1; j < checkboxes.length; j++) {
        if (checkboxes[j].dataset.dayAndTime === checkbox.dataset.dayAndTime && checkboxes[j].name !== checkbox.name) {
            checkboxes[j].disabled = disable;
            disable ? checkboxes[j].parentElement.classList.add('disabled') : checkboxes[j].parentElement.classList.remove('disabled');
        }
    }
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
/*

    **HELPER FUNCTIONS**
    
*/
// validation for the checkbox fields
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
// validation for the expiration date fields
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
// validate all the required fields for blank or formatting errors
function fieldHelper(requiredField, hint, blankErr, formatErr = '', regex = null) {
    // display correct message based on error being thrown
    if (!requiredField.value) {
        requiredField.parentElement.classList.add('not-valid');
        requiredField.parentElement.classList.remove('valid');
        // change the error message if the field is blank
        hint.textContent = blankErr;
        hint.style.display = 'inline';
        return false;
    } else if (!regexTest(regex, requiredField.value)) {
        requiredField.parentElement.classList.add('not-valid');
        requiredField.parentElement.classList.remove('valid');
        // change it back to the original message
        hint.textContent = formatErr;
        hint.style.display = 'inline';
        return false;
    } else {
        requiredField.parentElement.classList.add('valid');
        requiredField.parentElement.classList.remove('not-valid');
        hint.style.removeProperty('display');
        return true;
    }
}
/*

    **OTHER FUNCTIONS**
    
*/
// remove the error message while user is typing
function removeErrorMessage(requiredField, hint) {
    if (requiredField.parentElement.classList.contains('not-valid')) {
        requiredField.parentElement.classList.remove('not-valid');
    }
    if (hint.style.display === 'inline') {
        hint.style.removeProperty('display');
    }
    // remove css from the payment method div
    if (!expYearErr.style.display && !expDateErr.style.display) {
        paymentMethodBox.style.removeProperty('padding-bottom');
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

