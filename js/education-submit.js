$('#btn-submit-content').click(function () {
    var inputName = $('#name').val();
    var inputEmail = $('#email').val();
    var inputSubject = $('#subject').val();
    var inputMessage = $('#message').val();

    if (!inputName)
        $('#name').addClass('invalid');
    else
        $('#name').removeClass('invalid');
    if (!inputEmail || !validateEmail(inputEmail))
        $('#email').addClass('invalid');
    else
        $('#email').removeClass('invalid');
    if (!inputSubject)
        $('#subject').addClass('invalid');
    else
    {
        $('#subject').removeClass('invalid');
        inputSubject = "[Submit Content] - " + inputSubject;
    }
    if (!inputMessage)
        $('#message').addClass('invalid');
    else
        $('#message').removeClass('invalid');
   


    if (inputName && inputEmail && validateEmail(inputEmail) && inputSubject && inputMessage) {
        $('#arrow-email').hide();
        $('#loader-email').show();
        submitAcademyContent(inputName, inputEmail, inputSubject, inputMessage);
    }
})

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function submitAcademyContent(inputName, inputEmail, inputSubject, inputMessage) {
    $.ajax({
        type: 'POST',
        url: 'https://auctustradingapi.azurewebsites.net/api/v1/website/submitContent',
        data: JSON.stringify({ name: inputName, email: inputEmail, subject: inputSubject, message: inputMessage }),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            $('.link-box .subtitle').text('Thanks for submitting, ' + $('#name').val());
            $('#name').val('');
            $('#email').val('');
            $('#subject').val('');
            $('#message').val('');
            $('#arrow-email').show();
            $('#loader-email').hide();
        }
    });
}