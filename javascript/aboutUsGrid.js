function buildMobileGrid() {
    const bigGrid = $('#about-us-grid');
    if (bigGrid.length > 0) bigGrid.remove();
    if ($('#mobile-about-us-grid').length > 0) return;
    const mobileGrid = $('<div id="mobile-about-us-grid"></div>');
    mobileGrid.appendTo($('#about-us'));
    (() => {
        const article1 = $(`<article id="mobile-article1"></article>`);
        $('<h2>The Room of Prestige!</h2>').appendTo(article1);
        $('<p>Come and let your imagination free by creating the experience YOU desire!</p>').appendTo(article1);
        $('<div></div>').appendTo(article1);
        $(article1).appendTo(mobileGrid);

        const article2 = $(`<article id="mobile-article2"></article>`);
        $('<h2>This is the place for YOU!</h2>').appendTo(article2);
        $('<p>Have the VIP experience for your guest with convenient secure parking!</p>').appendTo(article2);
        $('<div></div>').appendTo(article2);
        $(article2).appendTo(mobileGrid);

        const article3 = $(`<article id="mobile-article3"></article>`);
        $('<h2>We would LOVE to host YOU!</h2>').appendTo(article3);
        $('<p>Host your next VIP event HERE!</p>').appendTo(article3);
        $('<div></div>').appendTo(article3);
        $(article3).appendTo(mobileGrid);

        const article4 = $(`<article id="mobile-article4"></article>`);
        $('<h2>We would LOVE to host YOU!</h2>').appendTo(article4);
        $('<p>Host your next VIP event HERE!</p>').appendTo(article4);
        $('<div></div>').appendTo(article4);
        $(article4).appendTo(mobileGrid);
    })();
}

function buildBigGrid() {
    const mobileGrid = $('#mobile-about-us-grid');
    if (mobileGrid.length > 0) mobileGrid.remove();
    if ($('#about-us-grid').length > 0) return;
    const bigGrid = $('<div id="about-us-grid"></div>');
    bigGrid.appendTo($('#about-us'));
    (() => {
        const article1 = $('<article id="article1"></article>');
        $('<h2>The Room of Prestige!</h2>').appendTo(article1);
        $('<div><p>Come and let your imagination free by creating the experience YOU desire!</p></div>').appendTo(article1);
        $(article1).appendTo($(bigGrid));

        const article2 = $('<article id="article2"></article>');
        $('<h2>This is the place for YOU!</h2>').appendTo(article2);
        $('<div><p>Have the VIP experience for your guest with convenient secure parking!</p></div>').appendTo(article2);
        $(article2).appendTo(bigGrid);

        const article3 = $('<article id="article3"></article>');
        $('<h2>We would LOVE to host YOU!</h2>').appendTo(article3);
        $('<div><p>Host your next VIP event HERE!</p></div>').appendTo(article3);
        $(article3).appendTo(bigGrid);

        const article4 = $('<article id="article4"></article>');
        $('<h2>Added Prep Area!</h2>').appendTo(article4);
        $('<div><p>Prepare for Your Exclusive Party!</p></div>').appendTo(article4);
        $(article4).appendTo(bigGrid);
    })();
}

const checkScreenSize = () => {
    if ($(window).width() <= 1000) {
        buildMobileGrid();
    } else if ($(window).width() > 1000) {
        buildBigGrid();
    }
}

$(document).ready(() => {
    checkScreenSize();
    $(window).on('resize', () => checkScreenSize());
});