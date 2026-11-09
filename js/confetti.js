// Lightweight celebration confetti generator
// Canvas-based, smooth 60fps, no external library required!

class ConfettiLauncher {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8', '#a29bfe', '#fab1a0', '#00cec9'];
  }

  initCanvas() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  launch(count = 120) {
    this.initCanvas();
    this.resize();

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * (0.2 + Math.random() * 0.6),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 15 - 5,
        size: Math.random() * 10 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        shape: Math.random() > 0.3 ? 'rect' : 'circle',
        opacity: 1
      });
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  animate() {
    if (this.particles.length === 0) {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.animationFrame = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.vRot;

      if (p.y > window.innerHeight * 0.7) {
        p.opacity -= 0.02;
      }

      if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

window.confettiLauncher = new ConfettiLauncher();
