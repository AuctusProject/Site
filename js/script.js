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

function joinWhitelist() {
    openNewTab("https://auctus.us16.list-manage2.com/subscribe?u=e6c2bc48f91f09fab4afe5bee&id=63a6a00141");
    registerClickEvent('JoinWhitelist');
    appendConversionPixel();
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

function appendConversionPixel() {
    if (typeof twttr !== 'undefined') twttr.conversion.trackPid('ny69l', { tw_sale_amount: 0, tw_order_quantity: 0 });
    if (typeof twttr !== 'undefined') twttr.conversion.trackPid('ny637', { tw_sale_amount: 0, tw_order_quantity: 0 });
    var i = new Image(); i.src = "https://alb.reddit.com/t.gif?q=CAAHAAABAAoACQAAAAAA6DArAA==&s=WZRd1JXnZRV1jlvXS-XxOhVvuUCEppJaeyGI1Xak6fs=";
    $('body').append('<img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id=ny69l&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />');
    $('body').append('<img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id=ny69l&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />');
    $('body').append('<img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id=ny637&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />');
    $('body').append('<img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id=ny637&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />');
    $('body').append('<img height="1" width="1" style="display:none" src="https://alb.reddit.com/t.gif?q=CAAHAAABAAoACQAAAAAA6DArAA==&s=WZRd1JXnZRV1jlvXS-XxOhVvuUCEppJaeyGI1Xak6fs=" />');    
}