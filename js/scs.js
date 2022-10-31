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