// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for hero stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            // Add animation classes to service cards
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
            
            // Add animation to about section
            if (entry.target.classList.contains('about-text')) {
                entry.target.style.animation = 'fadeInLeft 0.8s ease forwards';
            }
            
            if (entry.target.classList.contains('about-visual')) {
                entry.target.style.animation = 'fadeInRight 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe hero section
    const hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    // Observe about section elements
    const aboutText = document.querySelector('.about-text');
    const aboutVisual = document.querySelector('.about-visual');
    
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(-50px)';
        observer.observe(aboutText);
    }
    
    if (aboutVisual) {
        aboutVisual.style.opacity = '0';
        aboutVisual.style.transform = 'translateX(50px)';
        observer.observe(aboutVisual);
    }
});

// Header background change on scroll and Back to Top button
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('backToTop');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
        } else {
            showNotification('Por favor, completa todos los campos.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : 'background: linear-gradient(45deg, #f44336, #da190b);'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Image Carousel functionality
let currentImageSet = 1;
const totalImageSets = 3;

function switchImageSet() {
    const currentSet = document.querySelector(`.image-set[data-set="${currentImageSet}"]`);
    currentSet.classList.remove('active');
    
    currentImageSet = currentImageSet >= totalImageSets ? 1 : currentImageSet + 1;
    
    const nextSet = document.querySelector(`.image-set[data-set="${currentImageSet}"]`);
    nextSet.classList.add('active');
}

// Start image carousel
setInterval(switchImageSet, 4000);

// Our Work Showcase
const workData = [
    {
        title: "Transporte de Carga",
        category: "Servicio Principal",
        description: "Movimiento seguro y eficiente de mercancías con nuestra flota moderna y personal especializado.",
        image: "images/imagen1.jpg",
        icon: "fas fa-truck-moving",
        stats: [{number: "500+", label: "Envíos/Mes"}, {number: "99%", label: "Puntualidad"}]
    },
    {
        title: "Almacenamiento",
        category: "Bodegas Seguras",
        description: "Instalaciones modernas y seguras para el resguardo óptimo de su mercancía con control de inventario.",
        image: "images/imagen2.jpg",
        icon: "fas fa-warehouse",
        stats: [{number: "10K+", label: "m² Disponibles"}, {number: "24/7", label: "Vigilancia"}]
    },
    {
        title: "Distribución",
        category: "Red Nacional",
        description: "Red de distribución eficiente que garantiza la entrega puntual en cualquier destino del país.",
        image: "images/imagen3.jpg",
        icon: "fas fa-route",
        stats: [{number: "100%", label: "Cobertura"}, {number: "48h", label: "Entrega Máx"}]
    },
    {
        title: "Logística Integral",
        category: "Soluciones Completas",
        description: "Servicios completos de logística que cubren toda la cadena de suministro de su empresa.",
        image: "images/imagen4.jpg",
        icon: "fas fa-cogs",
        stats: [{number: "360°", label: "Servicio"}, {number: "15+", label: "Años Exp"}]
    },
    {
        title: "Carga Especializada",
        category: "Manejo Experto",
        description: "Transporte especializado para mercancías que requieren cuidados y protocolos específicos.",
        image: "images/imagen5.jpg",
        icon: "fas fa-shield-alt",
        stats: [{number: "100%", label: "Seguridad"}, {number: "0", label: "Incidentes"}]
    },
    {
        title: "Entrega Express",
        category: "Servicio Rápido",
        description: "Servicio de entrega urgente para sus envíos más importantes con garantía de tiempo.",
        image: "images/imagen6.jpg",
        icon: "fas fa-clock",
        stats: [{number: "4h", label: "Entrega Min"}, {number: "99.9%", label: "Cumplimiento"}]
    },
    {
        title: "Rutas Nacionales",
        category: "Cobertura Total",
        description: "Amplia red de rutas que conecta todos los departamentos con servicios regulares y confiables.",
        image: "images/imagen7.jpg",
        icon: "fas fa-map-marked-alt",
        stats: [{number: "22", label: "Departamentos"}, {number: "Daily", label: "Frecuencia"}]
    },
    {
        title: "Gestión de Inventario",
        category: "Control Total",
        description: "Sistema avanzado de gestión de inventarios con tecnología de punta y reportes en tiempo real.",
        image: "images/imagen8.jpg",
        icon: "fas fa-clipboard-list",
        stats: [{number: "Real Time", label: "Tracking"}, {number: "99.8%", label: "Precisión"}]
    },
    {
        title: "Soluciones Personalizadas",
        category: "A su Medida",
        description: "Desarrollamos soluciones logísticas específicas adaptadas a las necesidades únicas de su negocio.",
        image: "images/imagen9.jpg",
        icon: "fas fa-puzzle-piece",
        stats: [{number: "Custom", label: "Soluciones"}, {number: "100%", label: "Satisfacción"}]
    }
];

let currentWork = 0;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const thumbnails = document.querySelectorAll('.thumbnail-item');
const mainCard = document.querySelector('.main-work-card');

function updateWorkDisplay(index) {
    const work = workData[index];
    if (!work || !mainCard) return;
    
    // Update main card content
    const img = mainCard.querySelector('img');
    const icon = mainCard.querySelector('.work-icon i');
    const category = mainCard.querySelector('.work-category');
    const title = mainCard.querySelector('h3');
    const description = mainCard.querySelector('p');
    const statNumbers = mainCard.querySelectorAll('.stat-number');
    const statLabels = mainCard.querySelectorAll('.stat-label');
    
    if (img) img.src = work.image;
    if (icon) icon.className = work.icon;
    if (category) category.textContent = work.category;
    if (title) title.textContent = work.title;
    if (description) description.textContent = work.description;
    
    work.stats.forEach((stat, i) => {
        if (statNumbers[i]) statNumbers[i].textContent = stat.number;
        if (statLabels[i]) statLabels[i].textContent = stat.label;
    });
    
    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function nextWork() {
    currentWork = (currentWork + 1) % workData.length;
    updateWorkDisplay(currentWork);
}

function prevWork() {
    currentWork = (currentWork - 1 + workData.length) % workData.length;
    updateWorkDisplay(currentWork);
}

// Event listeners
if (prevBtn) prevBtn.addEventListener('click', prevWork);
if (nextBtn) nextBtn.addEventListener('click', nextWork);

// Thumbnail clicks
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentWork = index;
        updateWorkDisplay(currentWork);
    });
});

