const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let words = document.querySelectorAll('.word');
let wordIndex = 0;

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -3 - 1;
        this.color = color;
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.05;
        this.life--;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFirework(x, y) {
    const numParticles = Math.random() * 80 + 50;
    const colors = ['#FF007F', '#FF8C00', '#FFD700', '#00FF00', '#00BFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createFirework(x, y);
    }

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

function triggerFireworkForWord(wordElement) {
    const rect = wordElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createFirework(x, y);
}

function displayNextWord() {
    if (wordIndex < words.length) {
        const word = words[wordIndex];
        word.style.opacity = 1; // Ensure word is visible
        triggerFireworkForWord(word);
        wordIndex++;
        setTimeout(displayNextWord, 500); // Delay next word's appearance
    }
}

animateFireworks();
displayNextWord();
