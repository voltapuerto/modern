document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENÚ MÓVIL RESPONSIVE (DRAWER)
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       2. ANILLO MAGNÉTICO DEL CURSOR (NO BLOQUEA EL CURSOR NATIVO)
       ========================================================================== */
    const cursorRing = document.getElementById('cursor-ring');
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    magneticElements.forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            el.style.transform = 'translate(0px, 0px)';
        });
        el.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return;
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${relX * 0.12}px, ${relY * 0.12}px)`;
        });
    });

    /* ==========================================================================
       3. PARALLAX SUAVE EN EL HERO Y ORBES DE FONDO
       ========================================================================== */
    const heroTilt = document.getElementById('hero-tilt');
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 992) return;
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

        if (heroTilt) {
            heroTilt.style.transform = `rotateY(${xNorm * 3}deg) rotateX(${-yNorm * 3}deg)`;
        }
        if (orb1 && orb2) {
            orb1.style.transform = `translate(${xNorm * 35}px, ${yNorm * 35}px)`;
            orb2.style.transform = `translate(${-xNorm * 45}px, ${-yNorm * 45}px)`;
        }
    });

    /* ==========================================================================
       4. SIMULADOR INTERACTIVO DE SLA Y RIESGO DE FLOTA
       ========================================================================== */
    const chargerSlider = document.getElementById('charger-slider');
    const chargerCountVal = document.getElementById('charger-count-val');
    const riskVehicles = document.getElementById('risk-vehicles');

    if (chargerSlider) {
        chargerSlider.addEventListener('input', (e) => {
            const count = parseInt(e.target.value, 10);
            chargerCountVal.textContent = `${count} CARGADORES`;
            riskVehicles.textContent = `~${count * 3} Vehículos`;
        });
    }

    /* ==========================================================================
       5. CONSOLA INTERACTIVA DE PILARES (ESTILO FERALUI)
       ========================================================================== */
    const presetBtns = document.querySelectorAll('.preset-btn');
    const root = document.documentElement;
    const vizCode = document.getElementById('viz-code');
    const vizTitle = document.getElementById('viz-title');
    const vizDesc = document.getElementById('viz-desc');

    const themes = {
        emerald: {
            primary: '#0c4a3a',
            secondary: '#14b8a6',
            tertiary: '#1e3a5f',
            highlight: '#5eead4',
            code: 'PROTOCOLO // RESPUESTA RÁPIDA V REGIÓN',
            title: 'Técnicos en terreno en menos de 2 horas',
            desc: 'Camionetas de asistencia en terreno, taller en la V Región e inventario local de repuestos críticos para que ningún cargador espere días por atención.'
        },
        cyber: {
            primary: '#0f2942',
            secondary: '#38bdf8',
            tertiary: '#1e1b4b',
            highlight: '#7dd3fc',
            code: 'PROTOCOLO // TERMOGRAFÍA & MONITOREO REMOTO',
            title: 'Detección antes de que la flota se detenga',
            desc: 'Inspección periódica con cámaras termográficas y analizadores de redes para detectar puntos calientes antes de que interrumpan la carga nocturna.'
        },
        amber: {
            primary: '#451a03',
            secondary: '#f59e0b',
            tertiary: '#0c4a3a',
            highlight: '#fbbf24',
            code: 'PROTOCOLO // CUMPLIMIENTO SEC & RIC N°15',
            title: 'Instalación Llave en Mano + Declaración TE6',
            desc: 'Equipo 100% calificado y autorizado por la SEC bajo el pliego técnico RIC N°15 para infraestructuras de recarga de alta potencia.'
        }
    };

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selected = themes[btn.dataset.theme];
            if (selected) {
                root.style.setProperty('--orb-primary', selected.primary);
                root.style.setProperty('--orb-secondary', selected.secondary);
                root.style.setProperty('--orb-tertiary', selected.tertiary);
                root.style.setProperty('--accent-highlight', selected.highlight);
                vizCode.textContent = selected.code;
                vizTitle.textContent = selected.title;
                vizDesc.textContent = selected.desc;
            }
        });
    });

    /* ==========================================================================
       6. FORMULARIO DE DIAGNÓSTICO GRATUITO
       ========================================================================== */
    const diagForm = document.getElementById('diag-form');
    const formFeedback = document.getElementById('form-feedback');
    if (diagForm) {
        diagForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.style.display = 'block';
            diagForm.reset();
        });
    }

    /* ==========================================================================
       7. REVELADO SUAVE AL HACER SCROLL
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       8. RELOJ EN TIEMPO REAL VALPARAÍSO
       ========================================================================== */
    const timeDisplay = document.getElementById('local-time');
    const updateClock = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false });
        if (timeDisplay) timeDisplay.textContent = `VALPARAÍSO, CL — ${timeString}`;
    };
    updateClock();
    setInterval(updateClock, 30000);
});