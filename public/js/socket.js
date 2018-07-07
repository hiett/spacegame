function SocketManager() {
    this.socket = io();

    this.socket.on("addstar", function(star) {
        currentMap.stars.push(star);
    });

    this.socket.on("killstar", function(data) {
        let star = data.star;
        let newStarArray = data.starArray;

        ParticleEffect.SMALL_EXPLOSION(star.x + 50, star.y + 50); // Center it

        currentMap.stars = newStarArray;
    });

    this.socket.on("awardpoints", function(points) {
        currentScreenRenderPoints += points;
        currentPoints += points;

        var currentTotal = currentScreenRenderPoints;
        setTimeout(function() {
            if(currentScreenRenderPoints === currentTotal) {
                currentScreenRenderPoints = 0;
            }
        }, 3000);
    });

    this.socket.on("setuuid", function(uuid) {
        localPlayer.uuid = uuid;
    });
}