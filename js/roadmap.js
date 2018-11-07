$(function () {
    $yearBox = $('.timeline .year-box');
    totalSize = $yearBox.width() * $yearBox.length + ($yearBox.length - 1) * 4 + 10;
    $('.roadmap .timeline').width(totalSize);
});

$(document).ready(function () {
    $('.scrollable').on('mousemove', function (e) {
        var leftOffset = $(this).offset().left;
        if (leftOffset < 300) {
            leftOffset = 300;
        }
        if (leftOffset > $('.roadmap .timeline').width() - 300){
            leftOffset -= 300;
        }
        $('.roadmap .timeline').css('left', -e.clientX + leftOffset - 300);       
    });
});

