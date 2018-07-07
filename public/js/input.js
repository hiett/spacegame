var mouseX = 0;
var mouseY = 0;

var keys = [];

function registerEvents() {
    canvas.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, false);

    canvas.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;

        if(e.keyCode === 65) {
            ParticleEffect.BIG_EXPLOSION(localPlayer.loc.posX, localPlayer.loc.posY);
        }

        if(e.keyCode === 32) {
            // Shoot
            var playerDeltaX = mouseX - (WIDTH / 2);
            var playerDeltaY = mouseY - (HEIGHT / 2);

            var atan2PlayerRotation = Math.atan2(playerDeltaY, playerDeltaX);
            // localPlayer.loc.add(Math.cos(atan2PlayerRotation) * playerSpeed, Math.sin(atan2PlayerRotation) * playerSpeed);

            socketManager.socket.emit("shoot", localPlayer.loc.posX, localPlayer.loc.posY, Math.cos(atan2PlayerRotation),
                Math.sin(atan2PlayerRotation));

            ParticleEffect.SHOOT(localPlayer.loc.posX, localPlayer.loc.posY, Math.cos(atan2PlayerRotation),
                Math.sin(atan2PlayerRotation));
        }
    });

    canvas.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });
}