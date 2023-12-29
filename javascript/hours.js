$(document).ready(() => {
    const hoursP = $('#hoursP');
    const hoursList = $('#hours-list');
    const date = new Date();
    const day = date.getDay();

    //Since the hours are the same every day, this way of showing open hours isn't needed. 
    //However, I made it this way incase if the hours do change and differ, then it would be easy to implement 
    switch (day) {
        case 0: // 0 is Sunday
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 1:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 2:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 3:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 4:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 5:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        case 6:
            hoursP.text('Open Today 09:00am - 01:00am');
            break;
        default:
            break;
    }


    $('#hours-h4').on('click', () => {
        //This class rotates the down arrow
        $('#hours-h4 > img').toggleClass('clicked');
        //This if, else if block is for fading in and out the hours drop down and the open today text
        if (hoursList.css('display') === 'none') {
            hoursP.css('display', 'none');
            hoursList.css('display', 'flex');
            hoursList.addClass('fade-in');
        } else if (hoursList.css('display') === 'flex') {
            hoursList.removeClass('fade-in');
            hoursList.addClass('fade-out');
            setTimeout(() => {
                hoursList.css('display', 'none');
                hoursList.removeClass('fade-out');
                hoursP.css('display', 'block');
            }, 130); 
        }
    });
});
