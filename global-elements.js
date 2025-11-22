document.addEventListener('DOMContentLoaded', function() {
    // Determine the root path based on the current page's location
    let rootPath = './';
    const path = window.location.pathname;
    // If the path contains /blog/ or /calculators/, the root is one level up
    if (path.includes('/blog/') || path.includes('/calculators/')) {
        rootPath = '../';
    }

    // UPDATED: Paths reflect the new structure
    const homePath = rootPath; // This is index.html (Planning Hub)
    // UPDATED: Changed planner.html to all-in-one-mortgage-planner.html
    const plannerPath = `${rootPath}all-in-one-mortgage-planner.html`; // This is the new All-in-One Planner page
    const quizPath = `${rootPath}Refinance-Readiness-Quiz.html`;
    const calcHubPath = `${rootPath}calculators/`;
    // DEPRECATED: planningHubPath is no longer needed, as homePath is the hub.
    const legalPath = `${rootPath}contact-us-and-legal.html`;
    const blogPath = `${rootPath}blog/`;
    
    const logoIconPath = '#logo-icon';

    /**
     * Dynamically loads all necessary favicon links into the <head>.
     * Uses the calculated rootPath to ensure links work from any directory depth.
     * @param {string} basePath - The relative path to the site root (e.g., './' or '../').
     */
    function loadFavicons(basePath) {
        console.log('Loading favicons with base path:', basePath);
        const favicons = [
            // Standard PWA/Android
            { rel: 'manifest', href: `${basePath}favicon/site.webmanifest` },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: `${basePath}favicon/android-chrome-192x192.png` },
            { rel: 'icon', type: 'image/png', sizes: '512x512', href: `${basePath}favicon/android-chrome-512x512.png` },
            
            // Apple iOS
            { rel: 'apple-touch-icon', sizes: '180x180', href: `${basePath}favicon/apple-touch-icon.png` },
            
            // Standard Browser
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${basePath}favicon/favicon-32x32.png` },
            // Note: 48x48 and 96x96 are non-standard but included since they exist
            { rel: 'icon', type: 'image/png', sizes: '48x48', href: `${basePath}favicon/favicon-48x48.png` },
            { rel: 'icon', type: 'image/png', sizes: '96x96', href: `${basePath}favicon/favicon-96x96.png` },
            
            // Fallback .ico
            { rel: 'icon', type: 'image/x-icon', href: `${basePath}favicon/favicon.ico` }
        ];

        const head = document.head;
        favicons.forEach(linkInfo => {
            // Check if a similar link already exists (to avoid duplicates, though unlikely)
            if (!document.querySelector(`link[rel="${linkInfo.rel}"][href="${linkInfo.href}"]`)) {
                const link = document.createElement('link');
                link.rel = linkInfo.rel;
                if (linkInfo.type) link.type = linkInfo.type;
                if (linkInfo.sizes) link.sizes = linkInfo.sizes;
                link.href = linkInfo.href;
                head.appendChild(link);
            }
        });
    }

    const headerHTML = `
        <style>
          .menu-link-gradient {
            background: linear-gradient(to right, #1C768F 0%, #166534 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-weight: 600; /* semibold */
            transition: background 0.3s ease;
          }
          .menu-link-gradient:hover {
            background: linear-gradient(to right, #166534 0%, #1C768F 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
           /* Slide-out Menu Links */
           .slide-out-link {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 500;
            color: #374151; /* gray-700 */
            border-left: 4px solid transparent;
            transition: all 0.2s ease-in-out;
           }
           .slide-out-link:hover {
            background-color: #f0f9ff; /* sky-50 */
            color: #1C768F; /* primary */
            border-left-color: #1C768F;
           }

          /* UPDATED: Desktop Sidebar Title Gradient */
          .sidebar-title-gradient {
            background: linear-gradient(to right, #1C768F 0%, #166534 100%);
            color: white; /* Make text white */
            font-size: 0.875rem; /* text-sm */
            font-weight: 700;
            padding: 0.25rem 0.75rem; /* UPDATED: Reduced vertical padding */
            margin-bottom: 0.75rem;
            border-radius: 0.25rem; /* Add rounded corners */
            text-align: center; /* Center the text */
          }

          /* NEW: Mobile Sidebar Title Gradient */
          .mobile-sidebar-title-gradient {
            background: linear-gradient(to right, #1C768F 0%, #166534 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-weight: 700; /* bold */
            font-size: 0.875rem; /* text-sm */
          }

          /* NEW: Smooth shadow for sidebar widget */
          .sidebar-shadow {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
        </style>
        <!-- UPDATED: Changed background from bg-white/80 to a light blue/green gradient -->
        <header class="bg-gradient-to-r from-sky-50 to-green-50 backdrop-blur-lg shadow-sm no-print md:static top-0 z-40 rounded-b-lg md:rounded-b-xl border-glow-primary relative">
            <!-- UPDATED: Replaced Tailwind width/padding classes with .container-global -->
            <nav class="container-global">
                <div class="flex items-center justify-between h-14">
                    <a href="${homePath}" class="flex items-center space-x-2 text-primary hover:opacity-90 transition-opacity">
                        <!-- UPDATED: Logo size decreased from h-8 w-8 to h-7 w-7 -->
                        <svg class="h-7 w-7" aria-hidden="true">
                            <use href="${logoIconPath}"></use>
                        </svg>
                        <!-- UPDATED: Logo text size decreased from text-lg to text-base for better alignment -->
                        <!-- UPDATED: Adjusted font weights and removed pb-0.5 for cleaner alignment -->
                        <span class="font-bold text-base text-gray-800">
                            <span class="border-b-4 border-accent">Strategic</span>
                            <span class="text-gray-600 font-semibold">Mortgage Planner</span>
                        </span>
                    </a>
                    <!-- Desktop Menu -->
                    <!-- UPDATED: Font size changed from text-xs to text-sm -->
                    <!-- UPDATED: Changed hover color to text-accent -->
                    <div class="hidden md:flex items-center space-x-4">
                        <!-- UPDATED: Added Homepage link -->
                        <a href="${homePath}" class="text-sm menu-link-gradient">Home</a>
                        <a href="${plannerPath}" class="text-sm menu-link-gradient">Mortgage Planner</a>
                        <!-- UPDATED: Removed redundant Planning Hub link -->
                        <a href="${calcHubPath}" class="text-sm menu-link-gradient">Calculator's Hub</a>
                        <a href="${blogPath}" class="text-sm menu-link-gradient">Blog</a>
                        <a href="${legalPath}" class="text-sm menu-link-gradient">Contact & Legal</a>
                    </div>
                    
                    <!-- Mobile menu button (Hamburger Only) -->
                    <div class="md:hidden flex items-center">
                        <button id="mobile-menu-button" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-label="Open main menu">
                            <svg id="hamburger-icon" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        
        <!-- NEW: Mobile Slide-Out Menu Overlay -->
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/50 z-40 hidden md:hidden transition-opacity duration-300 opacity-0 backdrop-blur-sm"></div>

        <!-- NEW: Mobile Slide-Out Menu Container -->
        <div id="mobile-menu" class="fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col h-full">
            <!-- Menu Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-green-50">
                <span class="font-bold text-lg text-primary flex items-center gap-2">
                    <svg class="h-6 w-6" aria-hidden="true"><use href="${logoIconPath}"></use></svg>
                    Menu
                </span>
                <button id="mobile-menu-close" type="button" class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-label="Close menu">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <!-- Menu Links -->
            <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <a href="${homePath}" class="slide-out-link">Home</a>
                <a href="${plannerPath}" class="slide-out-link">Mortgage Planner</a>
                <a href="${calcHubPath}" class="slide-out-link">Calculator's Hub</a>
                <a href="${blogPath}" class="slide-out-link">Blog</a>
                <a href="${legalPath}" class="slide-out-link">Contact & Legal</a>
            </div>

            <!-- Menu Footer -->
            <div class="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500">
                &copy; ${new Date().getFullYear()} Strategic Mortgage Planner
            </div>
        </div>
    `;

    const footerHTML = `
        <footer class="bg-gray-800 text-gray-400 text-sm no-print rounded-t-lg md:rounded-t-xl border-glow-primary">
            <!-- UPDATED: Reduced py-6 to py-4 for a more compact footer -->
            <div class="container-global py-4">
                
                <!-- NEW: Social Share Bar (Moved Inside Footer) -->
                <!-- UPDATED: Changed border-gray-700 to border-gray-600 to make it darker/more visible -->
                <section class="border-b border-gray-600 pb-4 mb-4">
                    <!-- UPDATED: Reduced gap-4 to gap-3 for mobile -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                        <!-- MODIFIED: Changed text size from text-sm to text-xs as requested by user -->
                        <h3 class="text-xs font-semibold text-gray-300">Found this page helpful? Share it:</h3>
                        <!-- UPDATED: Reduced gap-3 to gap-2.5 for icons -->
                        <div class="flex items-center gap-2.5">
                            <!-- UPDATED: Reduced padding to p-2 and icon size to w-3.5 h-3.5 -->
                            <a id="global-share-x" href="#" target="_blank" rel="noopener noreferrer" title="Share on X" class="p-2 bg-black text-white rounded-full hover:bg-gray-700 transition-colors shadow-md">
                                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75z"/></svg>
                            </a>
                            <!-- RE-ADDED: Facebook Icon with compact styling -->
                            <a id="global-share-fb" href="#" target="_blank" rel="noopener noreferrer" title="Share on Facebook" class="p-2 bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-colors shadow-md">
                                 <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/></svg>
                            </a>
                            <!-- UPDATED: Reduced padding to p-2 and icon size to w-3.5 h-3.5. FIXED typo class_l to class -->
                            <a id="global-share-li" href="#" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" class="p-2 bg-[#0077B5] text-white rounded-full hover:bg-[#006097] transition-colors shadow-md">
                                 <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <!-- UPDATED: Reduced padding to p-2 and icon size to w-3.5 h-3.5 -->
                            <a id="global-share-wa" href="#" target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" class="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#1ebe59] transition-colors shadow-md">
                                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 01-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.31-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                            </a>
                            <!-- UPDATED: Reduced padding to p-2 and icon size to w-3.5 h-3.5 -->
                            <a id="global-share-em" href="#" title="Share via Email" class="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors shadow-md">
                                 <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </a>
                        </div>
                    </div>
                </section>
                <!-- End Social Share Bar -->

                <!-- NEW: Added Logo to Footer -->
                <div class="flex justify-center mb-4">
                    <a href="${homePath}" class="flex items-center space-x-2 text-primary hover:opacity-90 transition-opacity">
                        <svg class="h-7 w-7" aria-hidden="true">
                            <use href="${logoIconPath}"></use>
                        </svg>
                        <span class="font-bold text-base text-gray-200">
                            <span class="border-b-4 border-accent">Strategic</span>
                            <span class="text-gray-400 font-semibold">Mortgage Planner</span>
                        </span>
                    </a>
                </div>
                <!-- END: Added Logo to Footer -->

                <!-- UPDATED: Reordered content and changed line width -->
                <div class="text-center text-xs space-y-1">
                    <p>&copy; <span id="copyright-year"></span> Strategic Mortgage Planner. All Rights Reserved.</p>
                    <p><strong>Disclaimer:</strong> This tool is for informational purposes only. Consult a financial professional before making decisions.</p>
                    <!-- UPDATED: Thin line moved here and width changed to w-1/2 -->
                    <hr class="border-t border-gray-700 w-1/2 mx-auto my-3">
                    <p>A proud part of the <a href="https://toolblaster.com" target="_blank" rel="noopener noreferrer" class="text-white hover:underline font-semibold">toolblaster.com</a> Network <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 inline-block text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg></p>
                </div>
            </div>
        </footer>
    `;

    const svgIcon = `
        <svg width="0" height="0" class="absolute">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1C768F;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#166534;stop-opacity:1" />
            </linearGradient>
          </defs>
          <symbol id="logo-icon" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="20" fill="url(#logo-gradient)"/>
            <path d="M50 25L25 45V75H41.6667V58.3333H58.3333V75H75V45L50 25Z" stroke="white" stroke-width="7" stroke-linejoin="round"/>
            <path d="M40 65L50 55L60 65" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M50 55V45" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          </symbol>
        </svg>
    `;

    document.body.insertAdjacentHTML('afterbegin', svgIcon);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // *** CALL THE NEW FAVICON FUNCTION ***
    loadFavicons(rootPath); // Load all the favicon links

    const copyrightYearEl = document.getElementById('copyright-year');
    if (copyrightYearEl) {
        copyrightYearEl.textContent = new Date().getFullYear();
    }
    
    // --- NEW: Updated Mobile Slide-Out Logic ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeButton = document.getElementById('mobile-menu-close');

    if (menuButton && mobileMenu && mobileMenuOverlay) {
        const openMenu = () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            requestAnimationFrame(() => {
                mobileMenuOverlay.classList.remove('opacity-0');
                mobileMenuOverlay.classList.add('opacity-100');
            });
            document.body.classList.add('overflow-hidden'); // Prevent body scroll
        };

        const closeMenu = () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            
            // Wait for transition to finish before hiding (300ms matches duration-300)
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        };

        menuButton.addEventListener('click', openMenu);
        if (closeButton) closeButton.addEventListener('click', closeMenu);
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    // --- NEW: Centralized Social Sharing ---
    function setupGlobalShareLinks() {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        const pageSource = "Strategic Mortgage Planner";

        const xLink = document.getElementById('global-share-x');
        const fbLink = document.getElementById('global-share-fb');
        const liLink = document.getElementById('global-share-li');
        const waLink = document.getElementById('global-share-wa');
        const emLink = document.getElementById('global-share-em');

        if (xLink) xLink.href = `https://x.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        if (fbLink) fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        if (liLink) liLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}&source=${pageSource}`;
        if (waLink) waLink.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
        if (emLink) emLink.href = `mailto:?subject=${pageTitle}&body=Check out this helpful tool: ${pageUrl}`;
    }

    // --- UPDATED: Centralized Related Articles & Calculators ---
    function setupRelatedArticles() {
        const desktopPlaceholder = document.getElementById('desktop-sidebar-placeholder');
        const mobilePlaceholder = document.getElementById('mobile-sidebar-placeholder');
        const fullPath = window.location.pathname;

        // --- Check 1: Exit on index pages ---
        if (fullPath.endsWith('/calculators/index.html') || fullPath.endsWith('/calculators/') ||
            fullPath.endsWith('/blog/index.html') || fullPath.endsWith('/blog/')) {
            return; 
        }

        // --- Check 2: Exit if no placeholders exist ---
        if (!desktopPlaceholder && !mobilePlaceholder) {
            return;
        }

        const currentPage = fullPath.split('/').pop();
        
        let sidebarTitle = "";
        let links = [];

        // --- Check 3: Determine which sidebar to show ---
        if (fullPath.includes('/blog/')) {
            // --- BLOG PAGE: Show Related Guides ---
            sidebarTitle = "Related Guides";
            const articles = [
                { href: "how-to-buy-your-first-home-guide.html", file: "how-to-buy-your-first-home-guide.html", title: "First-Time Home Buyer Guide", desc: "A step-by-step overview." },
                { href: "mortgage-amortization-explained.html", file: "mortgage-amortization-explained.html", title: "Mortgage Amortization Explained", desc: "See your loan cost breakdown." },
                { href: "fixed-vs-variable-mortgage-guide.html", file: "fixed-vs-variable-mortgage-guide.html", title: "Fixed vs. Variable Mortgage?", desc: "Choose the right loan type." },
                { href: "how-much-house-can-i-afford.html", file: "how-much-house-can-i-afford.html", title: "How Much House Can I Afford?", desc: "A deep dive into budgeting." },
                { href: "first-time-home-buyer-checklist.html", file: "first-time-home-buyer-checklist.html", title: "First-Time Home Buyer's Checklist", desc: "Your essential 10-step guide." }
            ];
            links = articles.filter(article => article.file !== currentPage).slice(0, 5);

        } else {
            // --- CALCULATOR PAGE: Show Other Calculators ---
            sidebarTitle = "Other Calculators";
            const allTools = [
                { href: `${rootPath}all-in-one-mortgage-planner.html`, file: 'all-in-one-mortgage-planner.html', title: "All-in-One Planner", desc: "Main mortgage planner." },
                { href: `${rootPath}calculators/down-payment-calculator.html`, file: 'down-payment-calculator.html', title: "Down Payment Calculator", desc: "Plan your upfront costs." },
                { href: `${rootPath}calculators/extra-payment-calculator.html`, file: 'extra-payment-calculator.html', title: "Extra Payment Calculator", desc: "Pay off your loan faster." },
                { href: `${rootPath}calculators/mortgage-amortisation-calculator.html`, file: 'mortgage-amortisation-calculator.html', title: "Amortisation Calculator", desc: "View your loan schedule." },
                { href: `${rootPath}calculators/home-equity-calculator.html`, file: 'home-equity-calculator.html', title: "Home Equity Calculator", desc: "Compare HELOC vs. Refi." },
                { href: `${rootPath}calculators/property-tax-calculator.html`, file: 'property-tax-calculator.html', title: "Property Tax Calculator", desc: "Estimate local taxes." },
                { href: `${rootPath}calculators/closing-cost-calculator.html`, file: 'closing-cost-calculator.html', title: "Closing Cost Calculator", desc: "Estimate fees to close." },
                { href: `${rootPath}Refinance-Readiness-Quiz.html`, file: 'Refinance-Readiness-Quiz.html', title: "Refinance Quiz", desc: "See if you're ready." }
            ];
            links = allTools.filter(tool => tool.file !== currentPage && (currentPage || tool.file !== 'index.html')).slice(0, 5);
        }

        if (links.length === 0) return;

        // --- Generate Desktop Sidebar Links ---
        const generateDesktopLinksHTML = (links) => {
            return links.map((link, index) => {
                const linkHref = fullPath.includes('/blog/') ? `${rootPath}blog/${link.href}` : link.href;
                return `
                <li class="flex items-start space-x-2">
                    <span class="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[9px] mt-1" aria-hidden="true">
                        ${index + 1}
                    </span>
                    <a href="${linkHref}" class="font-semibold text-primary hover:underline group flex-grow">
                        <span class="block text-xs">${link.title}</span>
                        <span class="block text-[11px] text-gray-500 group-hover:text-accent">${link.desc}</span>
                    </a>
                </li>
            `}).join('');
        };

        // --- NEW: Related Calculator Widget (Desktop Only, Blog Pages Only) ---
        let relatedToolHTML = '';
        if (fullPath.includes('/blog/')) {
            
            // Default Calculator (Fallback)
            const defaultRelatedCalc = {
                href: `${rootPath}all-in-one-mortgage-planner.html`,
                title: 'All-in-One Mortgage Planner',
                desc: 'Analyze payoff, equity, DTI, NPV, and refinance options.',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
            };

            // Mapping of Blog Pages to their specific related Calculator
            // Keys match the filename of the blog post
            const blogToCalcMap = {
                'how-much-house-can-i-afford.html': {
                    href: `${rootPath}all-in-one-mortgage-planner.html#affordability-tab`,
                    title: 'Affordability Calculator',
                    desc: 'Find your max home price.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
                },
                'how-much-should-you-put-down-on-a-house.html': {
                    href: `${rootPath}calculators/down-payment-calculator.html`,
                    title: 'Down Payment Calculator',
                    desc: 'Plan your upfront costs.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-2v-2m0-2V7m0 0V6" /></svg>`
                },
                'first-time-home-buyer-checklist.html': {
                    href: `${rootPath}calculators/down-payment-calculator.html`,
                    title: 'Down Payment Calculator',
                    desc: 'Estimate your initial investment.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`
                },
                'hidden-costs-of-buying-a-home.html': {
                    href: `${rootPath}calculators/closing-cost-calculator.html`,
                    title: 'Closing Cost Calculator',
                    desc: 'Avoid surprise fees.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
                },
                'hidden-homeownership-costs-guide.html': {
                    href: `${rootPath}calculators/property-tax-calculator.html`,
                    title: 'Property Tax Calculator',
                    desc: 'Estimate annual taxes.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`
                },
                'fixed-vs-variable-mortgage-guide.html': {
                    href: `${rootPath}all-in-one-mortgage-planner.html#refinance-tab`,
                    title: 'Mortgage Planner',
                    desc: 'Compare loan scenarios.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
                },
                'mortgage-amortization-explained.html': {
                    href: `${rootPath}calculators/mortgage-amortisation-calculator.html`,
                    title: 'Amortisation Calculator',
                    desc: 'See your payment schedule.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8" /></svg>`
                },
                'how-to-pay-off-your-mortgage-early.html': {
                    href: `${rootPath}calculators/extra-payment-calculator.html`,
                    title: 'Extra Payment Calculator',
                    desc: 'See interest savings.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
                },
                'home-equity-vs-refinance.html': {
                    href: `${rootPath}calculators/home-equity-calculator.html`,
                    title: 'Home Equity Calculator',
                    desc: 'Compare HELOC vs. Refi.',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>`
                }
            };

            // UPDATED: Use mapping or fallback to default
            const relatedCalc = blogToCalcMap[currentPage] || defaultRelatedCalc;

            relatedToolHTML = `
                <div class="sidebar-widget sidebar-shadow">
                    <h3 class="sidebar-title-gradient">Try This Tool</h3>
                    <a href="${relatedCalc.href}" class="block group bg-white border border-gray-200 rounded-lg p-3 hover:border-primary transition-all shadow-sm hover:shadow-md">
                         <div class="flex items-center gap-3">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                ${relatedCalc.icon}
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-gray-800 group-hover:text-primary">${relatedCalc.title}</h4>
                                <p class="text-[10px] text-gray-500 leading-tight mt-0.5">${relatedCalc.desc}</p>
                            </div>
                         </div>
                         <div class="mt-2 text-right border-t border-gray-100 pt-2">
                            <span class="text-[10px] font-bold text-primary group-hover:underline flex items-center justify-end">
                                Open Calculator <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                         </div>
                    </a>
                </div>
            `;
        }
        
        if (desktopPlaceholder) {
            desktopPlaceholder.innerHTML = `
                <div class="sticky top-24 space-y-6">
                    <div class="sidebar-widget sidebar-shadow">
                         <h3 class="sidebar-title-gradient">${sidebarTitle}</h3>
                         <ul class="space-y-4">${generateDesktopLinksHTML(links)}</ul>
                    </div>
                    ${relatedToolHTML}
                </div>
            `;
        }

        // --- Generate Mobile Sidebar ---
        if (mobilePlaceholder && !fullPath.includes('/blog/')) {
            const generateMobileLinksHTML = (links) => {
                // Define icons for calculators
                const icons = {
                    "all-in-one-mortgage-planner.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
                    "down-payment-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>`,
                    "extra-payment-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                    "mortgage-amortisation-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
                    "home-equity-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>`,
                    "property-tax-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
                    "closing-cost-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621.504-1.125-1.125-1.125H3.375z" /></svg>`,
                    "Refinance-Readiness-Quiz.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                };
                const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-8.5" /></svg>`;

                return links.map(link => {
                    const iconKey = link.file || link.href;
                    const linkHref = fullPath.includes('/blog/') ? `${rootPath}blog/${link.href}` : link.href;
                    const iconSVG = icons[iconKey] || defaultIcon;
                    return `
                        <a href="${linkHref}" class="mobile-article-card group">
                            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary mb-2 transition-colors group-hover:bg-primary group-hover:text-white">
                                ${iconSVG}
                            </div>
                            <span class="block text-xs font-bold text-gray-800 group-hover:text-primary">${link.title}</span>
                        </a>
                    `;
                }).join('');
            };

            mobilePlaceholder.innerHTML = `
                <div id="mobile-related-articles" class="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-100/95 backdrop-blur-sm border-t border-gray-200 p-3 shadow-top-lg transform translate-y-full transition-transform duration-500 ease-in-out z-40">
                    <div class="flex justify-between items-center mb-3 px-1">
                         <h3 class="${sidebarTitle === "Other Calculators" ? "mobile-sidebar-title-gradient" : "font-bold text-sm text-gray-800"}">${sidebarTitle === "Related Guides" ? "Continue Reading..." : "Explore Other Tools..."}</h3>
                         <button id="close-mobile-sidebar" class="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                    </div>
                    <div class="flex space-x-3 overflow-x-auto pb-2 -mx-3 px-3 scrollable-tabs">
                        ${generateMobileLinksHTML(links)}
                    </div>
                </div>
            `;

            const mobileSidebar = document.getElementById('mobile-related-articles');
            const closeButton = document.getElementById('close-mobile-sidebar');
            let sidebarShown = false;
            if (mobileSidebar && closeButton) {
                const showSidebar = () => { if (!sidebarShown) { mobileSidebar.classList.remove('translate-y-full'); sidebarShown = true; } };
                const hideSidebar = () => { mobileSidebar.classList.add('translate-y-full'); sidebarShown = false; };
                closeButton.addEventListener('click', hideSidebar);
                window.addEventListener('scroll', () => { if (!sidebarShown && window.scrollY > (document.body.scrollHeight * 0.6)) { showSidebar(); } }, { passive: true });
            }
        }
    }

    // --- NEW: Back to Top Button ---
    function setupBackToTopButton() {
        const backToTopButton = document.createElement('button');
        backToTopButton.classList.add('back-to-top'); 
        backToTopButton.setAttribute('title', 'Back to top');
        backToTopButton.setAttribute('aria-label', 'Back to top');
        
        backToTopButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        `;

        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.opacity = '0';
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                backToTopButton.style.visibility = 'visible';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.visibility = 'hidden';
                backToTopButton.style.opacity = '0';
            }
        }, { passive: true });

        document.body.appendChild(backToTopButton);
    }
    
    setupRelatedArticles();
    setupGlobalShareLinks();
    setupBackToTopButton();
});
