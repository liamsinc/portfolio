/*
This file holds all the javascript/jquery functionality for index.html (homepage).
Functionally seperate code will be seperated into sections by "// COMMENTS --------".
*/

// VARIABLES/CONSTANTS ---------------------------------------------------------------------------------

// Get the page height:
const pageHeight = $(document.body).prop('scrollHeight');

// Color variables used when styling form messages:
const successGreen = '#66FF00';
const errorRed = '#EE4B2B';

// Color variable used for active nav link:
const aqua = '#00FFFF';

// Are the form fields valid?
let nameValid = true;
let emailValid = true;
let phoneValid = true;
let subjectValid = true;
let messageValid = true;

// Is the form valid?
let formValid = true;

/*
Regular expressions used to validate email and phone:
1. Is the email formatted correctly?
2. Does the phone number contain prohibited characters?
3. Is the phone number in an accepted format?
*/
const emailRegex = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/; 
const phoneCharRegex = /^[\d \-()]*$/; 
const phoneFormatRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// Styles for input field success message:
const fieldValidStyles = {
    'color': successGreen,
    'text-shadow': '0 0 10px', successGreen
}

// Styles for input field failure message:
const fieldInvalidStyles = {
    'color': errorRed,
    'text-shadow': '0 0 10px', errorRed
}

// Styles for form success message:
const formValidStyles = {
    'color': successGreen,
    'border-color': successGreen
}

// Styles for form failure message:
const formInvalidStyles = {
    'color': errorRed,
    'border-color': errorRed
}

// Styles for active navigation link:
const activeNavStyles = {
    'color': aqua,
    'text-decoration': 'underline'
}

// Configure settings for DOMPurify:
const config = {
    ALLOWED_TAGS: ['', ''],
    KEEP_CONTENT: true
};

// Strings used in form error/success messages:
const nameNullError = "Please enter your name!";
const emailNullError = "Please enter your email!";
const emailFormatError = "Please enter a valid email! (Invalid Format)";
const phoneNullError = "Please enter your phone number!";
const phoneCharError = "Please enter a valid phone number! (Prohibited Characters)";
const phoneFormatError = "Please enter a valid phone number! (Invalid Format)";
const subjectNullError = "Please enter your subject!";
const messageNullError = "Please enter your message!";
const fieldValidated = "Validation successful!";

// FUNCTIONS ------------------------------------------------------------------------------------------

// Used in side menu section:
function closeSideMenu() {
    if ($('.header').is(':visible') && window.innerWidth < 768){
        $('#check').prop('checked', false);
        $('.header').hide(200);
    }
}

// Jumps to the top of the page:
function jumpToTop() {
    $(document.body).prop('scrollTop', 0);
    $(document.documentElement).prop('scrollTop', 0);
}

// Checks if the header scroll button should be visible:
function checkHeaderScroll() {
    // Use the page height and width to ascertain whether to display the header scroll button:
    if (pageHeight < 1000 || window.innerWidth < 768) {
        $('.header__button').hide();
    } else {
        $('.header__button').show();
    }
}

// FORM JAVASCRIPT/JQUERY START -----------------------------------------------------------------------

// Hide the contact form message and validation error elements by default:
$('.contact__message').hide();
$('.contact__error').hide();

