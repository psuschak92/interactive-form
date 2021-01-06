const userName = document.getElementById('name');
userName.focus();

const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;

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

shirtDesign = document.getElementById('design');
shirtDesign.addEventListener('change', () => {
    shirtColor.disabled = false;
    // TODO: condense these loops into one function
    // check the data-theme option for matches to the hard-coded string
    if (shirtDesign.value === 'js puns') {
        for(let i = 0; i < shirtColor.options.length; i++) {
            const option = shirtColor.options[i];
            if (option.dataset.theme !== 'js puns'){
                option.hidden = true;
            } else {
                option.hidden = false;
            } 
        }
    } else if (shirtDesign.value === 'heart js') {
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
    const checkBoxes = activities.getElementsByTagName('input');
    const activitiesCost = document.getElementById('activities-cost');
    let costCount = 0;
    let totalCost = '';
    for (let i = 0; i < checkBoxes.length; i++) {
        const checkBox = checkBoxes[i];
        if (checkBox.checked) {
            costCount += parseInt(checkBox.dataset.cost);
            totalCost = activitiesCost.textContent.replace(/\d+/, `${costCount}`);
            activitiesCost.textContent = totalCost;
            // TODO: condense these loops into one function
            for (let j = 0; j < checkBoxes.length; j++) {
                // if checkbox is checked and the day-and-time string are identical then disable any/all matches
                if (checkBox.dataset.dayAndTime === checkBoxes[j].dataset.dayAndTime && checkBox.name !== checkBoxes[j].name) {
                    checkBoxes[j].parentElement.className = 'disabled';
                    checkBoxes[j].disabled = true;
                }
            }
        } else if (!checkBox.checked) {
            for (let j = 0; j < checkBoxes.length; j++) {
                // if checkbox is unchecked and the day-and-time string are identical then enable any/all matches
                if (checkBox.dataset.dayAndTime === checkBoxes[j].dataset.dayAndTime && checkBox.name !== checkBoxes[j].name) {
                    checkBoxes[j].parentElement.className = '';
                    checkBoxes[j].disabled = false;
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

// window.onload = function() {
//     const paymentMethod = document.getElementById('payment');
//     paymentMethod.value = 'credit-card';
// }

const paymentMethod = document.getElementById('payment');
paymentMethod.value = 'credit-card';
showPaymentOption(paymentMethod, 'credit-card');
paymentMethod.addEventListener('change', () => showPaymentOption(paymentMethod, paymentMethod.value));

// shows the specified option passed as the second parameter, and hides all other payment options 
function showPaymentOption(optionList, optionVal = '') {
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

