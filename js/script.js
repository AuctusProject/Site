(function ($) {
    var interval = setInterval(onTimer, 1000);

    function onTimer() {
        var date = Date.UTC(2018, 3, 20, 14, 00);     

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

function openWhitepaperModal () {
    if($("#choose-whitepaper").length === 0) {
        var modal = '<div class="modal fade" style="margin-top:15%" id="choose-whitepaper" role="dialog">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-body">' +
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                                    '<img class="mini-waves" src="../img/presale/mini-waves.png" />' +
                                    '<h2 class="text-center">' +
                                        ' Choose the language' +
                                    '</h2>' +
                                    '<h4 class="text-center">' +
                                        'Выберите язык' +
                                    '</h4>' +
                                    '<div class="row text-center">' +
                                        '<div class="col-lg-6">' +
                                            '<a class="btn" onclick="downloadWhitepaper(\'en\')">' +
                                                'English' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="col-lg-6">' +
                                            '<a class="btn" onclick="downloadWhitepaper(\'ru\')">' +
                                                'Русский' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
    
        $("body").append(modal);
    }
    
    $('#choose-whitepaper').modal('show');    
}

function downloadWhitepaper(language) {
    $('#choose-whitepaper').modal('hide');
    var link = language === 'ru' ? 
        'https://dl.auctus.org/Auctus_Whitepaper_Ru.pdf' : 'https://dl.auctus.org/Auctus_Whitepaper.pdf'

    openNewTab(link);
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

function ExpertsPlatform() {
    openNewTab("https://experts.auctus.org");
    registerClickEvent('Expert');
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

function openContributeModal() {
    $('#contribute-modal').modal('show');
}

function copyAddress() {
    copyElementToClipboard('#address-text');
    $('#copy-address-btn').html("ADDRESS COPIED!");
}

function copyElementToClipboard(elementId) {
    var tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val($(elementId).text()).select();
    document.execCommand("copy");
    tempInput.remove();
}