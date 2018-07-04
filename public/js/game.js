var canvas = null;
var c = null;

var WIDTH = 0;
var HEIGHT = 0;

var gameScreens = [
    SCREEN_game
];
var currentScreenIndex = 0;

function init() {
    canvas = document.getElementById("gameCanvas");
    
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    
    c = canvas.getContext("2d");
    
    setInterval(mainDraw, 1000 / 60);
}

function mainDraw() {
    if(currentScreenIndex !== -1) {
        gameScreens[currentScreenIndex].drawCallback();
    } else {
        c.fillStyle = "black";
        c.clearRect(0, 0, WIDTH, HEIGHT);
        
        c.fillStyle = "white";
        
        c.font = "50px 'Montserrat'";
        centerText("LOADING GAME", HEIGHT / 2);
        c.font = "24px 'Montserrat'";
        centerText("Developed by Scott Hiett", HEIGHT - 50);
    }
}

function centerText(text, yPos) {
    c.fillText(text, (WIDTH / 2) - (c.measureText(text).width / 2), yPos);
}