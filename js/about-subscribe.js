$('#btn-subscription').click(function () {
    var inputName = $('#name').val();
    var inputEmail = $('#email').val();

    if (!inputName)
        $('#name').addClass('invalid');
    else
        $('#name').removeClass('invalid');
    if (!inputEmail || !validateEmail(inputEmail))
        $('#email').addClass('invalid');
    else
        $('#email').removeClass('invalid');

    if (inputName && inputEmail && validateEmail(inputEmail)) {
        subscribeToNewsletter(inputName, inputEmail);
    }
})

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function subscribeToNewsletter(inputName, inputEmail) {
    $.ajax({
        type: 'POST',
        url: 'https://auctusplatformapidev.azurewebsites.net/api/v1/website/emails',
        data: JSON.stringify({ name: inputName, email: inputEmail }),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            $('.link-box .subtitle').text('Thanks for registering, ' + $('#name').val());
        }
    });
}