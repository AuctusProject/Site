$('.year').click(function (e) {
    $('.highlighted').removeClass('highlighted');
    selectYear($(this));
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
        selectYear(yearToHighlight);
    }
});

function selectYear(selectedYear) {
    $('.highlighted').removeClass('highlighted');
    $('.content').hide();
    selectedYear.addClass('highlighted');
    $('#content-' + selectedYear[0].id).show();
}