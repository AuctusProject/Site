(function($) {
    "use strict"; // Start of use strict    

    var interval = setInterval(onTimer, 1000);

    function onTimer() {
        var presaleDate = Date.UTC(2017, 8, 30, 14);
        
        var diff = presaleDate - new Date().getTime();
        if (diff < 0) {
            updateCountdown(0, 0, 0, 0);
            clearInterval(interval);
        }
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

        updateCountdown(days, hours, mins, seconds);
    };

    function updateCountdown(days, hours, minutes, seconds) {
        $(".time-part.days .time-value").html(days);
        $(".time-part.hours .time-value").html(hours);
        $(".time-part.minutes .time-value").html(minutes);
        $(".time-part.seconds .time-value").html(seconds);
    };

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
