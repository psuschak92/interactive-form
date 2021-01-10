# interactive-form
 an interactive web form with web accessibility

All required input fields are dynamic and tailored to the specific error. 
The following fields display an error message if the field is left empty or incorrectly formatted:
- nameHint field displays the message "Name field cannot be blank"
- emailHint field displays the message "Email address cannot be blank" or "Email address must be formatted correctly"
- cardHint field displays the message "Credit card number cannot be blank" or "Credit card number must be between 13 - 16 digits"
- zipCodeHint field displays the message "Zip Code cannot be blank" to the user" or "Zip Code must be 5 digits"
- cvvHint field displays the message "Card Verification Value cannot be blank" or "CVV must be 3 digits"
- activitiesHint field displays the message "Choose at least one activity"

Not required but the following fields also provide a validation message if left blank:
- expDateErr field displays the message "Please select a date from the dropdown"
- expYearErr field displays the message "Please select a year from the dropdown"



