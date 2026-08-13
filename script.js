// ========== Mobile Menu Toggle ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== Smooth Scroll for Navigation ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// ========== Contact Form Handling ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Validate required fields
    if (!name || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Create FormData object for submission (can be modified to send to a backend)
    const formData = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Here you would typically send this data to a backend server
    console.log('Form Data:', formData);

    // For demo purposes, show success message and reset form
    showMessage('Thank you! We received your message and will contact you soon.', 'success');
    contactForm.reset();

    // Optional: You can integrate with a backend service here
    // Example with Formspree or similar service:
    // sendFormToBackend(formData);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    
    // Remove message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 5000);
}

// ========== Scroll Animation ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and testimonial cards
document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== Count Up Animation for Stats ==========
const countUpOptions = {
    threshold: 0.5
};

const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const statElement = entry.target.querySelector('h3');
            const finalValue = parseFloat(statElement.textContent);
            animateCount(statElement, finalValue);
        }
    });
}, countUpOptions);

document.querySelectorAll('.stat').forEach(stat => {
    countUpObserver.observe(stat);
});

function animateCount(element, finalValue) {
    let current = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        // Format the display value
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========== Update WhatsApp Links (IMPORTANT: Change these to your actual numbers) ==========
function updateWhatsAppLinks() {
    // Use international format without +, spaces, or dashes
    const whatsappNumber = '916006932532';
    const whatsappMessage = 'Hello! I am interested in your services.';

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Update all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.href = whatsappUrl;
    });

    // Update WhatsApp button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.href = whatsappUrl;
    }
}

// Initialize WhatsApp links
updateWhatsAppLinks();

// ========== Navbar Scroll Effect ==========
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// ========== Form Input Validation ==========
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// ========== Loading Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== Prevent form submission delay (optional mailto fallback) ==========
// If you want to use email instead of form handling, uncomment below:
/*
contactForm.addEventListener('submit', function (e) {
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = encodeURIComponent('New Contact Form Submission from ' + name);
    const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + this.querySelector('input[type="tel"]').value + '\n' +
        'Service: ' + this.querySelectorAll('input[type="text"]')[1].value + '\n\n' +
        'Message:\n' + this.querySelector('textarea').value
    );
    
    window.location.href = `mailto:hello@digitaleaseco.com?subject=${subject}&body=${body}`;
