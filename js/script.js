(function ($) {
    var interval = setInterval(onTimer, 1000);

    function onTimer() {
        var date = Date.UTC(2018, 2, 27, 14, 00);

        var element = $('.timer');
        var diff = date - new Date().getTime();
        if (diff < 0) {
            updateCountdown(element, 0, 0, 0, 0);
            clearInterval(interval);
        }
        else {
            updateTimer(element, diff);
        }
    };

    function updateTimer(element, diff) {
        var secondInMiliseconds = 1000;
        var minuteInMiliseconds = 60 * secondInMiliseconds;
        var hourInMiliseconds = 60 * minuteInMiliseconds;
        var dayInMiliseconds = 24 * hourInMiliseconds;

        var days = Math.floor(diff / dayInMiliseconds);
        diff -= days * (dayInMiliseconds);

        var hours = Math.floor(diff / hourInMiliseconds);
        diff -= hours * (hourInMiliseconds);

        var mins = Math.floor(diff / minuteInMiliseconds);
        diff -= mins * minuteInMiliseconds;

        var seconds = Math.floor(diff / secondInMiliseconds);
        diff -= seconds * secondInMiliseconds;

        updateCountdown(element, days, hours, mins, seconds);
    }

    function updateCountdown(element, days, hours, minutes, seconds) {
        element.find(".time-part.days .time-value").html(days);
        element.find(".time-part.hours .time-value").html(hours);
        element.find(".time-part.minutes .time-value").html(minutes);
        element.find(".time-part.seconds .time-value").html(seconds);
    };

    $('#addressModal').on('hidden.bs.modal', function () {
        onCloseAgreementPopup();
    })


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


    $(window).scroll(function (event) {
        var body = window.document.body; //IE 'quirks'
        var document = window.document.documentElement; //IE with doctype
        document = (document.clientHeight) ? document : body;

        if (document.scrollTop != 0) {
            $('.top-header').addClass('hover');
        }
        else {
            $('.top-header').removeClass('hover');
        }
    })

    $(".top-header").hover(
        function () {

            var body = window.document.body; //IE 'quirks'
            var document = window.document.documentElement; //IE with doctype
            document = (document.clientHeight) ? document : body;

            if (document.scrollTop != 0 && !$(this).hasClass('hover')) {
                $(this).addClass('hover');
            }
        }, function () {
            if ($(this).hasClass('hover') && document.scrollTop == 0) {
                $(this).removeClass('hover');
            }
        }
    );

})(jQuery); // End of use strict


//$(window).scroll(function (event) {

//    $(".show-up").each(function (i, el) {
//        var el = $(el);
//        if (el.visible(true)) {
//            el.addClass("come-in");
//            el.addClass("come-in-bottom");
//        }
//    });

//    $(".roadmap .box.left").each(function (i, el) {
//        var el = $(el);
//        if (el.visible(true)) {
//            el.addClass("come-in");
//            el.addClass("come-in-left");
//        }
//    });
//    $(".roadmap .box.right").each(function (i, el) {
//        var el = $(el);
//        if (el.visible(true)) {
//            el.addClass("come-in");
//            el.addClass("come-in-right");
//        }
//    });
//});

function onAgreePreSale() {
    $('.agree-terms').css('display', 'none');
    $('.agree-button').css('display', 'none');
    $('.address-copy').css('display', 'block');
    $('.copy-button').css('display', 'block');
}

function onCloseAgreementPopup() {
    $('.agree-terms').css('display', 'block');
    $('.agree-button').css('display', 'block');
    $('.address-copy').css('display', 'none');
    $('.copy-button').css('display', 'none');
    $('.copy-button').text('COPY ADDRESS');
}

function onCopyAddress() {
    $('.copy-button').text('COPIED!');
}



function joinWhitelist() {
    openNewTab("https://auctus.us16.list-manage2.com/subscribe?u=e6c2bc48f91f09fab4afe5bee&id=63a6a00141");
    registerClickEvent('JoinWhitelist');
}

function downloadWhitepaper() {
    openNewTab("https://dl.auctus.org/Auctus_Whitepaper.pdf");
    registerClickEvent('Whitepaper');
}

function gotoPresale() {
    openNewTab("https://auctus.org/presale");
    registerClickEvent('Presale');
}

function downloadPresentation() {
    openNewTab("http://dl.auctus.org/Auctus_Project_Overview.pdf");
    registerClickEvent('Presentation');
}

function TryOurDemo() {
    openNewTab("https://platform.auctus.org");
    registerClickEvent('Demo');
}

function openNewTab(url) {
    window.open(url, "_blank");
}


function registerClickEvent(category) {
    ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: 'click'
    });
}

function acceptCookies(e) {
    $(e).addClass('close-toast');
    setCookie('cookie-accepted', 1);
}