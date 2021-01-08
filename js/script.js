// focus the name field by default
const userName = document.getElementById('name');
userName.focus();

// hide the other job role field by default
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

// select the credit-card payment option by default
const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod);
paymentMethod.addEventListener('change', () => showPaymentOption(paymentMethod, paymentMethod.value));

// display hidden field if title is other
const jobRole = document.getElementById('title');
jobRole.addEventListener('change', () => {
    if (jobRole.value === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    } 
});

const shirtColor = document.getElementById('color');
shirtColor.disabled = true;

const shirtDesigns = document.getElementById('design');
shirtDesigns.addEventListener('change', () => {
    shirtColor.disabled = false;
    // TODO: condense these loops into one function
    // check the data-theme option for matches to the hard-coded string
    if (shirtDesigns.value === 'js puns') {
        for(let i = 0; i < shirtColor.options.length; i++) {
            const option = shirtColor.options[i];
            if (option.dataset.theme !== 'js puns'){
                option.hidden = true;
            } else {
                option.hidden = false;
            } 
        }
    } else if (shirtDesigns.value === 'heart js') {
        for(let i = 0; i < shirtColor.options.length; i++) {
            const option = shirtColor.options[i];
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
    const nameField = document.getElementById('name');
    if (!validateNameField(nameField)) { event.preventDefault(); }

    const emailField = document.getElementById('email');
    if (!validateEmailField(emailField)) { event.preventDefault(); }
    
    // use the global activities variable to get the checkbox elements
    const checkboxes = activities.getElementsByTagName('input');
    if (!validateCheckBoxEvents(checkboxes)) { event.preventDefault(); }

    if (paymentMethod.value === 'credit-card') {
        const expMonth = document.getElementById('exp-month');
        if (expMonth.value === 'Select Date') {

        }
        const expYear = document.getElementById('exp-year');
        if (expYear.value === 'Select Year') {

        }
        const cardNum = document.getElementById('cc-num');
        if (!validateCardNumberField(cardNum)) { event.preventDefault(); }
        
        const zipCode = document.getElementById('zip');
        if (!validateZipCodeField(zipCode)) { event.preventDefault(); }
        
        const cvv = document.getElementById('cvv');
        if (!validateCVVField(cvv)) { event.preventDefault(); }
    }
});

// the validate functions return false if a required field is null or if the required field is incorrectly formatted
// otherwise they return true
function validateNameField(name) {
    const nameHint = document.getElementById('name-hint');
    if (!name.value) {
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        nameHint.style.display = 'inline';
        return false;
    } else {
        name.parentElement.classList.add('valid');
        name.parentElement.classList.remove('not-valid');
        nameHint.style.display = 'none';
        return true;
    }
}

function validateEmailField(email) {
    const emailHint = document.getElementById('email-hint');
    if (!email.value) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');        
        emailHint.style.display = 'inline';
        return false;
    } else if (!testEmail(email.value)){
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid'); 
        return false;
    } else {
        email.parentElement.classList.add('valid');
        email.parentElement.classList.remove('not-valid'); 
        emailHint.style.display = 'none';
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

function validateCardNumberField(card) {
    const cardHint = document.getElementById('cc-hint');
    if (!card.value) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardHint.style.display = 'inline';
        return false;
    } else if (!testCardNum(card.value)) {
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        cardHint.style.display = 'inline';
        return false;
    } else {
        card.parentElement.classList.add('valid');
        card.parentElement.classList.remove('not-valid');
        cardHint.style.display = 'none';
        return true;
    }
}

function validateZipCodeField(zip) {
    const zipHint = document.getElementById('zip-hint');
    if (!zip.value) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipHint.style.display = 'inline';
        return false;
    } else if (!testZipCode(zip.value)) {
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zipHint.style.display = 'inline';
        return false;
    } else {
        zip.parentElement.classList.add('valid');
        zip.parentElement.classList.remove('not-valid');
        zipHint.style.display = 'none';
        return true;
    }
}

function validateCVVField(cvv) {
    const cvvHint = document.getElementById('cvv-hint');
    if (!cvv.value) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvHint.style.display = 'inline';
        return false;
    } else if (!testCVV(cvv.value)) {
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvHint.style.display = 'inline';
        return false;
    } else {
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.classList.remove('not-valid');
        cvvHint.style.display = 'none';
        return true;
    }
}

// test the required input elements using regex 
function testEmail(email) {
    const regex = /\S+@\S+\.\w+/i;
    return regex.test(email);
}

function testCardNum(cardNum) {
    const regex = /\d{13,16}/;
    return regex.test(cardNum);
}

function testZipCode(zipCode) {
    const regex = /\d{5}/;
    return regex.test(zipCode);
}

function testCVV(cvv) {
    const regex = /\d{3}/;
    return regex.test(cvv);
}
