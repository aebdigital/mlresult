// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use ONLY gsap.ticker for Lenis (removes duplicate requestAnimationFrame)
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Pause Lenis when tab is not visible to prevent memory buildup
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });

    // Parallax for hero background on the home page only
    const homeHeroSection = document.querySelector('.hero');
    if (homeHeroSection) {
        const targetElement = homeHeroSection.querySelector('.hero-background');
        if (targetElement) {
            const parallaxValue = 20; // 20% parallax
            
            // Set initial state to avoid jump
            // We want it to start at 0 and move to +20% as we scroll down
            
            gsap.to(targetElement, {
                yPercent: parallaxValue, // Move 20% of scroll distance
                ease: 'none',
                scrollTrigger: {
                    trigger: homeHeroSection,
                    start: 'top top', // Start exactly when top of section matches top of viewport
                    end: 'bottom top',   // End when bottom of section matches top of viewport
                    scrub: true,         // Link animation to scroll position
                }
            });
        }
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const portfolioItems = document.querySelectorAll('.portfolio-item'); // Get ALL items initially
        
        let currentImageIndex = 0;
        let visiblePortfolioItems = []; // Array to store currently visible/filtered items

        // Helper to update the list of visible items (respecting filters)
        function updateVisibleItems() {
            // Re-select items based on visibility class
            // Note: The filter script toggles 'hidden' class or 'visible' class. 
            // We should select items that do NOT have the 'hidden' class.
            const allItems = Array.from(document.querySelectorAll('.portfolio-item'));
            visiblePortfolioItems = allItems.filter(item => !item.classList.contains('hidden'));
        }

        function openLightbox(index) {
            updateVisibleItems(); // Ensure we have the current filtered list
            
            // Find the index in the *visible* array corresponding to the clicked item
            // The passed 'index' might be from the full list, or we need to find the item in visible list
            // Let's pass the actual DOM element instead of index to be safer
            
            // Re-implementing logic to accept element
        }
        
        // Attach click events to portfolio items
        // We use event delegation on the grid container if possible, or direct attachment
        // Since filtering changes classes, the elements stay in DOM.
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                // Check if item is actually visible before opening (double check)
                if (this.classList.contains('hidden')) return;

                updateVisibleItems();
                
                // Find index of this item in the visibleItems array
                currentImageIndex = visiblePortfolioItems.indexOf(this);
                
                if (currentImageIndex !== -1) {
                    const img = this.querySelector('img');
                    if (img) {
                        lightboxImg.src = img.src;
                        lightboxImg.alt = img.alt;
                        
                        // Fix for animation: Display flex first, then add active class
                        lightbox.style.display = 'flex';
                        
                        // Force reflow to ensure display change is applied before adding class
                        void lightbox.offsetWidth;
                        
                        // Add active class to trigger transitions
                        setTimeout(() => {
                            lightbox.classList.add('active');
                        }, 10);
                        
                        document.body.style.overflow = 'hidden'; // Disable scroll
                    }
                }
            });
        });

        function showImage(index, direction) {
            if (index < 0) index = visiblePortfolioItems.length - 1;
            if (index >= visiblePortfolioItems.length) index = 0;
            
            currentImageIndex = index;
            const item = visiblePortfolioItems[currentImageIndex];
            const img = item.querySelector('img');
            
            // Animation reset
            lightboxImg.classList.remove('slide-next-enter', 'slide-prev-enter');
            
            // Trigger reflow to restart animation
            void lightboxImg.offsetWidth;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            // Add animation class
            if (direction === 'next') {
                lightboxImg.classList.add('slide-next-enter');
            } else if (direction === 'prev') {
                lightboxImg.classList.add('slide-prev-enter');
            }
        }

        function closeLightboxHandler() {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Enable scroll
            
            // Wait for transition to finish before hiding
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightboxImg.src = ''; // Clear src
                lightboxImg.classList.remove('slide-next-enter', 'slide-prev-enter');
            }, 300); // Match transition duration in CSS
        }

        // Event Listeners for Controls
        closeBtn.addEventListener('click', closeLightboxHandler);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxHandler();
        });

        // Navigation
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentImageIndex + 1, 'next');
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentImageIndex - 1, 'prev');
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightboxHandler();
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1, 'next');
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1, 'prev');
        });
    }

    // Load global header and footer
    loadHeader();
    loadFooter();
    
    // Initialize navbar functionality after a short delay to ensure header is loaded
    setTimeout(function() {
        initializeNavbarFunctionality();
    }, 100);

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

    // Hero background image cycling
    const heroImages = document.querySelectorAll('.hero-bg-image');
    if (heroImages.length > 0) {
        let currentImageIndex = 0;
        
        function cycleHeroImages() {
            heroImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImages[currentImageIndex].classList.add('active');
        }
        
        // Cycle images every 5 seconds
        setInterval(cycleHeroImages, 5000);
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .portfolio-item, .gallery-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animate counters when hero stats section is visible
    const heroStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const numberElement = stat.childNodes[0];
                    if (numberElement && numberElement.textContent) {
                         const target = parseInt(numberElement.textContent);
                         if (!isNaN(target)) {
                             animateCounter(numberElement, target);
                         }
                    }
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }

    // Animate section title on scroll
    const sectionTitleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Animate section title fill on scroll (middle of viewport)
    const sectionTitleFillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fill-animate');
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px 0px 0px'
    });

    // Observe section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitleObserver.observe(sectionTitle);
        sectionTitleFillObserver.observe(sectionTitle);
    }

    // Animate services title on scroll
    const servicesTitle = document.querySelector('.services-title');
    if (servicesTitle) {
        sectionTitleObserver.observe(servicesTitle);
        sectionTitleFillObserver.observe(servicesTitle);
    }

    // Animate about title on scroll
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) {
        sectionTitleObserver.observe(aboutTitle);
        sectionTitleFillObserver.observe(aboutTitle);
    }

    // Form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email) {
                alert('Ďakujeme za prihlásenie k odberu!');
                this.reset();
            } else {
                alert('Prosím, zadajte váš email.');
            }
        });
    }
});

