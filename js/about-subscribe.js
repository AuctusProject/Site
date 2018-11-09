$('#btn-subscription').click(function () {
    var inputName = $('#name').val();
    var inputEmail = $('#email').val();

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
            alert('Great success');
        }
    });
})