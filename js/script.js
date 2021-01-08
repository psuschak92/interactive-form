// focus name field by default
const userName = document.getElementById('name');
userName.focus();
// adds real-time validation to name field
userName.addEventListener('keyup', () => { validateNameField(userName); });
userName.addEventListener('blur', () => { validateNameField(userName); });

const userEmail = document.getElementById('email');
// display real-time message if the field is left empty
const emailEmptyError = document.createElement('span');
emailEmptyError.textContent = 'Email address cannot be empty';
emailEmptyError.classList.add('email-hint');
emailEmptyError.classList.add('hint');
// error message must be added to the parent label 
userEmail.parentElement.appendChild(emailEmptyError);
// adds real-time validation to the email field
userEmail.addEventListener('keyup', (event) => {
    // this line prevents a message from being displayed right away if field is tabbed into
    if (event.code !== 'Tab'){
        validateEmailField(userEmail);
    }
});
userEmail.addEventListener('blur', () => { validateEmailField(userEmail); });

// hide other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => showPaymentOption(paymentMethod, paymentMethod.value));

const cardNum = document.getElementById('cc-num');

const cardEmptyError = document.createElement('span');
cardEmptyError.textContent = 'Credit card number cannot be empty';
cardEmptyError.classList.add('cc-hint');
cardEmptyError.classList.add('hint');
// add error message to the parent label 
cardNum.parentElement.appendChild(cardEmptyError);
// adds real-time validation to the card input fields
cardNum.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        validateCardNumberField(cardNum);
    }
});
cardNum.addEventListener('blur', () => { validateCardNumberField(cardNum); });

const zipCode = document.getElementById('zip');
const zipEmptyError = document.createElement('span');
zipEmptyError.textContent = 'Zip Code cannot be empty';
zipEmptyError.classList.add('zip-hint');
zipEmptyError.classList.add('hint');
// add error message to the parent label 
zipCode.parentElement.appendChild(zipEmptyError);
zipCode.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        validateZipCodeField(zipCode);
    }
});       
zipCode.addEventListener('blur', () => { validateZipCodeField(zipCode); });

const cvv = document.getElementById('cvv');
const cvvEmptyError = document.createElement('span');
cvvEmptyError.textContent = 'Zip Code cannot be empty';
cvvEmptyError.classList.add('zip-hint');
cvvEmptyError.classList.add('hint');
// add error message to the parent label 
cvv.parentElement.appendChild(cvvEmptyError);
cvv.addEventListener('keyup', (event) => {
    if (event.code !== 'Tab') {
        validateCVVField(cvv);
    }
});
cvv.addEventListener('blur', () => { validateCVVField(cvv); });

// initialize cc dropdown elements
const paymentMethodBox = document.getElementById('payment-method');
const expDate = document.getElementById('exp-month');
const expDateErr = document.createElement('span');
expDateErr.textContent = 'Please select a date from the dropdown';
expDateErr.classList.add('hint');
expDate.parentElement.appendChild(expDateErr);
expDate.addEventListener('blur', () => { validateExpDateField(expDate); });

const expYear = document.getElementById('exp-year');
const expYearErr = document.createElement('span');
expYearErr.textContent = 'Please select a year from the dropdown';
expYearErr.classList.add('hint');
expYear.parentElement.appendChild(expYearErr);
expYear.addEventListener('blur', () => { validateExpYearField(expYear); });
        
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
    // TODO: condense these loops into one function
    // check the data-theme option for matches to the hard-coded string
    if (shirtDesigns.value === 'js puns') {
        for(let i = 0; i < color.options.length; i++) {
            const option = color.options[i];
            if (option.dataset.theme !== 'js puns'){
                option.hidden = true;
            } else {
                option.hidden = false;
            } 
        }
    } else if (shirtDesigns.value === 'heart js') {
        for(let i = 0; i < color.options.length; i++) {
            const option = color.options[i];
            if (option.dataset.theme !== 'heart js'){
                option.hidden = true;
            } else {
                option.hidden = false;
            }
        }
    }
});

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
            if (checkbox.name === 'js-libs' || checkbox.name === 'node' || checkbox.name === 'js-frameworks' || checkbox.name === 'build-tools') {
                for (let j = 1; j < checkboxes.length; j++) {
                    if (checkboxes[j].dataset.dayAndTime === checkbox.dataset.dayAndTime && checkboxes[j].name !== checkbox.name) {
                        checkboxes[j].disabled = true;
                        checkboxes[j].parentElement.classList.add('disabled');
                    }
                }
            }
        } else {
            if (checkbox.name === 'js-libs' || checkbox.name === 'node' || checkbox.name === 'js-frameworks' || checkbox.name === 'build-tools') {
                for (let j = 1; j < checkboxes.length; j++) {
                    if (checkboxes[j].dataset.dayAndTime === checkbox.dataset.dayAndTime && checkboxes[j].name !== checkbox.name) {
                        checkboxes[j].disabled = false;
                        checkboxes[j].parentElement.classList.remove('disabled');
                    }
                }
            }
        }
    }
    // set cost count to zero if all the activities remain unchecked 
    if(!costCount) {
        totalCost = activitiesCost.textContent.replace(/\d+/, `${costCount}`);
        activitiesCost.textContent = totalCost;
        validateCheckBoxEvents(checkboxes);
    } else {
        validateCheckBoxEvents(checkboxes);
    }
});

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
    // could use else ifs here as well
    if (!validateNameField(userName)) { event.preventDefault(); }

    if (!validateEmailField(userEmail)) { event.preventDefault(); }
    
    if (!validateCheckBoxEvents(activities.getElementsByTagName('input'))) { event.preventDefault(); }

    if (paymentMethod.value === 'credit-card') {
        
        if (!validateExpDateField(expDate)) { event.preventDefault(); }

        if (!validateExpYearField(expYear)) { event.preventDefault(); }
        
        if (!validateCardNumberField(cardNum)) { event.preventDefault(); }
        
        if (!validateZipCodeField(zipCode)) { event.preventDefault(); }
        
        if (!validateCVVField(cvv)) { event.preventDefault(); }
    }
});

