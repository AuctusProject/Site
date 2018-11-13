$.fn.attachDragger = function () {
    var attachment = false, lastPosition, position, difference;
    $(this).on("mousedown mouseup mousemove", function (e) {
        if (e.type == "mousedown") attachment = true, lastPosition = [e.clientX, e.clientY];
        if (e.type == "mouseup") attachment = false;
        if (e.type == "mousemove" && attachment == true) {
            position = [e.clientX, e.clientY];
            difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
            $(this).scrollLeft($(this).scrollLeft() - difference[0]);
            $(this).scrollTop($(this).scrollTop() - difference[1]);
            lastPosition = [e.clientX, e.clientY];
        }
    });
    $(window).on("mouseup", function () {
        attachment = false;
    });
}

$(function () {
    $yearBox = $('.timeline .year-box');
    totalSize = $yearBox.width() * $yearBox.length + ($yearBox.length - 1) * 4 + 10;
    $('.roadmap .timeline').width(totalSize);

    $(document).ready(function () {
        $(".scrollable").attachDragger();
    });


    $(document).scroll(function (event) {
        var $scrollable = $('.scrollable');
        if ($scrollable.visible(true)) {
            $('.scrollable').addClass('smooth');
            $scrollable.animate({ scrollLeft: $('.q-title.current').offset().left - 50 }, 0);
            $('.scrollable').removeClass('smooth');
            $(document).unbind("scroll");
        }
    });
});