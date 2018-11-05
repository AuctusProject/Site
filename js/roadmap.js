$('.year').click(function (e) {
    $('.highlighted').removeClass('highlighted');
    $(this).addClass('highlighted');
});

$('.arrow').click(function (e) {
    var yearToHighlight = null;
    if ($(this).hasClass('invert-horizontally')) {
        yearToHighlight = $('.highlighted').prev('.year');
    }
    else {
        yearToHighlight = $('.highlighted').next('.year');
    }
    if (yearToHighlight.length > 0) {
        $('.highlighted').removeClass('highlighted');
        yearToHighlight.addClass('highlighted');
    }
});