// Function to load global header
function loadHeader() {
    // Detect if we're in a subfolder (sluzby, galeria, o-nas, kontakt)
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/sluzby') || currentPath.includes('/galeria') || currentPath.includes('/o-nas') || currentPath.includes('/kontakt');
    const pathPrefix = isInSubfolder ? '../' : '';
    
    // Header content
    // Note: We use absolute paths for navigation links to ensure they work correctly on web servers
    // But we use pathPrefix for assets (images) to ensure they resolve correctly relative to the current file
    const headerHTML = `
    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress">
        <div class="scroll-progress-bar"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="/" class="logo-link">
                    <img src="${pathPrefix}assets/images/logos/whole.png" alt="ML Result & Gran" class="logo-image">
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="/" class="nav-link">Domov</a></li>
                <li><a href="/sluzby/" class="nav-link">Služby</a></li>
                <li><a href="/o-nas/" class="nav-link">O nás</a></li>
                <li><a href="/galeria/" class="nav-link">Galéria</a></li>
                <li><a href="/kontakt/" class="nav-link">Kontakt</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>`;

    // Find placeholder and replace it
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = headerHTML;
        
        // After header is loaded, set up the active link
        setActiveNavLink();
    } else {
        // Fallback: If no placeholder, try to find an existing navbar to update active state (in case of static HTML fallback)
         setActiveNavLink();
    }
}

// Function to set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Normalize path helper
    const normalize = (p) => p.replace(/\/$/, '').replace(/\/index\.html$/, '');
    const normCurrent = normalize(currentPath);

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href) return;
        
        const normHref = normalize(href);
        
        // Check for home page match
        if (normCurrent === '' && normHref === '') {
            link.classList.add('active');
        } 
        // Check for other pages match
        else if (normHref !== '' && normCurrent.includes(normHref)) {
            // Check if we are not matching a sub-string incorrectly (e.g. /sluzby matching /sluzby-extra)
            // But here paths are simple /sluzby, /kontakt so includes is mostly safe or we can check exact match
             if (normCurrent === normHref || normCurrent.endsWith(normHref)) {
                 link.classList.add('active');
             }
        }
    });
}

