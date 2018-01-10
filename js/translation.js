(function ($) {

    var languageCookie = getCookie("selected-language")
    if (languageCookie)
        changeLanguage(languageCookie);

})(jQuery); // End of use strict

function changeLanguage(language) {
    $("#translation").remove();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../translation/" + language + ".json?v=" + new Date().getTime();
    s.id = "translation";
    $("head").append(s);
    $(".language").text($('#' + language).text());
    
    for (var section in i18nData) {
        sectionData = i18nData[section]
        for (var key in sectionData) {
            keyData = sectionData[key];
            domElements = $("." + section + " [i18n='" + key + "']");
            if (typeof keyData == "string") {
                domElements.each(function () { $(this).text(keyData); });
            }
            else {
                for (var attribute in keyData) {
                    domElements.each(function () { $(this).attr(attribute, keyData[attribute]); });
                }
            }
        }
    }
    updateBulletsPanel($(".bullets-container > span").first())
    setCookie("selected-language",language)
}

function showTranslateBox() {
    $('.language-box').toggleClass('hide');
    $('.drop-arrow').toggleClass('fa-caret-down');
    $('.drop-arrow').toggleClass('fa-caret-up');
    $('.top-header').toggleClass('large-header');
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}