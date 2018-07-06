function GameMap() {
    this.stars = [];
    this.mapVertices = [];

    // Gen the map vertices
    for(var x = 0; x < 50; x++) {
        this.mapVertices.push({x: x * 100, y: getRandomInt(0, 100)});
    }
}

var currentMap = new GameMap();

function addStar() {
    // Add a star
    currentMap.stars.push({x: getRandomInt(0, 1000), y: getRandomInt(0, 1000), health: 100});

    setTimeout(addStar, getRandomInt(500, 5000));
}

addStar();