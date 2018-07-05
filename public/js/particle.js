function Particle(size, speed, ttl, x, y, directionX, directionY) {
    this.size = size;
    this.ttl = ttl;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.id = guid(); // Make it unique.
    this.dead = false;

    this.addPos = function(aPosX, aPosY) {
        this.x += aPosX;
        this.y += aPosY;
    };

    setTimeout(() => {
        // Delete itself.
        this.dead = true;
        particles.splice(particles.indexOf(this), 1);
    }, this.ttl);
}

var particles = [];

setInterval(function() {
    particles.forEach(function(particle) {
        particle.addPos(particle.directionX * particle.speed, particle.directionY * particle.speed);
    });
}, 1000 / 120);