// When the form submit button is clicked:
$('.contact__button').on('click', (event) => {
    // Prevent page reload:
    event.preventDefault();

    // Ensure error message styles are reset:
    $('.contact__error').css(fieldInvalidStyles);

    // Grab data from form fields, trimming leading and trailing whitespace:
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let phone = $('#phone').val().trim();
    let subject = $('#subject').val().trim();
    let message = $('#message').val().trim();

    // Sanitize the user input (name will be displayed in HTML later, protects against XSS)
    name = DOMPurify.sanitize(name, config);
    email = DOMPurify.sanitize(email, config);
    phone = DOMPurify.sanitize(phone, config);
    subject = DOMPurify.sanitize(subject, config);
    message = DOMPurify.sanitize(message, config);

    // BEGIN FORM VALIDATION:
    /* 
    Note: The last else if clauses of each validation conditonal will display a success message,
    but only on form fields which have already failed validation once, and the error message is 
    already present. It also sets the {field}Valid variables to true as by this point we know the 
    validation has failed at least once.
    */

    /* 
    NAME:
    Check name != empty string.
    */
    if (name === '') {
        $('.err-name')
            .text(nameNullError)
            .slideDown();
        nameValid = false;
    } else if (nameValid === false){
        $('.err-name')
            .css(fieldValidStyles)
            .text(fieldValidated)
            .delay(2000).slideUp();
        nameValid = true;
    }

    /*
    EMAIL:
    Check email != empty string.
    Then check if the format is appropriate.
    */
    if (email === '') {
        $('.err-email')
            .text(emailNullError)
            .slideDown();
        emailValid = false;
    } else if (!email.match(emailRegex)) {
        $('.err-email')
            .text(emailFormatError)
            .slideDown();
        emailValid = false;
    } else if (emailValid === false) {
        $('.err-email')
            .css(fieldValidStyles)
            .text(fieldValidated)
            .delay(2000).slideUp();
        emailValid = true;
    }

    /*
    PHONE:
    Check phone != empty string.
    Then check for prohibited characters.
    Then check if the format is appropriate.
    */
    if (phone === '') {
        $('.err-phone')
            .text(phoneNullError)
            .slideDown();
        phoneValid = false;
    } else if (!phone.match(phoneCharRegex)) {
        $('.err-phone')
            .text(phoneCharError)
            .slideDown();
        phoneValid = false;
    } else if (!phone.match(phoneFormatRegex)) {
        $('.err-phone')
            .text(phoneFormatError)
            .slideDown();
        phoneValid = false;
    } else if (phoneValid === false) { 
        $('.err-phone')
            .css(fieldValidStyles)
            .text(fieldValidated)
            .delay(2000).slideUp();
        phoneValid = true;
    }

    /*
    SUBJECT:
    Check subject != empty string.
    */
    if (subject === '') {
        $('.err-subject')
            .text(subjectNullError)
            .slideDown();
        subjectValid = false;
    } else if (subjectValid === false){
        $('.err-subject')
            .css(fieldValidStyles)
            .text(fieldValidated)
            .delay(2000).slideUp();
        subjectValid = true;
    }

    /*
    MESSAGE:
    Check message != empty string.
    */
    if (message === '') {
        $('.err-message')
            .text(messageNullError)
            .slideDown();
        messageValid = false;
    } else if (messageValid === false) {
        $('.err-message')
            .css(fieldValidStyles)
            .text(fieldValidated)
            .delay(2000).slideUp()
        messageValid = true;
    }

    // If all form fields are valid, then the form is valid:
    if (nameValid && emailValid && phoneValid && subjectValid && messageValid) {
        formValid = true;
    } else {
        formValid = false;
    }
        
    // END FORM VALIDATION

    /*
    When formValid is true, reset the contents of the input fields upon submit.
    Because I called event.preventDefault(), the page doesn't reload and thus the
    form fields do not reset automatically. Also sets the html content and styles 
    of the form success/failure message dependant on form validation results.
    */
    if (formValid) {
        $('.contact__input').val('');
        $('.contact__message')
            .html(`<strong>Thanks ${name}! Your message has been sent successfully!</strong>`)
            .css(formValidStyles);
    } else {
        $('.contact__message')
            .html("<strong>Oops! Please check your form fields!</strong>")
            .css(formInvalidStyles);
    }

    /*
    After setting the message and styles, animate the message transition,
    but only if the element is not already visible.
    Also manipulates the submit button.
    Prevents the animation from repeatedly running in certain circumstances:
    */ 
    if($('.contact__message').is(":hidden")) {
        $('.contact__button').slideUp(500);
        $('.contact__message').slideDown(500).delay(3000).slideUp();
        $('.contact__button').delay(3000).slideDown(500);
    }
});

// FORM JAVASCRIPT/JQUERY END -----------------------------------------------------------------------

// GENERIC JAVASCRIPT/JQUERY START ------------------------------------------------------------------

/*
When the page loads/reloads, get the URL and apply active styles to relevant nav link:
The conditional will keep the homepage as the active link when "my portfolio" or "contact me" 
links are clicked, as the elements they refer to are on the same page. The conditional also 
accounts for a bugs that occurs when the homepage is viewed via github pages, cPanel 
domain or VSC live server (see fourth/fifth/sixth statement in the first conditional).
After the conditional, it unchecks the menu button, clears form fields and checks if the header 
scroll button should be visible:
*/
$(document).ready(() => {
    const currentURL = window.location.href;

    if (currentURL.endsWith('index.html') || currentURL.endsWith('#portfolio') ||
        currentURL.endsWith('#form-anchor') || currentURL.endsWith('portfolio/') || 
        currentURL.endsWith('scs.co.uk/') || currentURL.endsWith(':5500/')) { 
        $('#home-link').css(activeNavStyles);
    } else if (currentURL.endsWith('about.html')) {
        $('#about-link').css(activeNavStyles);
    } else if (currentURL.endsWith('examples.html')) {
        $('#examples-link').css(activeNavStyles);
    } else if (currentURL.endsWith('scs.html')){
        $('#scs-link').css(activeNavStyles);
    } else {
        console.log(`Error: Cannot determine active link for ${currentURL}`);
    }

    $('#check').prop('checked', false);
    $('.contact__input').val('');

    checkHeaderScroll();
});

// Open side menu when menu button clicked
$('#check').on('click', () => {
    if ($('header').is(':visible')) {
        $('header').hide(200)   
    } else {
        $('.header').show(500);
    } 
});

// Attaches pre-built function to scroll to the top of the page
$('.header__button').on('click', jumpToTop);
$('.mobile__scroll').on('click', jumpToTop);

// Closes side menu on small devices when page local links are clicked:
$('#portfolio-link').on('click', closeSideMenu);
$('#contact-link').on('click', closeSideMenu);

/*
When a browser window resize event is triggered,
check if the viewport width is greater than 768px.
If true, uncheck the checkbox and show the header.
Else if the viewport width is less than 768px AND the menu button is unchecked, 
hide the header. After conditional, run checkHeaderScroll().
*/
$(window).on('resize', () => {
    if (window.innerWidth >= 768) {
        $('#check').prop('checked', false);
        $('.header').show();
    } else if (window.innerWidth < 768 && $('#check').prop('checked') === false) {
        $('.header').hide();
    }
    
    checkHeaderScroll();
});

// GENERIC JAVASCRIPT/JQUERY END ------------------------------------------------------------------