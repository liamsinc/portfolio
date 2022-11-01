/*
This file holds all the javascript/jquery functionality for index.html (homepage).
Functionally seperate code will be seperated into sections by "// COMMENTS --------".
*/

// FUNCTIONS ------------------------------------------------------------------------------------------

// Used in side menu section
function closeSideMenu() {
    if ($('.header').is(':visible') && window.innerWidth < 768){
        $('#check').prop('checked', false);
        $('.header').hide(200);
    }
}

// FORM JAVASCRIPT/JQUERY START -----------------------------------------------------------------------

// Local color variables used when styling form message:
const successGreen = '#66FF00';
const errorRed = '#EE4B2B';

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
2. Are there any prohibited characters in the phone number?
3. Is the phone number in an accepted format?
*/
const emailRegex = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/; 
const phoneCharRegex = /^[\d \-()]*$/; 
const phoneFormatRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// Hide the contact form message and validation error elements by default:
$('.contact__message').hide();
$('.contact__error').hide();

// When the form submit button is clicked:
$('.contact__button').on('click', (event) => {
    // Prevent page reload:
    event.preventDefault();

    // Grab data from form fields, trimming leading and trailing whitespace:
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let phone = $('#phone').val().trim();
    let subject = $('#subject').val().trim();
    let message = $('#message').val().trim();

    // Configure settings for DOMPurify
    const config = {
        ALLOWED_TAGS: ['', ''],
        KEEP_CONTENT: true
    };

    // Sanitize the user input
    name = DOMPurify.sanitize(name, config);
    email = DOMPurify.sanitize(email, config);
    phone = DOMPurify.sanitize(phone, config);
    subject = DOMPurify.sanitize(subject, config);
    message = DOMPurify.sanitize(message, config);

    // BEGIN FORM VALIDATION:
    
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
        nameValid = false;
    } else {
        $('.err-name').slideUp();
        nameValid = true;
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
        emailValid = false;
    } else if (!email.match(emailRegex)) {
        $('.err-email')
            .text("Please enter a valid email!")
            .slideDown();
        emailValid = false;
    } else {
        $('.err-email').slideUp();
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
            .text("Please enter your phone number!")
            .slideDown();
        phoneValid = false;
    } else if (!phone.match(phoneCharRegex)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Prohibited characters)")
            .slideDown();
        phoneValid = false;
    } else if (!phone.match(phoneFormatRegex)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Invalid format)")
            .slideDown();
        phoneValid = false;
    } else { 
        $('.err-phone').slideUp(); 
        phoneValid = true;
    }

    /*
    SUBJECT:
    Check subject != empty string.
    */
    if (subject === '') {
        $('.err-subject')
            .text("Please enter your subject!")
            .slideDown();
        subjectValid = false;
    } else {
        $('.err-subject').slideUp();
        subjectValid = true;
    }

    /*
    MESSAGE:
    Check message != empty string.
    */
    if (message === '') {
        $('.err-message')
            .text("Please enter your message!")
            .slideDown();
        messageValid = false;
    } else {
        $('.err-message').slideUp();
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
    form fields do not reset.
    */
    if (formValid) {
        $('.contact__input').val('');
    }

    /* 
    Sets the html content and styles dependant on form validation results.
    Using object literals to apply multiple css styles and use local variables:
    */
    if (formValid) {
        $('.contact__message')
            .html(`<strong>Thanks ${name}! Your message has been sent successfully!</strong>`)
            .css({
                color: successGreen,
                borderColor: successGreen,
            });
    } else {
        $('.contact__message')
            .html("<strong>Oops! Please check your form fields!</strong>")
            .css({
                color: errorRed,
                borderColor: errorRed,
            });
    }

    /*
    After setting the message and styles, animate the message transition,
    but only if the element is not already visible.
    Prevents the animation from repeatedly running in certain circumstances:
    */ 
    if($('.contact__message').is(":hidden")) {
        $('.contact__message').slideDown(1000).delay(3000).slideUp();  
    }
});

// FORM JAVASCRIPT/JQUERY END -----------------------------------------------------------------------

// SIDE MENU JAVASCRIPT/JQUERY START ----------------------------------------------------------------

// Unchecks the menu button and clears form fields on page reload:
$(document).ready(() => {
    $('#check').prop('checked', false);
    $('.contact__input').val('');
});

// Open side menu when menu button clicked
$('#check').on('click', () => {
    if ($('header').is(':visible')) {
        $('header').hide(200)   
    } else {
        $('.header').show(500);
    } 
});

/*
When a browser window resize event is triggered,
check if the viewport width is greater than 768px.
If true, uncheck the checkbox and show the header.
Else if the viewport width is less than 768px AND the menu button is unchecked, 
hide the header.
*/
$(window).on('resize', () => {
    if (window.innerWidth >= 768) {
        $('#check').prop('checked', false);
        $('.header').show();
    } else if (window.innerWidth < 768 && $('#check').prop('checked') === false) {
        $('.header').hide();
    }
});

// Closes side menu on small devices when page local links are clicked:

$('#portfolio-link').click(closeSideMenu);
$('#contact-link').click(closeSideMenu);

// SIDE MENU JAVASCRIPT/JQUERY END ----------------------------------------------------------------

// GENERIC JAVASCRIPT/JQUERY START ----------------------------------------------------------------

// Color variable used for active nav link:
const aqua = '#00FFFF';

/*
When the page loads, get the URL and apply active styles to relevant nav link:
The conditional will keep the homepage as the active link when "my portfolio" or "contact me" links are clicked, as the elements they refer to are on the same page. 
The conditional also accounts for a bugs that occurs when the homepage is viewed via github pages or the cPanel domain (see fourth/fifth statement in the first conditional).
*/
$(document).ready(() => {
    const currentURL = window.location.href;
    if (currentURL.endsWith('index.html') ||
        currentURL.endsWith('#portfolio') ||
        currentURL.endsWith('#form-anchor') ||
        currentURL.endsWith('portfolio/') || // Fixes bug when page is loaded via github pages
        currentURL.endsWith('scs.co.uk/') || // Fixes bug when page is loaded via cPanel domain
        currentURL.endsWith(':5500/')) { // Fixes rare bug when page is loaded via VSC live server

        $('#home-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else if (currentURL.endsWith('about.html')) {
        $('#about-link').css({
            color: aqua,
            textDecoration: 'underline',
        });
    } else if (currentURL.endsWith('examples.html')) {
        $('#examples-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else if (currentURL.endsWith('scs.html')){
        $('#scs-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else {
        console.log(`Error: Cannot determine active link for ${currentURL}`);
    }
});

// Get the page height:
const pageHeight = $(document.body).prop('scrollHeight');

// Use the page height to ascertain whether to display the header button:
if (pageHeight < 1000) {
    $('.header__button').hide();
} else {
    $('.header__button').show();
}

// Handler for when Scroll Up button is clicked.
$('.header__button').on('click', () => {
    $(document.body).prop('scrollTop', 0);
    $(document.documentElement).prop('scrollTop', 0);
})

// GENERIC JAVASCRIPT/JQUERY END ------------------------------------------------------------------

