var currentColor = "";
var allColors = ["#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#e74c3c", "#ecf0f1", "#e67e22"];
var playerSpeed = 3;

var motionBlur = false;
var crtOverlay = false;

var crtImage = new Image();
crtImage.src = "../img/overlay.png";

var viewPortX;
var viewPortY;

var SCREEN_game = new Screen(function() {
    // Draw on the black background
    if(motionBlur) {
        c.fillStyle = "rgba(0, 0, 0, 0.4)";
    } else {
        c.fillStyle = "black";
    }
    c.fillRect(0, 0, WIDTH, HEIGHT);

    var playerLocation = localPlayer.loc;
    
    // Work out what tile they're at
    viewPortX = -playerLocation.posX;
    viewPortY = -playerLocation.posY;

    // Set the color for this frame
    c.fillStyle = currentColor;
    c.strokeStyle = currentColor;

    // Render the bottom map
    var mapVertIndex = 1;
    currentMap.mapVertices.forEach(function(mapVert) {
        // Go to the correct pos
        var sPos = getScreenLoc(mapVert.x, mapVert.y);

        c.beginPath();

        c.moveTo(sPos.x, sPos.y);

        var otherVert = currentMap.mapVertices[mapVertIndex++];
        if (otherVert !== undefined) {
            var otherPoint = getScreenLoc(otherVert.x, otherVert.y);
            c.lineTo(otherPoint.x, otherPoint.y);
        }

        c.stroke();
    });

    c.save();

    // Calculate the direction that the player is facing
    var playerDeltaX = mouseX - (WIDTH / 2);
    var playerDeltaY = mouseY - (HEIGHT / 2);
    var playerRotation = Math.atan(playerDeltaY / playerDeltaX);

    // Calculate their next position
    var atan2PlayerRotation = Math.atan2(playerDeltaY, playerDeltaX);
    localPlayer.loc.add(Math.cos(atan2PlayerRotation) * playerSpeed, Math.sin(atan2PlayerRotation) * playerSpeed);

    socketManager.socket.emit("updatelocation", localPlayer.loc);

    // Add some particles
    for(var pc = 0; pc < getRandomInt(0, 3); pc++) {
        // Add a particle
        particles.push(new Particle(getRandomInt(1, 3), getRandomInt(1, 5), getRandomInt(100, 500),
            localPlayer.loc.posX - Math.cos(atan2PlayerRotation) * 52, localPlayer.loc.posY - Math.sin(atan2PlayerRotation) * 52,
            -Math.cos(atan2PlayerRotation) + ((getRandomInt(1, 100) - 50) / 100), -Math.sin(atan2PlayerRotation) + ((getRandomInt(1, 100) - 50) / 100)));
    }

    c.translate(WIDTH / 2, HEIGHT / 2);
    c.rotate(playerRotation);

    // Flip X
    if(mouseX > WIDTH / 2) {
        c.scale(1, -1);
    }

    if(playerDeltaX < 0){
        c.scale(-1, 1);
    } else {
        c.scale(1, -1);
    }
    c.translate(-(WIDTH / 2), -(HEIGHT / 2));

    var spaceShipSize = calculateShapeMaxSize(Shape.SPACESHIP);
    drawPredefinedShape(Shape.SPACESHIP, WIDTH / 2 - spaceShipSize.width / 2, HEIGHT / 2 - spaceShipSize.height / 2);

    c.restore();

    // Render particles
    particles.forEach(function(particle) {
        var sPos = getScreenLoc(particle.x, particle.y);

        if(isOnScreen(sPos.x, sPos.y))
            c.fillRect(sPos.x, sPos.y, particle.size, particle.size);
    });

    // Render stars
    currentMap.stars.forEach(function(star) {
        var sPos = getScreenLoc(star.x, star.y);

        if(isOnScreen(sPos.x, sPos.y))
            drawPredefinedShape(Shape.STAR, sPos.x, sPos.y);
    });

    // CRT overlay
    if(crtOverlay) {
        c.drawImage(crtImage, 0, 0, WIDTH, HEIGHT);
    }

    // Draw on text
    c.fillStyle = "white";
    c.font = "30px 'Montserrat'";
    centerText("[ 100% ] [ 100 / 100 ] [ 100% ]", HEIGHT - 50);
});

setInterval(function(){
    currentColor = allColors[getRandomInt(0, allColors.length)];
}, 1000 / 15);

function drawPredefinedShape(shape, x, y) {
    // Loop through the verts.
    var shapeVertIndex = 1;
    shape.forEach(function(shapeVert) {
        c.beginPath();
        c.moveTo(x + shapeVert.x, y + shapeVert.y);

        var otherVert = shape[shapeVertIndex++];
        if(otherVert !== undefined) {
            c.lineTo(x + otherVert.x, y + otherVert.y);
        }

        c.stroke();
    });
}

var Shape = {
    SPACESHIP: [
        {x: 0, y: 10},
        {x: 0, y: 20},
        {x: 10, y: 20},
        {x: 10, y: 30},
        {x: 0, y: 30},
        {x: 0, y: 40},
        {x: 10, y: 40},
        {x: 10, y: 50},
        {x: 60, y: 50},
        {x: 60, y: 40},
        {x: 120, y: 40},
        {x: 120, y: 30},
        {x: 110, y: 30},
        {x: 110, y: 20},
        {x: 40, y: 20},
        {x: 40, y: 10},
        {x: 30, y: 10},
        {x: 30, y: 0},
        {x: 10, y: 0},
        {x: 10, y: 10},
        {x: 0, y: 10}
    ],
    STAR: [
        {x: 50, y: 0},
        {x: 60, y: 40},
        {x: 100, y: 50},
        {x: 60, y: 60},
        {x: 50, y: 100},
        {x: 40, y: 60},
        {x: 0, y: 50},
        {x: 40, y: 40},
        {x: 50, y: 0}
    ]
};

function calculateShapeMaxSize(shape) {
    var maxX = 0, maxY = 0;

    shape.forEach(function(vert) {
        if(vert.x > maxX)
            maxX = vert.x;
        if(vert.y > maxY)
            maxY = vert.y;
    });

    return {width: maxX, height: maxY};
}

function isOnScreen(x, y) {
    return (x > 0 && x < WIDTH && y > 0 && y < HEIGHT);
}

function getScreenLoc(x, y) {
    return {x: viewPortX + (WIDTH / 2) + x, y: viewPortY + (HEIGHT / 2) + y};
}