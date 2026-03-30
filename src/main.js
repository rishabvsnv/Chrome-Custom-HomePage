import { initClock } from "./modules/clock.js";
import { initTabs } from "./modules/tabs.js";
import { initTopSites } from "./modules/topSites.js";
import { initHistory } from "./modules/history.js";
import { initNotes } from "./modules/notes.js";
import { initSearch } from "./modules/search.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    initClock();
    initTabs();
    initSearch();
    await initTopSites();
    await initHistory();
    await initNotes();
  } catch (e) {
    console.error("App Init Error:", e);
  }
});

/* Neural network animation */
const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 90;
const MAX_DISTANCE = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;

    this.size = Math.random() * 2 + 1;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99,102,241,0.9)";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99,102,241,${1 - dist / MAX_DISTANCE})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.move();
    p.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

initParticles();
animate();