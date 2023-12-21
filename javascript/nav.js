const c = (x) => console.log(x);

let dropDownHidden = true;
// mouseInDropdown is needed to fix a bug in the last li child mouseleave event listener
let mouseInDropdown = false;
// Cooldown is needed to prevent re clicking on more option too quickly. This is because 
// of how the drop down works and to prevent confusion for the user
let currentTime;
let lastClosedTime;
const clickCoolDown = 800; 

const showDropDown = () => {
    $('#nav-drop-down').removeClass('hidden')
    // Removes the class to rotate the arrow back
    $('#down-arrow').removeClass('rotateBack');
    // Shows drop down
    $('#nav-drop-down').addClass('visible');
    dropDownHidden = false;
    // Rotates arrow
    $('#down-arrow').addClass('rotate180');
}

const hideDropDown = () => {
    $('#down-arrow').removeClass('rotate180');
    // Hides drop down
    $('#nav-drop-down').removeClass('visible');
    $('#nav-drop-down').addClass('hidden');
    dropDownHidden = true;
    // Roates the down arrow back
    $('#down-arrow').addClass('rotateBack');
    lastClosedTime = Date.now(); // Gets the time the drop down closes
}

// Decides to show or hide dropdown menu when more is clicked, and prevents 
// the ternary from running within the cooldown
$('#more-arrow-wrapper').on('click', function() {
    currentTime = Date.now();
    const elapsedTime = currentTime - lastClosedTime;
    if (elapsedTime < clickCoolDown) return;
    dropDownHidden ? showDropDown() : hideDropDown();
});

// Hides drop if mouse leaves drop down 
$('#nav-drop-down').on('mouseleave', function() {
    mouseInDropdown = false;
    if (!dropDownHidden) hideDropDown();
});

$('#nav-drop-down').on('mouseenter', () => {
    mouseInDropdown = true;
});

// Hides dropdown when mouse leaves li element if drop down is visible & mouse is not in drop down
$('#nav-list li:last-child').on('mouseleave', function() {
    if (!mouseInDropdown) {
        if (!dropDownHidden) hideDropDown();
    }
});

//Creates top margin that is the size of the nav bar for page content
const createTopMargin = () => {
    const $nav = $('nav');
    const $content = $('.content-wrapper');
    $content.css('margin-top', `${$nav.height()}px`);
}

$(document).ready(() => {
    createTopMargin();
    $(window).on('resize', () => createTopMargin());
    $(window).on('scroll', () => createTopMargin());
});