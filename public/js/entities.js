function Location(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    
    this.add = function(x, y) {
        this.posX += x;
        this.posY += y;
    };
    
    this.subtract = function(x, y) {
        this.add(-x, -y);
    };
}

function Player() {
    this.uuid = "";
    this.name = "";
    this.loc = new Location(0, 0);
}

var localPlayer = new Player();
localPlayer.name = "You";
localPlayer.uuid = "1";

var players = [];