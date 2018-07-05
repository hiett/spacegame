const express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let players = [];

io.on("connection", function(socket) {
    let player = {socket: socket, x: 0, y: 0, rotX: 0, rotY: 0};

    players.push(player);
    console.log("Player has connected.");

    socket.on("updatelocation", function(locData) {
        player.x = locData.posX;
        player.y = locData.posY;
    });

    socket.on("disconnect", function() {
        // They've disconnected. Remove them from the pool.
        console.log("Player has disconnected.");
        players.splice(player, 1);
    });
});

app.use(express.static("public"));

server.listen(process.env.PORT || 3000);