function SocketManager() {
    this.socket = io();

    this.socket.on("addstar", function(star) {
        currentMap.stars.push(star);
    });

    this.socket.on("killstar", function(data) {
        var star = data.star;
        var newStarArray = data.starArray;

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

    this.socket.on("addplayer", function(player) {
        players.push(player);
    });

    this.socket.on("updateotherlocation", function(newData) {
        players.forEach(function(pl) {
            if(pl.uuid === newData.uuid) {
                pl.x = newData.x;
                pl.y = newData.y;
                pl.rotation = newData.rotation;
            }
        });
    });

    this.socket.on("removeplayer", function(toRemoveUUID) {
        // Find the player that has this uuid and remove them
        players.splice(players.indexOf(getPlayerFromUUID(toRemoveUUID)), 1);
    });
}