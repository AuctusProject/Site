(function ($) {
   
    $.fn.visible = function (partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop() - 70,
            viewBottom = viewTop + $w.height() - 70,
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

    $(document).scroll(function (event) {
        var $scrollable = $('.scrollable');
        if ($scrollable.visible(true)) {
            $('.scrollable').addClass('smooth');
            $scrollable.animate({ scrollLeft: $('.q-title.current').offset().left - 50 }, 0);
            $('.scrollable').removeClass('smooth');
            $(document).unbind("scroll");
        }
    });
})(jQuery); // End of use strict



function registerClickEvent(category) {
    ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: 'click'
    });
}
