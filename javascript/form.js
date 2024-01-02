let startTime;

function submit() {
    const inputList = Array.from($('input, textarea'));
    let readyToSend = true;
    let name, email, message, phone;
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime < 300) {
        alert('Possible bot detected. Take your time filling out the form.');
        readyToSend = false;
        return;
    }

    inputList.forEach(element => {
            if (element.value.length > 0) {
                switch ($(element).attr('name')) {
                    case 'name':
                        name = element.value;
                        break;
                    case 'email':
                        email = element.value;
                        break;
                    case 'phone_num':
                        phone_num = element.value;
                        break;
                    case 'message':
                        message = element.value;
                        break;
                    default:
                        break;
                }
        } else {
            readyToSend = false;
            $(element).addClass('err');
            setTimeout(()=> $(element).removeClass('err'), 1000);
            switch ($(element).attr('name')) {
                case 'name':
                    $(element).attr('placeholder', 'Must enter your full Name');
                    break;
                case 'email':
                    $(element).attr('placeholder', 'Must enter your Email');
                    break;
                case 'phone_num':
                    $(element).attr('placeholder', 'Must enter your Phone Number e.g. 123-456-7890');
                    break;
                case 'message':
                    $(element).attr('placeholder', 'Must enter a Message');
                    break;
                default:
                    break;
            }
        }
    });

    if (readyToSend) {
        emailjs.send('service_8pl1o1h', 'template_8ianm4o', {
            name: name,
            email: email,
            phone_num: phone_num,
            message: message
        })
        .then((response, err) => {
            if(response){
                $('form').css('display', 'none');
                $('#closure').css('display', 'block');
                $('#closure').text(`Message sent successfully! You will hear back from us soon at ${email}`);
            } else {
                $('form').css('display', 'none');
                $('#closure').text(`There was an error processesing your message. Error: ${err}`);
            }
        });
    }
}


// Prevents keys besides numbers and backspace to be pressed and checks input length
const checkKeys = (event) => {
    const allowedChars = /[0-9]/;
    if (!event.key) return; // If auto fill fills in number
    if (event.key === 'Backspace' || event.key === 'Delete') { // Allows a backspace
        return;
    }
    if (!event.key.match(allowedChars) || $('#phone-num').val().length >= 12) event.preventDefault();
}

// Formats the phone number to xxx-xxx-xxxx format
function formatPhoneNum() {
    let phoneNum = $(this).val().replace(/[^0-9]/g, '');

    if (phoneNum.length >= 3) {
        phoneNum = phoneNum.replace(/(\d{3})(\d{3})?(\d{0,4})/, (match, p1, p2, p3) => {
            let num = p1;
            if (p2) num += '-' + p2;
            if (p3) num += '-' + p3;
            return num;
        });
    }

    $(this).val(phoneNum); // Make input's value the formatted number
}

$(document).ready(() => {
    $('#phone-num').on('keydown', checkKeys);
    $('#phone-num').on('input', formatPhoneNum);
    startTime = new Date().getTime();
    $('form').submit((event) => {
        event.preventDefault();
        submit();
    });
    emailjs.init('Qmj-x8EzmOhgBtNF5');
});
