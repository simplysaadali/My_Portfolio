/* =============================================
   PARTICLE BACKGROUND
============================================= */
(function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 80;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function Particle() {
        this.x    = Math.random() * canvas.width;
        this.y    = Math.random() * canvas.height;
        this.r    = Math.random() * 2 + 0.5;
        this.dx   = (Math.random() - 0.5) * 0.5;
        this.dy   = (Math.random() - 0.5) * 0.5;
        this.hue  = Math.random() > 0.5 ? 195 : 270; // cyan or purple
        this.alpha = Math.random() * 0.6 + 0.2;
    }

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
        ctx.fill();
    };

    Particle.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width)  this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.dy *= -1;
    };

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    animate();
})();


/* =============================================
   TYPING ANIMATION
============================================= */
(function () {
    const el    = document.getElementById('typed-text');
    const words = ['Saad Ali', 'a Developer', 'an AI Enthusiast', 'a Problem Solver'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function type() {
        const word = words[wIdx];
        if (!deleting) {
            el.textContent = word.slice(0, ++cIdx);
            if (cIdx === word.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            el.textContent = word.slice(0, --cIdx);
            if (cIdx === 0) {
                deleting = false;
                wIdx = (wIdx + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }

    type();
})();


/* =============================================
   SCROLL REVEAL
============================================= */
(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* =============================================
   ADD RECOMMENDATION
============================================= */
function addRecommendation() {
    const name  = document.getElementById('recommendName').value;
    const title = document.getElementById('recommendTitle').value;
    const text  = document.getElementById('recommendText').value;

    const newCard = document.createElement('div');
    newCard.className = 'recommendation-card recommendation';
    newCard.innerHTML = `
        <div class="recommendation-header">
            <div class="quote-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.9996 4C9.2372 4 6.99961 6.2376 6.99961 9C6.99961 11.7624 9.2372 14 11.9996 14V20C8.686 20 5.522 18.536 3.372 16.017C1.222 13.498 0.295 10.19 0.878 6.964C1.461 3.74 3.5 1 6.4 1C9.3 1 12 3.273 12 4Z" opacity="0.4"/>
                    <path d="M24 4C21.237 4 19 6.2376 19 9C19 11.7624 21.237 14 24 14V20C20.686 20 17.522 18.536 15.372 16.017C13.222 13.498 12.295 10.19 12.878 6.964C13.461 3.74 15.5 1 18.4 1C21.3 1 24 3.273 24 4Z" opacity="0.4"/>
                </svg>
            </div>
        </div>
        <p class="recommendation-text">"${text}"</p>
        <div class="recommendation-author">
            <div class="author-info">
                <h4>${name}</h4>
                <p>${title}</p>
            </div>
        </div>
    `;

    // Animate in
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(30px)';
    newCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    document.getElementById('recommendationsContainer').appendChild(newCard);
    document.getElementById('recommendationForm').reset();

    // Trigger animation
    setTimeout(() => {
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 50);

    // Show popup only when a new recommendation is submitted
    showPopup(true);
}

document.getElementById('recommendationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addRecommendation();
});


/* =============================================
   POPUP
============================================= */
function showPopup(isNew) {
    if (isNew) {
        document.getElementById('popupModal').style.display = 'flex';
    }
}

function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
}

document.querySelector('.close-btn').addEventListener('click', closePopup);

window.addEventListener('click', function (event) {
    const modal = document.getElementById('popupModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


/* =============================================
   HOME ICON — SCROLL TO TOP
============================================= */
document.getElementById('homeIcon').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