// Function to initialize all navbar functionality
function initializeNavbarFunctionality() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!navbar || !hamburger || !navMenu) {
        // Elements might not be ready yet if loaded dynamically
        return;
    }
    
    // Mobile Navigation
    // Remove old event listeners by cloning (simple trick) or just assuming this runs once per page load
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    newHamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        newHamburger.classList.toggle('active');
        
        // Update navbar background when mobile menu is toggled
        const isNowActive = newHamburger.classList.contains('active');
        updateNavbarState(navbar, newHamburger, isNowActive);
        
        // Disable/Enable scrolling
        if (isNowActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Function to update navbar state
    function updateNavbarState(nav, ham, forceOpen = false) {
        const scrollPosition = window.scrollY;
        const currentPage = window.location.pathname;
        let triggerPoint;
        
        if (currentPage.includes('/sluzby') || currentPage.includes('/galeria') || currentPage.includes('/o-nas') || currentPage.includes('/kontakt')) {
            triggerPoint = window.innerHeight * 0.05; // 5vh for non-home pages
        } else {
            const heroHeight = document.querySelector('.hero') ? document.querySelector('.hero').offsetHeight : 0;
             // Default to some value if hero not found
            triggerPoint = heroHeight ? heroHeight * 0.3 : 100;
        }
        
        // Check if mobile menu is open
        const isMobileMenuOpen = ham.classList.contains('active') || forceOpen;
        
        if (scrollPosition > triggerPoint || isMobileMenuOpen) {
            nav.classList.add('scrolled');
            if (isMobileMenuOpen) {
                nav.classList.add('mobile-open');
            }
        } else {
            nav.classList.remove('scrolled');
            nav.classList.remove('mobile-open');
        }
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            newHamburger.classList.remove('active');
            navbar.classList.remove('mobile-open');
            updateNavbarState(navbar, newHamburger);
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });

    // Initial call to set navbar state
    updateNavbarState(navbar, newHamburger);

    // Update navbar on scroll
    window.addEventListener('scroll', function() {
        updateNavbarState(navbar, newHamburger);
        
        // Update scroll progress
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progressHeight = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.height = progressHeight + '%';
        }
    });
}

