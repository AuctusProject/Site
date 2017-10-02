(function($) {
    var preSaleInterval = setInterval(onPreSaleTimer, 1000);

    function onPreSaleTimer() {
        var date = Date.UTC(2017, 9, 6, 14, 00);
        
        var element = $('.timer');
        var diff = date - new Date().getTime();
        if (diff < 0) {
            updateCountdown(element, 0, 0, 0, 0);
            clearInterval(preSaleInterval);
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

    $(".i-agree-checkbox").change(function () {
        onChangeTermsCheckbox();
    });

    $('#reveal-address').click(function () {
        $('#button-area').hide();
        $('#address-area').show();
    });

})(jQuery); // End of use strict

function joinWhitelist() {
    openNewTab("https://auctus.us16.list-manage2.com/subscribe?u=e6c2bc48f91f09fab4afe5bee&id=63a6a00141");
    registerClickEvent('JoinWhitelist');
}

function downloadWhitepaper(){
    openNewTab("https://dl.auctus.org/Auctus_Whitepaper.pdf");
    registerClickEvent('Whitepaper');
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

function onChangeTermsCheckbox() {
    var allChecked = $('.i-agree-checkbox:checked').length == $('.i-agree-checkbox').length;

    if (allChecked && $('#reveal-address').hasClass('not-active')) {
        $('#reveal-address').removeClass('not-active');
    }
    if (!allChecked && !$('#reveal-address').hasClass('not-active')) {
        $('#reveal-address').addClass('not-active');
    }
}