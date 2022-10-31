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
$(document).ready(function () {
    const currentURL = window.location.href;
    if (currentURL.endsWith('index.html') || currentURL.endsWith('#portfolio') || currentURL.endsWith('#contact')) {
        $('#home-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else if (currentURL.endsWith('about.html')) {
        $('#about-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else if (currentURL.endsWith('examples.html')) {
        $('#examples-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    } else {
        $('#scs-link').css({
            color: aqua,
            textDecoration: 'underline'
        });
    }
});

// GENERIC JAVASCRIPT/JQUERY END ------------------------------------------------------------------