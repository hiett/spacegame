const express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let players = [];
let stars = [];

const starWidth = 100;

io.on("connection", function(socket) {
    let player = {uuid: guid(), socket: socket, x: 0, y: 0, rotX: 0, rotY: 0};

    players.push(player);
    console.log("Player has connected.");

    socket.emit("setuuid", player.uuid);

    players.forEach(function(p) {
        if(p.uuid !== player.uuid) {
            socket.emit("addplayer", {uuid: p.uuid, x: p.x, y: p.y, rotX: p.rotX, rotY: p.rotY});
        }
    });

    broadcastWithout("addplayer", {uuid: player.uuid, x: player.x, y: player.y, rotX: player.rotX, rotY: player.rotY}, player);

    socket.on("updatelocation", function(locData) {
        player.x = locData.posX;
        player.y = locData.posY;

        broadcastWithout("updateotherlocation", {uuid: player.uuid, x: player.x, y: player.y}, player);
    });

    socket.on("shoot", function(x, y, dx, dy) {
        // Calculate hit detection
        calculateHitDetection(x, y, dx, dy, function(star) {
            stars.splice(stars.indexOf(star), 1);

            socket.emit("awardpoints", 500);
            broadcastPacket("killstar", {star: star, starArray: stars});
        });
    });

    socket.on("disconnect", function() {
        // They've disconnected. Remove them from the pool.
        console.log("Player has disconnected.");
        players.splice(player, 1);
    });
});

function calculateHitDetection(x, y, dx, dy, callback) {
    // Loop through the path for 2000 times until it hits something
    // particle.addPos(particle.directionX * particle.speed, particle.directionY * particle.speed);

    let complete = false;

    for(let times = 0; times < 2000; times++) {
        // Calculate the next location
        x += dx;
        y += dy;

        // Check if this collides with something
        stars.forEach(function(star) {
            if(x > star.x && x < star.x + starWidth && y > star.y && y < star.y + starWidth && !complete) {
                complete = true;

                callback(star);
            }
        });
    }
}

// Periodically add stars
setInterval(function() {
    // Add a star
    let star = {x: getRandomInt(0, 1000), y: getRandomInt(0, 1000), health: 100, uuid: guid()};
    stars.push(star);

    broadcastPacket("addstar", star);
}, 3000);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function broadcastPacket(name, data) {
    players.forEach(function(player) {
        player.socket.emit(name, data);
    });
}

function broadcastWithout(name, data, without) {
    players.forEach(function(player) {
        if(player.uuid !== without.uuid)
            player.socket.emit(name, data);
    });
}

app.use(express.static("public"));

server.listen(process.env.PORT || 3000);