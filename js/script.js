/*

    ** FORM FIELDS **

    * This section includes all the required fields and associated listener events
    * The hint fields are updated according to the type of error 
    * The error messages are stored in strings that contain a format error message and a blank error message 
    
*/
/*

    ** NAME FIELDS **
    
*/
const nameField = document.getElementById('name');
const nameHint = document.getElementById('name-hint');
nameField.focus();
nameField.addEventListener('keyup', () => { hideHintField(nameField, nameHint); });
nameField.addEventListener('blur', () => { fieldValidator(nameField, nameHint, nameHint.textContent); });
/*

    ** EMAIL FIELDS **
    
*/
const emailField = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
// save the error messages
const emailFormatErr = emailHint.textContent;
const emailBlankErr = 'Email address cannot be blank';
emailField.addEventListener('keyup', () => { hideHintField(emailField, emailHint); });
// call the helper function if the field is left blank or formatted incorrectly
emailField.addEventListener('blur', () => { fieldValidator(emailField, emailHint, emailBlankErr, emailFormatErr, /^\S+@\S+\.\S+$/); });

// hide other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

/*

    ** CREDIT CARD FIELDS **
    
*/
const cardNum = document.getElementById('cc-num');
const cardHint = document.getElementById('cc-hint');
const cardFormatErr = cardHint.textContent;
const cardBlankErr = 'Credit card number cannot be blank';
cardNum.addEventListener('keyup', () => {
    // if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        hideHintField(cardNum, cardHint);
    // }
});
cardNum.addEventListener('blur', () => { fieldValidator(cardNum, cardHint, cardBlankErr, cardFormatErr, /^\d{13,16}$/); });

const zipCode = document.getElementById('zip');
const zipCodeHint = document.getElementById('zip-hint');
const zipCodeFormatErr = zipCodeHint.textContent;
const zipCodeBlankErr = 'Zip Code cannot be blank';
zipCode.addEventListener('keyup', () => {
    // if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        hideHintField(zipCode, zipCodeHint);
    // }
});       
zipCode.addEventListener('blur', () => { fieldValidator(zipCode, zipCodeHint, zipCodeBlankErr, zipCodeFormatErr, /^\d{5}$/); });

const cvv = document.getElementById('cvv');
const cvvHint = document.getElementById('cvv-hint');
const cvvFormatErr = cvvHint.textContent;
const cvvBlankErr = 'Card Verification Value cannot be blank';
cvv.addEventListener('keyup', () => {
    // if (event.code !== 'ShiftLeft' && event.code !== 'Tab') {
        hideHintField(cvv, cvvHint);
    // }
});
cvv.addEventListener('blur', () => { fieldValidator(cvv, cvvHint, cvvBlankErr, cvvFormatErr, /^\d{3}$/); });

// added id to payment method div in index.html
const paymentMethodBox = document.getElementById('payment-method');
const expDate = document.getElementById('exp-month');
const expDateErr = document.createElement('span');
expDateErr.textContent = 'Please select a date from the dropdown';
expDateErr.classList.add('hint');
expDate.parentElement.appendChild(expDateErr);
expDate.addEventListener('change', () => { hideHintField(expDate, expDateErr); });
expDate.addEventListener('blur', () => { expirationFieldValidator(expDate, expDateErr, 'Select Date'); });

const expYear = document.getElementById('exp-year');
const expYearErr = document.createElement('span');
expYearErr.textContent = 'Please select a year from the dropdown';
expYearErr.classList.add('hint');
expYear.parentElement.appendChild(expYearErr);
expYear.addEventListener('change', () => { hideHintField(expYear, expYearErr); });
expYear.addEventListener('blur', () => { expirationFieldValidator(expYear, expYearErr, 'Select Year'); });

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => { showPaymentOption(paymentMethod, paymentMethod.value); });
/*

    ** JOB ROLE FIELD **
    
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

    ** T-SHIRT INFO FIELDS **
    
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

    ** REGISTER FOR ACTIVITIES FIELDS **
    
*/
const activities = document.getElementById('activities');
const activitiesHint = document.getElementById('activities-hint');
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
        checkboxEventValidator(checkboxes);
    } else {
        checkboxEventValidator(checkboxes);
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

    ** FORM FIELD **
    
*/
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // store validation results in boolean values
    const nameHelper = fieldValidator(nameField, nameHint, nameHint.textContent);
    const emailHelper = fieldValidator(emailField, emailHint, emailBlankErr, emailFormatErr, /^\S+@\S+\.\S+$/);
    const checkboxHelper = checkboxEventValidator(activities.getElementsByTagName('input'));
    let expDateHelper = true;
    let expYearHelper = true;
    let cardNumHelper = true;
    let zipCodeHelper = true;
    let cvvHelper = true;

    if (paymentMethod.value === 'credit-card') {
        expDateHelper = expirationFieldValidator(expDate, expDateErr, 'Select Date');
        expYearHelper = expirationFieldValidator(expYear, expYearErr, 'Select Year');
        cardNumHelper = fieldValidator(cardNum, cardHint, cardBlankErr, cardFormatErr, /^\d{13,16}$/);
        zipCodeHelper = fieldValidator(zipCode, zipCodeHint, zipCodeBlankErr, zipCodeFormatErr, /^\d{5}$/);
        cvvHelper = fieldValidator(cvv, cvvHint, cvvBlankErr, cvvFormatErr, /^\d{3}$/);
    }
    // if any one of the fields fail do not let form submit
    if (!nameHelper || !emailHelper || !checkboxHelper || !expDateHelper || !expYearHelper || !cardNumHelper || !zipCodeHelper || !cvvHelper) {
        event.preventDefault();
    }
});
/*

    ** FORM FUNCTIONS **

    * This section includes all the functions called by the event listeners
    * The hideHintField function hides a potential error message while the user is active in that field
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

    ** HELPER FUNCTIONS **
    
*/
// validation for the checkbox fields
function checkboxEventValidator(checkboxes) {
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
function expirationFieldValidator(date, dateFieldErr, optionVal) {
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
// takes a input object, a hint object, a blank error string, an optional format error string, and an optional regex object
function fieldValidator(requiredField, hint, blankErr, formatErr = '', regex = null) {
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

    ** OTHER FUNCTIONS **
    
*/
function hideHintField(requiredField, hint) {
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

