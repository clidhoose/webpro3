const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const balls = [];
const numBalls = 20;
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1'];

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (distance(this.x, this.y, balls[i].x, balls[i].y) < this.radius + balls[i].radius) {
                this.color = colors[Math.floor(Math.random() * colors.length)];
                balls[i].color = colors[Math.floor(Math.random() * colors.length)];
            }
        }

        this.draw();
    }
}

function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function init() {
    for (let i = 0; i < numBalls; i++) {
        const radius = 20;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.update());
}

init();
animate();