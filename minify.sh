#!/usr/bin/env bash

uglifyjs \
    public/js/util.js \
    public/js/particle.js \
    public/js/input.js \
    public/js/map.js \
    public/js/screen.js \
    public/js/entities.js \
    public/js/socket.js \
    public/js/gamescreens/gamescreen.js \
    public/js/game.js \
    -o public/js/out/game.min.js -c -m

echo "Minified & compressed game to 'public/js/out/game.min.js'"