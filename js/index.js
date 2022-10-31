/*
This file holds all the javascript/jquery functionality for index.html (homepage).
Functionally seperate code will be seperated into sections by "// COMMENTS --------".
*/


// FORM JAVASCRIPT/JQUERY START -----------------------------------------------------------------------

// Local color variables used when styling form message:
const successGreen = '#66FF00';
const errorRed = '#EE4B2B';

// Is the form valid?
let formValid = true;

// Regular expressions used to validate email and phone:
// Is the email formatted correctly?
const emailRegex = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i; 
// Are there any prohibited characters in the phone number?
const phoneCharRegex = /^[\d \-()]*$/; 
// Is the phone number in an accepted format?
const phoneFormatRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

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
    } else if (!phone.match(phoneCharRegex)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Prohibited characters)")
            .slideDown();
        formValid = false;
    } else if (!phone.match(phoneFormatRegex)) {
        $('.err-phone')
            .text("Please enter a valid phone number! (Invalid format)")
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

    // END FORM VALIDATION

    /*
    While formValid is false, the input field content does not reset upon submit.
    When formValid is true, reset the contents of the input fields upon submit:
    */
    if (formValid) {
        $('.contact__input').val('');
    }

    /* 
    Sets the html content and styles dependant on form validation results.
    Using object literals to apply multiple css styles:
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
    Prevents the animation from repeatedly running in certain circumstances:
    */ 
    if($('.contact__message').is(":hidden")) {
        $('.contact__message').slideDown(1000).delay(3000).slideUp();
    }
});

// FORM JAVASCRIPT/JQUERY END -----------------------------------------------------------------------

// SIDE MENU JAVASCRIPT/JQUERY START ----------------------------------------------------------------

// Ensures the menu button is unchecked on page reload:
$(document).ready(function() {
    $('#check').prop('checked', false);
});

// Open side menu when menu button clicked
$('#check').click(function() {
    if ($('header').is(':visible')) {
        $('header').hide(500)   
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
$(window).resize(function () {
    if (window.innerWidth >= 768) {
        $('#check').prop('checked', false);
        $('.header').show();
    } else if (window.innerWidth < 768 && $('#check').prop('checked') === false) {
        $('.header').hide();
    }
});

// SIDE MENU JAVASCRIPT/JQUERY END ----------------------------------------------------------------

// GENERIC JAVASCRIPT/JQUERY START ----------------------------------------------------------------

// Color variable used for active nav link:
const aqua = '#00FFFF';

// When the page loads, get the URL and apply active styles to relevant nav link:
/*
When the page loads, get the URL and apply active styles to relevant nav link:
The conditional will keep the homepage as the active link when "my portfolio" or "contact me" links are clicked, as the elements they refer to are on the same page. 
The conditional also accounts for a bugs that occurs when the homepage is viewed via github pages or the cPanel domain (see fourth/fifth statement in the first conditional).
*/
$(document).ready(function () {
    const currentURL = window.location.href;
    if (currentURL.endsWith('index.html') ||
        currentURL.endsWith('#portfolio') ||
        currentURL.endsWith('#contact') ||
        currentURL.endsWith('portfolio/') || // Fixes bug when page is loaded via github pages
        currentURL.endsWith('scs.co.uk')) { // Fixes bug when page is loaded via cPanel domain

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
        alert(`Error: Cannot determine active link for ${currentURL}`);
    }
});

// GENERIC JAVASCRIPT/JQUERY END ------------------------------------------------------------------

