const translations = {
    es: {
        role_qa_lead: "QA Lead/Dev",
        role_automation: "Automatización",
        role_devops: "DevOps",
        nav_about: "Sobre mí",
        nav_experience: "Experiencia",
        nav_projects: "Proyectos",
        nav_skills: "Habilidades",
        nav_contact: "Contacto",
        about_title: "Sobre mí",
        about_text: "Ingeniero de pruebas con experiencia en <strong>automatización</strong>, análisis de bugs y gestión de equipos QA. Apasionado por construir software de calidad mediante metodologías ágiles, herramientas modernas y cultura DevOps.",
        exp_title: "Experiencia Profesional",
        exp_job1_company: "Grupo TI México",
        exp_job1_role: "QA Lead",
        exp_job1_date: "2022 – Actualidad",
        exp_job1_desc1: "Gestión de pruebas de regresión y recursos.",
        exp_job1_desc2: "Automatización de pruebas con Selenium y Appium.",
        exp_job1_desc3: "Validación de cambios en código y análisis de bugs.",
        exp_job2_company: "Getic",
        exp_job2_role: "QA Engineer",
        exp_job2_date: "2016 – 2022",
        exp_job2_desc1: "Ejecución de pruebas manuales y automatizadas.",
        exp_job2_desc2: "Documentación y análisis de defectos.",
        exp_job2_desc3: "Colaboración en validación de código y mejoras en procesos.",
        proj_title: "Proyectos Destacados",
        proj1_title: "IA QA XPOS",
        proj1_company: "Grupo TI México · Proyecto Interno",
        proj1_desc: "Sistema de inteligencia artificial con RAG (Retrieval Augmented Generation) diseñado para asistir al equipo de QA. Integra base de conocimiento propia y modelo LLM optimizado para consultas de pruebas, análisis de bugs y generación de casos de prueba.",
        proj2_title: "Generador Automático de Evidencias",
        proj2_company: "Grupo TI México",
        proj2_badge: "Optimización",
        proj2_desc: "Herramienta para la generación y descarga automática de evidencias y documentación de pruebas en formato PDF estructurado. Automatizó un proceso completamente manual eliminando cuellos de botella en el ciclo de QA.",
        proj2_impact_before: "antes",
        proj2_impact_now: "ahora",
        proj2_impact_pill: "⚡ 98% reducción de tiempo",
        proj3_title: "Automatización Desatendida en VMs",
        proj3_company: "Grupo TI México",
        proj3_desc: "Desarrollo de scripts para la configuración y ejecución de suites de pruebas automatizadas en máquinas virtuales sin intervención humana. Permitió que las pruebas corran en horario extendido sin depender de sesiones activas.",
        proj3_impact_coverage: "cobertura diaria",
        proj3_impact_pill1: "🔄 Ejecución desatendida",
        proj3_impact_pill2: "🖥️ Multi-VM",
        skills_title: "Habilidades Técnicas",
        contact_title: "Contacto",
        footer_text: "© 2011 Iram Coré Guerrero · QA Lead · Hecho con "
    },
    en: {
        role_qa_lead: "QA Lead/Dev",
        role_automation: "Automation",
        role_devops: "DevOps",
        nav_about: "About Me",
        nav_experience: "Experience",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_contact: "Contact",
        about_title: "About Me",
        about_text: "Test Engineer experienced in <strong>automation</strong>, bug analysis, and QA team management. Passionate about building quality software through agile methodologies, modern tools, and DevOps culture.",
        exp_title: "Professional Experience",
        exp_job1_company: "Grupo TI México",
        exp_job1_role: "QA Lead",
        exp_job1_date: "2022 – Present",
        exp_job1_desc1: "Management of regression testing and resources.",
        exp_job1_desc2: "Test automation with Selenium and Appium.",
        exp_job1_desc3: "Code change validation and bug analysis.",
        exp_job2_company: "Getic",
        exp_job2_role: "QA Engineer",
        exp_job2_date: "2016 – 2022",
        exp_job2_desc1: "Execution of manual and automated testing.",
        exp_job2_desc2: "Documentation and defect analysis.",
        exp_job2_desc3: "Collaboration on code validation and process improvements.",
        proj_title: "Featured Projects",
        proj1_title: "AI QA XPOS",
        proj1_company: "Grupo TI México · Internal Project",
        proj1_desc: "Artificial intelligence system with RAG (Retrieval Augmented Generation) designed to assist the QA team. Integrates a proprietary knowledge base and optimized LLM model for testing queries, bug analysis, and test case generation.",
        proj2_title: "Automated Evidence Generator",
        proj2_company: "Grupo TI México",
        proj2_badge: "Optimization",
        proj2_desc: "Tool for the automatic generation and download of test evidence and documentation in structured PDF format. Automated a completely manual process, eliminating bottlenecks in the QA cycle.",
        proj2_impact_before: "before",
        proj2_impact_now: "now",
        proj2_impact_pill: "⚡ 98% time reduction",
        proj3_title: "Unattended VM Automation",
        proj3_company: "Grupo TI México",
        proj3_desc: "Development of scripts for the configuration and execution of automated test suites in virtual machines without human intervention. Allowed tests to run during extended hours without relying on active sessions.",
        proj3_impact_coverage: "daily coverage",
        proj3_impact_pill1: "🔄 Unattended execution",
        proj3_impact_pill2: "🖥️ Multi-VM",
        skills_title: "Technical Skills",
        contact_title: "Contact",
        footer_text: "© 2011 Iram Coré Guerrero · QA Lead · Made with "
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    const langText = langBtn?.querySelector('.lang-text');
    let currentLang = localStorage.getItem('language') || 'es';

    const updateLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        if (langText) {
            langText.textContent = lang === 'es' ? 'ES | en' : 'EN | es';
        }

        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    };

    // Inicializar idioma
    updateLanguage(currentLang);

    // Event listener para el botón
    langBtn?.addEventListener('click', () => {
        updateLanguage(currentLang === 'es' ? 'en' : 'es');
    });
});
