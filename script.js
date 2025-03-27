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

// Add scroll event listener for header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to skill categories on scroll
const skillCategories = document.querySelectorAll('.skill-category');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skillCategories.forEach(category => {
    observer.observe(category);
});

// Add animation to experience and certification cards on scroll
const slideElements = document.querySelectorAll('.slide-left, .slide-right');

const slideObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, slideObserverOptions);

slideElements.forEach(element => {
    slideObserver.observe(element);
});

// Add stagger effect to cards
const experienceCards = document.querySelectorAll('.experience-card');
const certificationCards = document.querySelectorAll('.certification-card');

experienceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

certificationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Automatic sliding carousel functionality with manual navigation
function createAutoCarousel(containerSelector, cardSelector) {
    const container = document.querySelector(containerSelector);
    const cards = container.querySelectorAll(cardSelector);
    const prevBtn = container.parentElement.querySelector('.prev-icon');
    const nextBtn = container.parentElement.querySelector('.next-icon');
    let currentIndex = 0;
    let intervalId;
    let isPaused = false;

    function updateCards() {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
                card.classList.remove('prev', 'next');
            } else if (index === currentIndex - 1) {
                card.classList.add('prev');
                card.classList.remove('active', 'next');
            } else if (index === currentIndex + 1) {
                card.classList.add('next');
                card.classList.remove('active', 'prev');
            } else {
                card.classList.remove('active', 'prev', 'next');
            }
        });
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    }

    function startAutoSlide() {
        if (!isPaused) {
            intervalId = setInterval(nextCard, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
        isPaused = true;
    }

    function resumeAutoSlide() {
        isPaused = false;
        startAutoSlide();
    }

    // Add event listeners for manual navigation
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevCard();
        resumeAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextCard();
        resumeAutoSlide();
    });

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', resumeAutoSlide);

    // Initialize
    updateCards();
    startAutoSlide();
}

// Initialize auto carousels
createAutoCarousel('.experience-grid', '.experience-card');
createAutoCarousel('.certifications-grid', '.certification-card');