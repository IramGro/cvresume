
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
            lenis.scrollTo(target, { offset: -30, duration: 1.6 });
        }
    });
});


const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Delay escalonado para efecto cascada
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


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


    document.querySelectorAll('a, button, .skill, .job, .contact-card').forEach(el => {
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


document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const iconMoon = toggleBtn?.querySelector('.icon-moon');
    const iconSun  = toggleBtn?.querySelector('.icon-sun');

    const applyDark = (enabled) => {
        body.classList.toggle('dark-mode', enabled);
        if (iconMoon && iconSun) {
            iconMoon.style.display = enabled ? 'none'  : 'block';
            iconSun.style.display  = enabled ? 'block' : 'none';
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


const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnim {
        to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
`;

document.head.appendChild(style);
