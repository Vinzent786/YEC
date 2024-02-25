let dropDownHidden = true;
// mouseInDropdown is needed to fix a bug in the last li child mouseleave event listener
let mouseInDropdown = false;
// Cooldown is needed to prevent re clicking on more option too quickly. This is because 
// of how the drop down works and to prevent confusion for the user
let currentTime;
let lastClosedTime;
const clickCoolDown = 500; 

const showDropDown = () => {
    $('#nav-drop-down').removeClass('hidden')
    // Removes the class to rotate the arrow back
    $('#down-arrow').removeClass('rotateBack');
    // Shows drop down
    $('#nav-drop-down').addClass('visible');
    $('#nav-drop-down').css('display', 'flex');
    dropDownHidden = false;
    // Rotates arrow
    $('#down-arrow').addClass('rotate180');
}

const hideDropDown = () => {
    $('#down-arrow').removeClass('rotate180');
    // Hides drop down
    $('#nav-drop-down').removeClass('visible');
    $('#nav-drop-down').addClass('hidden');
    setTimeout(() => $('#nav-drop-down').css('display', 'none'), 150)
    dropDownHidden = true;
    //Roates the down arrow back
    $('#down-arrow').addClass('rotateBack');
    if ($(window).width() < 700) return;
    lastClosedTime = Date.now(); // Gets the time the drop down closes
}

// Decides to show or hide dropdown menu when more is clicked, and prevents 
// the ternary from running within the cooldown on desktop, but not mobile
const showHideDecide = () => {
    currentTime = Date.now();
    const elapsedTime = currentTime - lastClosedTime;
    if ($(window).width() > 700) {
        if (elapsedTime < clickCoolDown) return;
    }
    dropDownHidden ? showDropDown() : hideDropDown();
}

//Test comment for Ryan
$('#more-container').on('click', () => showHideDecide());

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

// Creates top margin that is the size of the nav bar for page content
const createTopMargin = () => {
    const $nav = $('nav');
    const $content = $('.content-wrapper');
    $content.css('margin-top', `${$nav.height()}px`);
}

// This function modifies the nav list and the drop down list based on screen size
function updateDropDown() {

    const smallScreenNav = () => {
        const liItems = $('#nav-list > li:not(:last-child)'); //Gets the nav list items besides the more item
        if (liItems.length === 0) return;
        // Loop removes items from the nav list and adds it to the drop down
        for (let i = liItems.length - 1; i > 0; i--) {
            let removedElement = $(liItems[i]);
            liItems[i].remove();
            $('#nav-drop-down').append(removedElement);
        }
    }

    const largeScreenNav = () => {
        const dropDownItems = $('#nav-drop-down > li:not(:first-child):not(:nth-child(2))'); // Keeps the default two li still in the drop down
        if (dropDownItems.length === 0) return;
        const moreRemoved = $('#more-container'); // This is to re add the more item so it appears after the other items that get re added
        $('#more-container').remove();
        // Loops removes item from the drop down and adds it to the nav list
        for (let i = dropDownItems.length - 1; i >= 0; i--) {
            let removedElement = $(dropDownItems[i]);
            dropDownItems[i].remove();
            $('#nav-list').append(removedElement);
        }
        $('#nav-list').append(moreRemoved); // Adds the more item to end of nav list
        $('#more-container').on('click', () => showHideDecide());
    }

    if ($(window).width() < 1000) {
        smallScreenNav();
    } else if ($(window).width() >= 1000) {
        largeScreenNav();
    }
}

const setContentWrapperHeight = () => {
    $('.content-wrapper').css('min-height', `calc(100vh - ${$('nav').height()}px)`);
}

// This function is so that if the li element containing is clicked, but not the a element itself,
// then the a element still gets clicked
const setLIlisteners = () => {
    const navListItems = $('#nav-list > li:not(#more-container)');
    navListItems.on('click', function(event) {
        console.log('Clicked element:', event.target);
        const target = $(event.target);
        if (!target.is('a')) { // If click did not orginate from the a element
            // Trigger a click on the child 'a' element
            $(this).find('a')[0].click();
        }
    });
};

$(document).ready(() => {
    updateDropDown();
    createTopMargin();
    setContentWrapperHeight();
    setLIlisteners();

    $(window).on('resize', () => {
        updateDropDown();
        createTopMargin();
        setLIlisteners();
        setContentWrapperHeight();
        // This is needed to be defined here again to fix a bug when screen is resized
        $('#nav-drop-down').on('mouseleave', function() {
            mouseInDropdown = false;
            if (!dropDownHidden) hideDropDown();
        });
    }); 

    $('body').on('scroll', () => {
        hideDropDown();
        createTopMargin();
        $('#more-container').blur();
    });
});