// the validate functions return false if a required field is null or if the required field is incorrectly formatted
// otherwise they return true
function validateNameField(name) {
    const nameEmptyErr = document.getElementById('name-hint');
    if (!name.value) {
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        nameEmptyErr.style.display = 'inline';
        return false;
    } else {
        name.parentElement.classList.add('valid');
        name.parentElement.classList.remove('not-valid');
        nameEmptyErr.style.display = 'none';
        return true;
    }
}

function validateEmailField(email) {
    const emailFormatError = document.getElementById('email-hint');
    // display correct message based on error being thrown
    if (!email.value) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');        
        emailEmptyError.style.display = 'inline';
        emailFormatError.style.display = 'none';
        return false;
    } else if (!testEmail(email.value)){
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        emailFormatError.style.display = 'inline';
        emailEmptyError.style.display = 'none'; 
        return false;
    } else {
        email.parentElement.classList.add('valid');
        email.parentElement.classList.remove('not-valid'); 
        emailFormatError.style.display = 'none';
        emailEmptyError.style.display = 'none';
        return true;
    }
}

function validateCheckBoxEvents(checkboxes) {
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
        activitiesHint.style.display = 'none';
        return true;
    }
}

function validateExpDateField(expDate) {
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

function validateExpYearField(expYear) {
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



function validateCardNumberField(card) {
    const cardFormatError = document.getElementById('cc-hint');
    // display correct message based on error being thrown
    if (!card.value) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardEmptyError.style.display = 'inline';
        cardFormatError.style.display = 'none';
        return false;
    } else if (!testCardNum(card.value)) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardFormatError.style.display = 'inline';
        cardEmptyError.style.display = 'none';
        return false;
    } else {
        card.parentElement.classList.add('valid');
        card.parentElement.classList.remove('not-valid');
        cardFormatError.style.display = 'none';
        cardEmptyError.style.display = 'none';
        return true;
    }
}

function validateZipCodeField(zip) {
    const zipFormatError = document.getElementById('zip-hint');
    // display correct message based on error being thrown
    if (!zip.value) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipEmptyError.style.display = 'inline';
        zipFormatError.style.display = 'none';
        return false;
    } else if (!testZipCode(zip.value)) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipFormatError.style.display = 'inline';
        zipEmptyError.style.display = 'none';
        return false;
    } else {
        zip.parentElement.classList.add('valid');
        zip.parentElement.classList.remove('not-valid');
        zipFormatError.style.display = 'none';
        zipEmptyError.style.display = 'none';
        return true;
    }
}

function validateCVVField(cvv) {
    const cvvFormatError = document.getElementById('cvv-hint');
    // display correct message based on error being thrown
    if (!cvv.value) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvEmptyError.style.display = 'inline';
        cvvFormatError.style.display = 'none';
        return false;
    } else if (!testCVV(cvv.value)) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvFormatError.style.display = 'inline';
        cvvEmptyError.style.display = 'none';
        return false;
    } else {
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.classList.remove('not-valid');
        cvvFormatError.style.display = 'none';
        cvvEmptyError.style.display = 'none';
        return true;
    }
}

// test the required input elements using regex 
function testEmail(email) {
    const regex = /\S+@\S+\.\w+/;
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
