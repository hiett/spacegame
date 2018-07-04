/* global Screen */
/* global localPlayer */
/* global c */

var SCREEN_game = new Screen(function() {
    var playerLocation = localPlayer.loc;
    
    // Work out what tile they're at
    var viewPortX = -playerLocation.posX;
    var viewPortY = -playerLocation.posY;
    
    // Draw a test box.
    c.fillStyle = "red";
    c.fillRect(viewPortX, viewPortY, 100, 100);
});