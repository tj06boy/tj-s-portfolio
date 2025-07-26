document.addEventListener('DOMContentLoaded', function() {
    // --- Hero Name Animation ---
    const name = "Thomas Jacob";
    const nameContainer = document.getElementById('name-container');
    // Ensure the container is empty before adding new spans
    if (nameContainer) {
        nameContainer.innerHTML = ''; 
        name.split('').forEach((char, index) => {
            const span = document.createElement('span');
            // Use non-breaking space for spaces to ensure they are rendered and have width
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            nameContainer.appendChild(span);
        });
    }

    // --- Subtitle Fade-in Animation ---
    const subtitle = document.getElementById('subtitle');
    if (subtitle) {
        setTimeout(() => {
            subtitle.style.opacity = 1;
        }, name.length * 50 + 300); // Delay until after name animation
    }

    // --- On-Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
        });
    }

    if (mobileNavLinks.length > 0 && mobileMenu) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // --- Spotlight Effect Logic ---
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const spotlight = document.createElement('div');
        spotlight.id = 'spotlight';
        heroSection.appendChild(spotlight);

        const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice()) {
            heroSection.addEventListener('mousemove', (e) => {
                // We use pageX/Y to get the position relative to the whole document
                spotlight.style.left = `${e.pageX}px`;
                spotlight.style.top = `${e.pageY}px`;
            });

            heroSection.addEventListener('mouseenter', () => {
                spotlight.style.opacity = '1';
            });

            heroSection.addEventListener('mouseleave', () => {
                spotlight.style.opacity = '0';
            });
        } else {
            // Hide spotlight on touch devices for better performance and usability
            spotlight.style.display = 'none';
        }
    }

    // --- Footer Current Time ---
    function updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true };
            timeElement.textContent = now.toLocaleTimeString('en-IN', options) + ' IST';
        }
    }
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
});