// Function to load global footer
function loadFooter() {
    // Detect if we're in a subfolder
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/sluzby') || currentPath.includes('/galeria') || currentPath.includes('/o-nas') || currentPath.includes('/kontakt');
    const pathPrefix = isInSubfolder ? '../' : '';
    
    // Footer content
    // Using absolute paths for links like /sluzby/ to be consistent with header
    const footerHTML = `
    <footer id="footer" class="footer">
        <!-- First Row - Let's Talk -->
        <div class="footer-top">
            <div class="footer-cta-content">
                <h2>Porozprávajme sa!</h2>
                <p>Pripravení urobiť prvý krok k realizácii vášho vysnívaného projektu?<br>Kontaktujte nás ešte dnes a spoločne zmeníme vašu víziu na realitu.</p>
            </div>
            <div class="footer-cta-button">
                <a href="/kontakt/" class="footer-btn">KONTAKTUJTE NÁS</a>
            </div>
        </div>
        
        <!-- Divider Line -->
        <div class="footer-divider"></div>
        
        <!-- Second Row - 3 Columns -->
        <div class="footer-content">
            <!-- Column 1 - ML RESULT Info -->
            <div class="footer-section footer-info">
                <div class="footer-brand">
                    <h3>ML RESULT s. r. o.</h3>
                </div>
                
                <div class="footer-contact">
                    <h4>Kancelária:</h4>
                    <p>Niže Mesta 12072, 049 25 Dobšiná</p>
                    <div class="footer-email-row">
                        <div class="footer-email-label-col">E-mail:</div>
                        <div class="footer-email-list-col">
                            <a href="mailto:doprava@mlresult.sk">doprava@mlresult.sk</a>
                            <a href="mailto:obchod@mlresult.sk">obchod@mlresult.sk</a>
                        </div>
                    </div>
                    <p>Telefón: <a href="tel:+421908527419">+421 908 527 419</a></p>
                </div>
            </div>
            
            <div class="footer-section footer-info">
                <div class="footer-brand">
                    <h3>GRAN s. r. o.</h3>
                </div>
                <div class="footer-contact">
                    <h4>Kancelária:</h4>
                    <p>SNP 246, 049 24 Vlachovo</p>
                    <div class="footer-email-row">
                        <div class="footer-email-label-col">E-mail:</div>
                        <div class="footer-email-list-col">
                            <a href="mailto:info@gran-stav.sk">info@gran-stav.sk</a>
                        </div>
                    </div>
                    <p>Telefón: <a href="tel:+421907456963">+421 907 456 963</a></p>
                </div>
            </div>
            
            <!-- Column 2 & 3 - Navigation -->
            <div class="footer-section footer-navigation">
                <div class="footer-nav-column">
                    <h4>SLUŽBY</h4>
                    <ul>
                        <li><a href="/sluzby/#ocelove-konstrukcie" data-service="ocelove-konstrukcie">Oceľové konštrukcie</a></li>
                        <li><a href="/sluzby/#nakladna-doprava" data-service="nakladna-doprava">Nákladná doprava</a></li>
                        <li><a href="/sluzby/#stavebnictvo" data-service="stavebnictvo">Stavebníctvo</a></li>
                        <li><a href="/sluzby/#prenajom-techniky" data-service="prenajom-techniky">Prenájom stavebnej techniky</a></li>
                    </ul>
                </div>
                <div class="footer-nav-column">
                    <h4>SPOLOČNOSŤ</h4>
                    <ul>
                        <li><a href="/o-nas/">O nás</a></li>
                        <li><a href="/sluzby/">Služby</a></li>
                        <li><a href="/galeria/">Naše práce</a></li>
                        <li><a href="/kontakt/">Kontakt</a></li>
                    </ul>
                </div>
                <div class="footer-nav-column">
                    <h4>DÔLEŽITÉ</h4>
                    <ul>
                        <li><a href="#" onclick="showPrivacyPolicy(event)">Ochrana osobných údajov</a></li>
                        <li><a href="${pathPrefix}assets/cennik-areal-Dobsina-ML-RESULT.pdf" target="_blank">Cenník areálu</a></li>
                        <li><a href="${pathPrefix}assets/ml-result-prepravny-poriadku.pdf" target="_blank">Prepravný poriadok</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Third Row - Bottom -->
        <div class="footer-bottom">
            <div class="footer-social">
                <a href="https://aebdigital.sk" target="_blank" style="text-decoration: underline;">Tvorba stránky - AEB Digital</a>
            </div>
            <div class="footer-copyright">
                <p>© 2025 ML RESULT s.r.o. Všetky práva vyhradené.</p>
            </div>
        </div>
    </footer>`;

    // Find placeholder and replace it
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
        
        // Initialize footer functionality after loading
        initializeFooterFunctionality();
    } else {
        // Fallback or if there's already a footer (e.g. static)
        // Just initialize functionality
         initializeFooterFunctionality();
    }
}

// Privacy policy functions
function showPrivacyPolicy(event) {
    if (event) event.preventDefault();
    const popup = document.getElementById('privacy-popup');
    if (popup) {
        popup.style.setProperty('display', 'block', 'important');
        document.body.style.overflow = 'hidden';
    }
}

function hidePrivacyPolicy() {
    const popup = document.getElementById('privacy-popup');
    if (popup) {
        popup.style.setProperty('display', 'none', 'important');
        document.body.style.overflow = 'auto';
    }
}

// Initialize footer functionality
function initializeFooterFunctionality() {
    // Handle dynamic service links in footer
    const serviceLinks = document.querySelectorAll('a[data-service]');
    
    serviceLinks.forEach(link => {
        // Remove old listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            // If it's a direct link to a section, let the browser handle it if we are on the same page
            // But here we are making it robust
            
            // Check if we're on the services page
            if (window.location.pathname.includes('/sluzby')) {
                e.preventDefault();
                const service = this.getAttribute('data-service');
                const targetSection = document.getElementById(service);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Allow default navigation to /sluzby/#section
            }
        });
    });

    // Close popup when clicking backdrop
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('privacy-backdrop')) {
            hidePrivacyPolicy();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hidePrivacyPolicy();
        }
    });
}