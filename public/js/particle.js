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
var cachedParticleSize = 0;

setInterval(function() {
    cachedParticleSize = particles.length;
}, 500);

setInterval(function() {
    particles.forEach(function(particle) {
        particle.addPos(particle.directionX * particle.speed, particle.directionY * particle.speed);
    });
}, 1000 / 120);

// Some predefined particle effects
var ParticleEffect = {
    BIG_EXPLOSION: function(x, y) {
        for(var i = 0; i < getRandomInt(100, 500); i++) {
            // Create a particle from the location and give it a random direction
            particles.push(new Particle(getRandomInt(1, 3), getRandomInt(1, 10), getRandomInt(500, 3000), x, y,
                (getRandomInt(0, 200) - 100) / 100, (getRandomInt(0, 200) - 100) / 100));
        }
    },
    SMALL_EXPLOSION: function(x, y) {
        for(var i = 0; i < getRandomInt(50, 200); i++) {
            // Create a particle from the location and give it a random direction
            particles.push(new Particle(getRandomInt(1, 3), getRandomInt(1, 10), getRandomInt(200, 1500), x, y,
                (getRandomInt(0, 200) - 100) / 100, (getRandomInt(0, 200) - 100) / 100));
        }
    },
    SHOOT: function (x, y, dx, dy) {
        var pCount = 0;

        var addShootParticle = function() {
            particles.push(new Particle(getRandomInt(1, 2), getRandomInt(10, 20), getRandomInt(500, 3000), x, y, dx, dy));

            if(pCount++ <= 30)
                setTimeout(addShootParticle, getRandomInt(1, 5));
        };

        addShootParticle();
    }
};