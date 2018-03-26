$('.popup').css({ 'display': 'none' });

var loginBox = $('#boxLogin');
var perfilBox = $('#boxPerfil');

var animSpeed = .5;
var flagOpenedPop = false;

//out
var outAnim = function () {
    TweenMax.to(loginBox, animSpeed, {
        scale: 0,
        autoAlpha: 0,
        ease: Back.easeIn.config(1),
        onComplete:inAnim,
    })
};

//in
var inAnim = function () {
    perfilBox.css({ 'display': 'block' });
    $('#popups').css({ 'display': 'block' });

    TweenMax.fromTo(perfilBox, animSpeed,
        {
            scale: 0,
            autoAlpha: 0,
        },
        {
            scale: 1,
            autoAlpha: 1,
            ease: Back.easeOut.config(1),
        })
};

//message box
var animPop = function (popName) {
    var pop = $('#' + popName);

    if (flagOpenedPop) {
        flagOpenedPop = false;

        $('.blurish').addClass('blurOut');
        $('.blurish').removeClass('blurIn');

        toggleBlocker()

        TweenMax.to(pop, animSpeed,
            {
                scale: 0,
                autoAlpha: 0,
                ease: Back.easeIn.config(1),
                onComplete: hidePopups,
            })
    } else {
        flagOpenedPop = true;

        $('.blurish').removeClass('blurOut');
        $('.blurish').addClass('blurIn');

        pop.css({ 'display': 'block' });

        toggleBlocker()

        TweenMax.fromTo(pop, animSpeed,
            {
                scale: 0,
                autoAlpha: 0,
            },
            {
                scale: 1,
                autoAlpha: 1,
                ease: Back.easeOut.config(1),
            })
    }
};

function toggleBlocker() {
    var blockerVis=$('#blocker').css('display');
    if(blockerVis=='none'){
        $('#blocker').css({ 'display': 'block' });
        $('#popups').css({ 'display': 'block' });
    }else{
        $('#blocker').css({ 'display': 'none' });
    }
};

function hidePopups() {
    $('#popups').css({ 'display': 'none' });
}
