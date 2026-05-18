/**
 * CV Premium — script.js
 * Lenis Smooth Scroll + Reveal + Cursor + Nav Dots + Dark Mode
 * + Reading Progress + Top Navbar + Typing + Skill Bars + Toast
 */

/* ─── 1. Lenis Smooth Scroll ─────────────────────────────── */
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function lenisRAF(time) {
    lenis.raf(time);
    requestAnimationFrame(lenisRAF);
}
requestAnimationFrame(lenisRAF);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -70, duration: 1.6 });
        }
    });
});

/* ─── 2. Reveal on Scroll ─────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('visible'); }, i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── 3. Custom Cursor ────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let follX = 0, follY = 0;

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    (function animFollower() {
        follX += (mouseX - follX) * 0.12;
        follY += (mouseY - follY) * 0.12;
        cursorFollower.style.left = follX + 'px';
        cursorFollower.style.top  = follY + 'px';
        requestAnimationFrame(animFollower);
    })();

    document.querySelectorAll('a, button, .skill, .job, .contact-card, .edu-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width  = '16px';
            cursor.style.height = '16px';
            cursorFollower.style.width   = '52px';
            cursorFollower.style.height  = '52px';
            cursorFollower.style.opacity = '0.25';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width  = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width   = '36px';
            cursorFollower.style.height  = '36px';
            cursorFollower.style.opacity = '0.5';
        });
    });
}

/* ─── 4. Dark Mode ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const iconMoon = toggleBtn?.querySelector('.icon-moon');
    const iconSun  = toggleBtn?.querySelector('.icon-sun');
    const iconMoonH = document.querySelector('.icon-moon-h');
    const iconSunH  = document.querySelector('.icon-sun-h');

    const applyDark = (enabled) => {
        body.classList.toggle('dark-mode', enabled);
        if (iconMoon && iconSun) {
            iconMoon.style.display = enabled ? 'none'  : 'block';
            iconSun.style.display  = enabled ? 'block' : 'none';
        }
        if (iconMoonH && iconSunH) {
            iconMoonH.style.display = enabled ? 'none'  : 'block';
            iconSunH.style.display  = enabled ? 'block' : 'none';
        }
        localStorage.setItem('dark-mode', enabled ? 'enabled' : 'disabled');
    };

    const saved = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDark(saved === 'enabled' || (saved === null && prefersDark));

    toggleBtn?.addEventListener('click', () => {
        applyDark(!body.classList.contains('dark-mode'));
    });
});

/* ─── 5. Floating Nav Dots — Active State ─────────────────── */
const sections = document.querySelectorAll('main section[id]');
const navDots  = document.querySelectorAll('.nav-dot');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navDots.forEach(dot => {
                dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── 6. Skill Tags — Ripple Effect ──────────────────────── */
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 60px; height: 60px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleAnim 0.5s ease-out forwards;
            left: ${e.offsetX}px; top: ${e.offsetY}px;
            pointer-events: none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const styleRipple = document.createElement('style');
styleRipple.textContent = `@keyframes rippleAnim { to { transform: translate(-50%, -50%) scale(3); opacity: 0; } }`;
document.head.appendChild(styleRipple);

/* ─── 7. Reading Progress Bar ────────────────────────────── */
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(pct));
    }, { passive: true });
}

/* ─── 8. Top Navbar — show after header ──────────────────── */
const topNavbar = document.getElementById('top-navbar');
if (topNavbar) {
    const headerEl = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const headerBottom = headerEl ? headerEl.offsetHeight : 300;
        if (scrollY > headerBottom) {
            topNavbar.classList.add('visible');
        } else {
            topNavbar.classList.remove('visible');
        }
    }, { passive: true });
}

/* ─── 9. Typing Animation ────────────────────────────────── */
const typingEl = document.getElementById('typing-subtitle');
if (typingEl) {
    const phrases = [
        'QA Lead / Sr. Dev',
        'Automation Engineer',
        'DevOps Practitioner',
        'IA & RAG Developer',
    ];
    let pi = 0, ci = 0, deleting = false;

    const textNode = document.createTextNode('');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor-blink';
    typingEl.appendChild(textNode);
    typingEl.appendChild(cursorSpan);

    function typeLoop() {
        const phrase = phrases[pi];
        if (!deleting) {
            ci++;
            textNode.textContent = phrase.slice(0, ci);
            if (ci === phrase.length) {
                setTimeout(() => { deleting = true; typeLoop(); }, 1800);
                return;
            }
        } else {
            ci--;
            textNode.textContent = phrase.slice(0, ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
        }
        setTimeout(typeLoop, deleting ? 40 : 80);
    }
    setTimeout(typeLoop, 800);
}

/* ─── 10. Animated Skill Bars ────────────────────────────── */
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pct = entry.target.getAttribute('data-pct') || '0';
                entry.target.style.width = pct + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => barObserver.observe(bar));
}

/* ─── 11. Animated Counters ──────────────────────────────── */
function animateCounter(textNode, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start = Math.min(start + step, target);
        textNode.textContent = Math.floor(start);
        if (start >= target) clearInterval(timer);
    }, 16);
}

const impactNums = document.querySelectorAll('.impact-num');
if (impactNums.length) {
    const numObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const small = el.querySelector('small');
                const raw = el.textContent.replace(small ? small.textContent : '', '').trim();
                const target = parseFloat(raw);
                if (!isNaN(target)) {
                    // Clear and rebuild
                    el.innerHTML = '';
                    const tNode = document.createTextNode('0');
                    el.appendChild(tNode);
                    if (small) el.appendChild(small);
                    animateCounter(tNode, target, 900);
                }
                numObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    impactNums.forEach(n => numObserver.observe(n));
}

/* ─── 12. Toast — Copy Email ─────────────────────────────── */
const emailBtn = document.getElementById('email-copy-btn');
const toastEl  = document.getElementById('toast');

function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2800);
}

if (emailBtn && toastEl) {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('coreguerrero@gmail.com')
            .then(() => showToast('📋 Email copiado al portapapeles'))
            .catch(() => showToast('✉️ coreguerrero@gmail.com'));
    });
}