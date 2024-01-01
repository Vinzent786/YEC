const imgArray = [
    "https://i.imgur.com/vLisEXT.jpg",
    "https://i.imgur.com/3K4S65i.jpg",
    "https://i.imgur.com/exRkale.jpg",
    "https://i.imgur.com/xXLRyGQ.jpg",
    "https://i.imgur.com/kPaNQOX.jpg",
    "https://i.imgur.com/nhz8PXd.jpg",
    "https://i.imgur.com/Q8NkFr7.jpg",
    "https://i.imgur.com/wCWIVd0.jpg",
    "https://i.imgur.com/vwqfGwV.jpg",
    "https://i.imgur.com/mHt6ufA.jpg",
    "https://i.imgur.com/XPaXqUi.jpg",
    "https://i.imgur.com/FxOSMRo.jpg",
    "https://i.imgur.com/6D8MIBT.jpg",
    "https://i.imgur.com/wqbsIQr.jpg",
    "https://i.imgur.com/LzNpIJF.jpg",
    "https://i.imgur.com/FlSPwN4.jpg",
    "https://i.imgur.com/iIdEhNX.jpg",
    "https://i.imgur.com/lB5kPiS.jpg",
    "https://i.imgur.com/ilL9xA8.jpg",
    "https://i.imgur.com/OqQ5L6r.jpg",
    "https://i.imgur.com/xkvmWXQ.jpg",
    "https://i.imgur.com/lBztcgE.jpg",
    "https://i.imgur.com/CtceZjL.jpg",
    "https://i.imgur.com/CxawBHA.jpg",
    "https://i.imgur.com/v4MCr9f.jpg",
    "https://i.imgur.com/yCzix88.jpg",
    "https://i.imgur.com/XI7GoEJ.jpg",
    "https://i.imgur.com/AkFsZNU.jpg",
    "https://i.imgur.com/JJiT1yZ.jpg",
    "https://i.imgur.com/0yPEPFO.jpg"
];

const c = (x) => {
    return console.log(x);
}

const createImg = (src, id) => {
    const img = $('<img>');
    img.attr({
        'src': `${src}`,
        'id': `${id}`,
        'loading': 'lazy'
    });
    return img;
}

const checkAmount = () => {
    let screenWidth = $(window).width();
    let amount = 0;
    if (screenWidth <= 500) {
        amount = 1;
    } else if (screenWidth >= 500 && screenWidth < 700) {
        amount = 2;
    } else if (screenWidth >= 700 && screenWidth < 1000) {
        amount = 3;
    } else if (screenWidth >= 1000 && screenWidth < 1400) {
        amount = 4;
    } else {
        amount = 5;
    }
    addImgs(amount);
}

const addImgs = (amount) => {
    const currentImgs = $('#img-container > img');

    // Runs for initial load
    if (!currentImgs.length) {
        for (let i = 0; i < amount && i < imgArray.length; i++) {
            $('#img-container').append(createImg(imgArray[i], i));
        }
        return;
    }

    // Appends imgs from the imgarray to #img-container
    let lastID = parseInt(currentImgs.last().attr('id'));
    for (let i = lastID + 1; i < lastID + 1 + amount && i < imgArray.length; i++) {
        $('#img-container').append(createImg(imgArray[i], i));
        if (i === imgArray.length) $('#show-more').attr('disabled', 'true');
    }

    // Check if the button should be disabled if reached end of imgArray
    const remainingImages = imgArray.length - (lastID + 1 + amount);
    if (remainingImages <= 0) {
        $('#show-more').prop('disabled', true);
    }
}

$(document).ready(() => {
    checkAmount();
    $('#show-more').on('click', () => checkAmount());
});