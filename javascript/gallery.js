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

const createImg = (src, index) => {
    const img = $('<img>');
    img.attr({
        'src' : `${src}`,
        'id' : `${index}`,
        'loading' : 'lazy',
        'alt' : 'Gallery Image'
    });
    return img;
}

const removeImage = () => {
    const img = $('#gallery > img');
    img.remove();
}

const scrollImg = (direction) => {
    const gallery = $('#gallery');
    let img = $('#gallery > img')[0];
    let currentID; //Current img id
    let nextID; //Next img id
    let nextSrc; //Next img src
    switch (direction) {
        case 'first':
            gallery.append(createImg(imgArray[0], 0));
            break;
        case 'left':
            currentID = parseInt(img['id']);
            if (currentID === imgArray.length - 1) { //Wraps around to beginning of array if at end
                removeImage();
                //Giving the browser a cycle time to make any adjustments before adding the new img
                setTimeout(() => gallery.append(createImg(imgArray[0], 0)));
                break;
            }
            nextID = currentID + 1;
            nextSrc = imgArray[currentID + 1];
            removeImage();
            setTimeout(() => gallery.append(createImg(nextSrc, nextID)));
            break;
        case 'right':
            currentID = parseInt(img['id']);
            if (currentID === 0) { //Wraps around to end of array if at beginning
                removeImage();
                //Giving the browser a cycle time to make any adjustments before adding the new img
                setTimeout(() => gallery.append(createImg(imgArray[imgArray.length - 1], imgArray.length - 1)));
                break;
            }
            nextID = currentID - 1;
            nextSrc = imgArray[currentID - 1];
            removeImage();
            setTimeout(() => gallery.append(createImg(nextSrc, nextID)));
            break;
        default:
            break;
    }
}

$(document).ready(() => {
    scrollImg('first');
    $('#left-arrow').on('click', () => scrollImg('left'));
    $('#right-arrow').on('click', () => scrollImg('right'));
});