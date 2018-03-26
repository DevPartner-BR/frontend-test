var limx = 2650;
var speedInic = .15;
var wWidth = $(window).width();
var intervalLoop;

var objs = [[$('#curve1'), randomSpeed(), randomDir()], [$('#curve2'), randomSpeed(), randomDir()]];

init();

function init() {
    objs[0][0].offset({ left: -wWidth / 2 });
    objs[1][0].offset({ left: -wWidth / 2 });
    intervalLoop = setInterval(loop, 50);
}

function loop() {
    for (n = 0; n <= 1; n++) {
        posX = objs[n][0].offset().left - (objs[n][1] * objs[n][2]);
        objs[n][0].offset({ left: posX })

        if (posX < -(limx - wWidth - 10)) {
            objs[n][2] *= -1;
            objs[n][1] = randomSpeed();
            objs[n][0].offset({ left: -(limx - wWidth - 10) });
        }

        if (posX > -10) {
            objs[n][2] *= -1;
            objs[n][1] = randomSpeed();
            objs[n][0].offset({ left: -10 });
        }
    }
}

$(window).resize(function () {
    wWidth = $(window).width();
    clearInterval(intervalLoop);
    init();
});

function randomSpeed() {
    var newSpeed = speedInic + (Math.random() * .5);
    return newSpeed;
}

function randomDir() {
    var rdn = Math.random();
    if (rdn > .5) {
        return -1;
    } else {
        return 1;
    }
}