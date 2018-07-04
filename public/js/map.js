function GameMap(rawMapData, tileCache, width, height) {
    this.rawMapData = rawMapData;
    this.tileCache = tileCache;
    this.width = width;
    this.height = height;
    
    this.getTileIdAt = function(x, y) {
        return this.rawMapData[y * this.width + x];  
    };
    
    this.getTileAt = function(x, y) {
        return this.tileCache[this.getTileIdAt(x, y)];
    };
    
    this.getTileTextureAt = function(x, y) {
        return this.getTileAt(x, y).texture;
    };
}

function GameTile(texture, boundry) {
    this.texture = texture;
    this.boundry = boundry;
}

function GameTileBoundry(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.bottomRightX = bottomRightX;
    this.bottomRightY = bottomRightY;
}

// Create a dummy gamemap
var currentGameMap = new GameMap([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
], [
    new GameTile("", new GameTileBoundry(0, 0, 1, 1))    
], 10, 5);