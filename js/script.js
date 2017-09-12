(function($) {
    "use strict"; // Start of use strict    

    var interval = setInterval(onTimer, 1000);

    function onTimer() {
        var presaleDate = Date.UTC(2017, 9, 3, 14);
        
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