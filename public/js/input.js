var mouseX = 0;
var mouseY = 0;

function registerEvents() {
    canvas.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, false);
}