// Service Request Modal
const serviceModal = document.getElementById('service-modal');
const openModalBtn = document.getElementById('open-service-request');
const closeModalBtn = serviceModal.querySelector('.modal-close');
const serviceForm = document.getElementById('service-request-form');

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        serviceModal.style.display = 'flex';
        // Generate unique request number
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
        const rand = Math.floor(1000 + Math.random() * 9000);
        const reqNum = `REQ-${dateStr}-${rand}`;
        const reqNumInput = document.getElementById('request-number');
        if (reqNumInput) reqNumInput.value = reqNum;
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        serviceModal.style.display = 'none';
    });
}

if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.style.display = 'none';
        }
    });
}

if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
        // e.preventDefault(); // Keep this commented to allow form submission
        setTimeout(() => {
            if (serviceModal) {
                serviceModal.style.display = 'none';
            }
            showNotification('Requerimiento enviado con éxito.', 'success');
            serviceForm.reset();
        }, 500);
    });
}

// Quote Request Modal
const quoteModal = document.getElementById('quote-modal');
const openQuoteBtn = document.getElementById('open-quote-request');
const closeQuoteBtn = quoteModal.querySelector('.modal-close');

if (openQuoteBtn) {
    openQuoteBtn.addEventListener('click', () => {
        quoteModal.style.display = 'flex';
        // Generate unique quote number
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
        const rand = Math.floor(1000 + Math.random() * 9000);
        const quoteNum = `COT-${dateStr}-${rand}`;
        const quoteNumInput = document.getElementById('quote-number');
        if (quoteNumInput) quoteNumInput.value = quoteNum;
    });
}

if (closeQuoteBtn) {
    closeQuoteBtn.addEventListener('click', () => {
        quoteModal.style.display = 'none';
    });
}

if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            quoteModal.style.display = 'none';
        }
    });
}

const quoteForm = document.getElementById('quote-request-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        // e.preventDefault(); // Keep this commented to allow form submission
        setTimeout(() => {
            quoteModal.style.display = 'none';
            showNotification('Cotización enviada con éxito.', 'success');
            quoteForm.reset();
        }, 500);
    });
}



// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox) {
    workSlides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('click', (e) => {
            // Only open lightbox if the slide is active
            if (slide.classList.contains('active')) {
                e.stopPropagation(); // Prevent carousel click event
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Leaflet Map initialization (removed as it's no longer used)

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // Open the clicked item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        // Initialize work showcase
        if (workData.length > 0) {
            updateWorkDisplay(0);
        }
        
        // Initialize map if Leaflet is loaded
        // Removed initMap() call as Google Maps is now used
    }, 100);
});
