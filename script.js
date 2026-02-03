// ===== Phone Call Tracking (Global - available immediately) =====
window.trackPhoneCall = function(location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            'event_category': 'engagement',
            'event_label': location,
            'value': 1
        });
        gtag('event', 'conversion', {
            'send_to': '[GOOGLE_ADS_CONVERSION_ID]/[CONVERSION_LABEL]'
        });
    }
};

// ===== Initialize on DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const stickyMobileCta = document.getElementById('sticky-mobile-cta');
    const backToTopButton = document.getElementById('back-to-top');
    const header = document.getElementById('main-header');
    const currentYear = document.getElementById('current-year');

    // Update copyright year
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    // ===== Mobile Menu =====
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
        });
    }

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ===== Combined Scroll Handler (Performance Optimized) =====
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.scrollY;

                // Sticky Mobile CTA
                if (stickyMobileCta) {
                    scrollY > 200 ? stickyMobileCta.classList.add('visible') : stickyMobileCta.classList.remove('visible');
                }

                // Back to Top Button
                if (backToTopButton) {
                    if (scrollY > 300) {
                        backToTopButton.classList.remove('opacity-0', 'invisible');
                        backToTopButton.classList.add('opacity-100', 'visible');
                    } else {
                        backToTopButton.classList.add('opacity-0', 'invisible');
                        backToTopButton.classList.remove('opacity-100', 'visible');
                    }
                }

                // Header Shadow
                if (header) {
                    scrollY > 10 ? header.classList.add('shadow-lg') : header.classList.remove('shadow-lg');
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Show sticky CTA on mobile after delay
    if (window.innerWidth < 768 && stickyMobileCta) {
        setTimeout(function() { stickyMobileCta.classList.add('visible'); }, 1000);
    }

    // Back to Top Click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });

    // ===== Intersection Observer for Animations =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) entry.target.classList.add('animate-fadeIn');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('section').forEach(function(section) {
            observer.observe(section);
        });
    }
});
