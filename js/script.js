(function($) {
    var interval = setInterval(onTimer, 1000);

    function onTimer() {
        var date = Date.UTC(2017, 10, 14, 14, 00);
        
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

    function updateTimer(element, diff){
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

    // new Clipboard('.copy-button');

})(jQuery); // End of use strict

function onAgreePreSale(){
    $('.agree-terms').css('display', 'none');
    $('.agree-button').css('display', 'none');
    $('.address-copy').css('display', 'block');
    $('.copy-button').css('display', 'block');
}

function onCloseAgreementPopup(){
    $('.agree-terms').css('display', 'block');
    $('.agree-button').css('display', 'block');
    $('.address-copy').css('display', 'none');
    $('.copy-button').css('display', 'none');
    $('.copy-button').text('COPY ADDRESS');
}

function onCopyAddress(){
    $('.copy-button').text('COPIED!');
}



function joinWhitelist() {
    openNewTab("https://auctus.us16.list-manage2.com/subscribe?u=e6c2bc48f91f09fab4afe5bee&id=63a6a00141");
    registerClickEvent('JoinWhitelist');
}

function downloadWhitepaper(){
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
    openNewTab("https://demo.auctus.org");
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
