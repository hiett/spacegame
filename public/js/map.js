function GameMap() {
    this.stars = [];
    this.mapVertices = [];

    // Gen the map vertices
    for(var x = 0; x < 50; x++) {
        this.mapVertices.push({x: x * 100, y: getRandomInt(0, 100)});
    }
}

var currentMap = new GameMap();