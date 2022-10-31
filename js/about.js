// SIDE MENU JAVASCRIPT/JQUERY START ----------------------------------------------------------------

// Ensures the menu button is unchecked on page reload:
$(document).ready(function() {
    $('#check').prop('checked', false);
});

// Open side menu when menu button clicked
$('#check').click(function() {
    if ($('header').is(':visible')) {
        $('header')
            .hide(500)   
    } else {
        $('.header')
            .css({width: 250})
            .show(500);
    } 
});

/*
When a browser window resize event is triggered,
check if the viewport width is greater than 768px.
If true, uncheck the checkbox, set the header width back 
to the default (200px) and show the header.
Else if the viewport width is less than 768px AND the menu button is unchecked, 
hide the header.
*/
$(window).resize(function () {
    if (window.innerWidth >= 768) {
        $('#check').prop('checked', false);
        $('.header').css({width: 200}).show();
    } else if (window.innerWidth < 768 && $('#check').prop('checked') === false) {
        $('.header').hide();
    }
});

// SIDE MENU JAVASCRIPT/JQUERY END ----------------------------------------------------------------