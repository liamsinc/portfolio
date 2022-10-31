
// Local color variables used when styling form message:
const successGreen = '#66FF00';
const errorRed = '#EE4B2B';

// Is the form valid?
let formValid = true;

// Regular expression used to validate email and phone:
const emailRegex = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i; // Is the email formatted correctly?
const phoneRegex1 = /^[\d \-()]*$/; // Are there any prohibited characters in the phone number?
const phoneRegex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // Is the number in an accepted format?

// Hide the contact form message and validation error elements by default:
$('.contact__message').hide();
$('.contact__error').hide();

// When form submit button is clicked:
$('.contact__button').click(function(event) {
    // Prevent page reload:
    event.preventDefault();

    // Grab data from form fields, trimming leading and trailing whitespace:
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const subject = $('#subject').val().trim();
    const message = $('#message').val().trim();

    // FORM DATA VALIDATION START --------------------------------------------------
    /*
    Note: The else clauses on each of these validation conditionals
    simply hides any error messages that may already be present, assuming the
    given value passes validation. It then sets formValid to true as
    the value may have been set to false by a previous validation error despite form
    field errors being corrected.
    */

    /* 
    NAME:
    Check name != empty string.
    */
    if (name === '') {
        $('.err-name')
            .text("Please enter your name!")
            .slideDown();
        formValid = false;
    } else {
        $('.err-name').slideUp();
        formValid = true;
    }

    /*
    EMAIL:
    Check email != empty string.
    Then check if the format is appropriate.
    */
    if (email === '') {
        $('.err-email')
            .text("Please enter your email!")
            .slideDown();
        formValid = false;
    } else if (!email.match(emailRegex)) {
        $('.err-email')
            .text("Please enter a valid email!")
            .slideDown();
        formValid = false;
    } else {
        $('.err-email').slideUp();
        formValid = true;
    }

    /*
    PHONE:
    Check phone != empty string.
    Then check for prohibited characters.
    Then check if the format is appropriate.
    */
    if (phone === '') {
        $('.err-phone')
            .text("Please enter your phone number!")
            .slideDown();
        formValid = false;
    } else if (!phone.match(phoneRegex1)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Remove prohibited characters)")
            .slideDown();
        formValid = false;
    } else if (!phone.match(phoneRegex2)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Check the format)")
            .slideDown();
        formValid = false;
    } else { 
        $('.err-phone').slideUp(); 
        formValid = true;
    }

    /*
    SUBJECT:
    Check subject != empty string.
    */
    if (subject === '') {
        $('.err-subject')
            .text("Please enter your subject!")
            .slideDown();
        formValid = false;
    } else {
        $('.err-subject').slideUp();
        formValid = true;
    }

    /*
    MESSAGE:
    Check message != empty string.
    */
    if (message === '') {
        $('.err-message')
            .text("Please enter your message!")
            .slideDown();
        formValid = false;
    } else {
        $('.err-message').slideUp();
        formValid = true;
    }

    // FORM DATA VALIDATION END --------------------------------------------------

    /*
    While formValid is false, the input field content does not reset upon clicking submit.
    When formValid is true, reset the contents of the input fields.
    */
    if (formValid) {
        $('.contact__input').val('');
    }

    /* 
    Sets the html content and styles dependant on form validation results.
    Using object literals to apply multiple css styles.
    */ 
    if (formValid) {
        $('.contact__message')
            .html("<strong>Thank you! Your message has been submitted successfully!</strong>")
            .css({
                color: successGreen,
                borderColor: successGreen,
            });
    } else {
        $('.contact__message')
            .html("<strong>Form validation failed. Please check your input fields!</strong>")
            .css({
                color: errorRed,
                borderColor: errorRed,
            });
    }

    /*
    After setting the message and styles, animate the message transition,
    but only if the element is not already visible.
    */ 
    if($('.contact__message').is(":hidden")) {
        $('.contact__message').slideDown(1000).delay(3000).slideUp();
    }

    
    
});

