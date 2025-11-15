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
            
            // Note: The data:image/svg+xml is already in the HTML <head> of each page, so we don't add it again.
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
           .mobile-menu-link-gradient {
            background: linear-gradient(to right, #1C768F 0%, #166534 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-weight: 500; /* medium */
            transition: background 0.3s ease;
          }
          .mobile-menu-link-gradient:hover {
            background: linear-gradient(to right, #166534 0%, #1C768F 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
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
            
            /* Remove text clipping and border-image */
            /* -webkit-background-clip: text; */
            /* -webkit-text-fill-color: transparent; */
            /* background-clip: text; */
            /* text-fill-color: transparent; */
            /* border-bottom: 4px solid transparent; */
            /* border-image: linear-gradient(to right, #1C768F 0%, #166534 100%); */
            /* border-image-slice: 1; */
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
        <header class="bg-gradient-to-r from-sky-50 to-green-50 backdrop-blur-lg shadow-sm no-print md:static top-0 z-40 rounded-b-lg md:rounded-b-xl border-glow-primary">
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
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button id="mobile-menu-button" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg id="hamburger-icon" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg id="close-icon" class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <!-- Mobile menu, show/hide based on menu state. -->
            <!-- UPDATED: Replaced 'hidden' with animation classes: invisible, opacity-0, max-h-0 and transition properties -->
            <div class="md:hidden invisible opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="mobile-menu">
                <!-- UPDATED: Changed text-gray-700 to text-primary and hover:text-primary to hover:text-accent -->
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <!-- UPDATED: Added Homepage link -->
                    <a href="${homePath}" class="block px-3 py-2 rounded-md text-sm mobile-menu-link-gradient hover:bg-gray-50">Home</a>
                    <a href="${plannerPath}" class="block px-3 py-2 rounded-md text-sm mobile-menu-link-gradient hover:bg-gray-50">Mortgage Planner</a>
                    <!-- UPDATED: Removed redundant Planning Hub link -->
                    <a href="${calcHubPath}" class="block px-3 py-2 rounded-md text-sm mobile-menu-link-gradient hover:bg-gray-50">Calculator's Hub</a>
                    <a href="${blogPath}" class="block px-3 py-2 rounded-md text-sm mobile-menu-link-gradient hover:bg-gray-50">Blog</a>
                    <a href="${legalPath}" class="block px-3 py-2 rounded-md text-sm mobile-menu-link-gradient hover:bg-gray-50">Contact & Legal</a>
                </div>
            </div>
        </header>
        <!-- NEW: Full-screen overlay for when mobile menu is open -->
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black bg-opacity-25 z-30 hidden md:hidden backdrop-blur-sm"></div>
    `;
    
    // --- NEW: Global Share Bar HTML ---
    // This will be inserted right before the footer on every page.
    // --- MODIFIED: Removed this variable, as its content will be moved into footerHTML ---
    // const globalShareBarHTML = `...`;

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
    // --- UPDATED: Remove the separate share bar insertion ---
    // document.body.insertAdjacentHTML('beforeend', globalShareBarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // *** CALL THE NEW FAVICON FUNCTION ***
    loadFavicons(rootPath); // Load all the favicon links

    const copyrightYearEl = document.getElementById('copyright-year');
    if (copyrightYearEl) {
        copyrightYearEl.textContent = new Date().getFullYear();
    }
    
    // Add Mobile Menu Toggle Logic
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay'); // Get the new overlay
    const hamburger = document.getElementById('hamburger-icon');
    const close = document.getElementById('close-icon');

    if (menuButton) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('invisible');

            // Toggle Body Scroll
            // We only want to lock scroll on mobile. md:overflow-auto ensures desktop is never locked.
            document.body.classList.toggle('overflow-hidden', isOpen);
            document.body.classList.toggle('md:overflow-auto', isOpen);

            if (isOpen) {
                // Open menu
                mobileMenu.classList.remove('invisible', 'opacity-0', 'max-h-0');
                mobileMenu.classList.add('visible', 'opacity-100', 'max-h-screen'); // Use max-h-screen as a proxy for auto-height
                mobileMenuOverlay.classList.remove('hidden');
                hamburger.classList.add('hidden');
                close.classList.remove('hidden');
            } else {
                // Close menu
                mobileMenu.classList.add('invisible', 'opacity-0', 'max-h-0');
                mobileMenu.classList.remove('visible', 'opacity-100', 'max-h-screen');
                mobileMenuOverlay.classList.add('hidden');
                hamburger.classList.remove('hidden');
                close.classList.add('hidden');
            }
        };

        menuButton.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', toggleMenu); // Close on overlay click
    }

    // --- NEW: Centralized Social Sharing ---
    // This function runs on every page load to set the correct URLs for the new global share bar.
    function setupGlobalShareLinks() {
        // Get the current page's URL and title
        // Use window.location.href to get the full, absolute URL
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        const pageSource = "Strategic Mortgage Planner"; // Optional, for LinkedIn

        // Find the links by their new IDs
        const xLink = document.getElementById('global-share-x');
        const fbLink = document.getElementById('global-share-fb');
        const liLink = document.getElementById('global-share-li');
        const waLink = document.getElementById('global-share-wa');
        const emLink = document.getElementById('global-share-em');

        // Dynamically set the href attribute for each link
        if (xLink) {
            xLink.href = `https://x.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        }
        if (fbLink) {
            fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        }
        if (liLink) {
            liLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}&source=${pageSource}`;
        }
        if (waLink) {
            waLink.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
        }
        if (emLink) {
            emLink.href = `mailto:?subject=${pageTitle}&body=Check out this helpful tool: ${pageUrl}`;
        }
    }

    // --- UPDATED: Centralized Related Articles & Calculators ---
    function setupRelatedArticles() {
        const desktopPlaceholder = document.getElementById('desktop-sidebar-placeholder');
        const mobilePlaceholder = document.getElementById('mobile-sidebar-placeholder');
        const fullPath = window.location.pathname;

        // --- Check 1: Exit on index pages ---
        if (fullPath.endsWith('/calculators/index.html') || fullPath.endsWith('/calculators/') ||
            fullPath.endsWith('/blog/index.html') || fullPath.endsWith('/blog/')) {
            return; // Do not add sidebars to these index pages
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
            // Filter out the current page
            links = articles.filter(article => article.file !== currentPage).slice(0, 5);

        } else {
            // --- CALCULATOR PAGE (or other page): Show Other Calculators ---
            sidebarTitle = "Other Calculators";
            const allTools = [
                // Note: The hrefs are relative to the *current page's* directory.
                // global-elements.js is loaded from `../` on calculator pages.
                // rootPath is already calculated correctly (e.g., '../' for calc pages, './' for quiz page)
                
                // UPDATED: Point to new planner.html file
                { href: `${rootPath}all-in-one-mortgage-planner.html`, file: 'all-in-one-mortgage-planner.html', title: "All-in-One Planner", desc: "Main mortgage planner." },
                { href: `${rootPath}calculators/down-payment-calculator.html`, file: 'down-payment-calculator.html', title: "Down Payment Calculator", desc: "Plan your upfront costs." },
                { href: `${rootPath}calculators/extra-payment-calculator.html`, file: 'extra-payment-calculator.html', title: "Extra Payment Calculator", desc: "Pay off your loan faster." },
                { href: `${rootPath}calculators/mortgage-amortisation-calculator.html`, file: 'mortgage-amortisation-calculator.html', title: "Amortisation Calculator", desc: "View your loan schedule." },
                { href: `${rootPath}calculators/home-equity-calculator.html`, file: 'home-equity-calculator.html', title: "Home Equity Calculator", desc: "Compare HELOC vs. Refi." },
                { href: `${rootPath}calculators/property-tax-calculator.html`, file: 'property-tax-calculator.html', title: "Property Tax Calculator", desc: "Estimate local taxes." },
                { href: `${rootPath}calculators/closing-cost-calculator.html`, file: 'closing-cost-calculator.html', title: "Closing Cost Calculator", desc: "Estimate fees to close." },
                { href: `${rootPath}Refinance-Readiness-Quiz.html`, file: 'Refinance-Readiness-Quiz.html', title: "Refinance Quiz", desc: "See if you're ready." }
            ];
            
            // Filter out the current page.
            // On main index.html, currentPage is '', but rootPath is './'. `allTools` has href `./` and file `index.html`.
            // On quiz page, currentPage is 'Refinance-Readiness-Quiz.html', rootPath is './'.
            // On calculator page (e.g., closing-cost-calculator.html), currentPage is 'closing-cost-calculator.html', rootPath is `../`.
            
            // Filter by filename.
            // UPDATED: Filter logic to correctly handle index.html (which is now the hub)
            links = allTools.filter(tool => tool.file !== currentPage && (currentPage || tool.file !== 'index.html')).slice(0, 5);
        }

        if (links.length === 0) return;

        // --- Generate Desktop Sidebar ---
        const generateDesktopLinksHTML = (links) => {
            return links.map((link, index) => { // <-- Added index
                // For blog articles, the href needs to be prefixed with the blog path.
                const linkHref = fullPath.includes('/blog/') ? `${rootPath}blog/${link.href}` : link.href;
                return `
                <li class="flex items-start space-x-2">
                    <!-- UPDATED: Made icon smaller (w-3.5 h-3.5), font smaller (text-[9px]), and margin top (mt-1) -->
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
        
        if (desktopPlaceholder) {
            desktopPlaceholder.innerHTML = `
                <!-- REMOVED: Ad Slot Placeholder -->
                <div class="sticky top-24">
                    <!-- UPDATED: Added sidebar-shadow class -->
                    <div class="sidebar-widget sidebar-shadow">
                         <!-- UPDATED: Applied gradient class to all sidebar titles -->
                         <h3 class="sidebar-title-gradient">${sidebarTitle}</h3>
                         <ul class="space-y-4">${generateDesktopLinksHTML(links)}</ul>
                    </div>
                </div>
            `;
        }

        // --- Generate Mobile Sidebar ---
        // UPDATED: Added a check to NOT render this mobile banner if we are on a blog page.
        if (mobilePlaceholder && !fullPath.includes('/blog/')) {
            const generateMobileLinksHTML = (links) => {
                // Define icons for calculators
                const icons = {
                    // UPDATED: Added planner.html icon
                    "all-in-one-mortgage-planner.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
                    "down-payment-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>`,
                    "extra-payment-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                    "mortgage-amortisation-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
                    "home-equity-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>`,
                    "property-tax-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
                    "closing-cost-calculator.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621.504-1.125-1.125-1.125H3.375z" /></svg>`,
                    "Refinance-Readiness-Quiz.html": `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                    // Article icons
                    "how-to-buy-your-first-home-guide.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>`,
                    "mortgage-amortization-explained.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>`,
                    "fixed-vs-variable-mortgage-guide.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>`,
                    "how-much-house-can-i-afford.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
                    "first-time-home-buyer-checklist.html": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`
                };
                const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-8.5" /></svg>`;

                return links.map(link => {
                    // Use `file` for icon lookup, `href` for the link
                    const iconKey = link.file || link.href;
                    // For blog articles, the href needs to be prefixed with the blog path.
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
                // Show the bar when user scrolls towards the bottom 60% of the page
                window.addEventListener('scroll', () => { if (!sidebarShown && window.scrollY > (document.body.scrollHeight * 0.6)) { showSidebar(); } }, { passive: true });
            }
        }
    }

    // --- NEW: Back to Top Button ---
    /**
     * Creates and manages a "Back to Top" button.
     * The button appears on scroll and smoothly scrolls to the top on click.
     */
    function setupBackToTopButton() {
        // Create the button element
        const backToTopButton = document.createElement('button');
        backToTopButton.classList.add('back-to-top'); // Uses style from style.css
        backToTopButton.setAttribute('title', 'Back to top');
        backToTopButton.setAttribute('aria-label', 'Back to top');
        
        // Add SVG icon
        backToTopButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        `;

        // Set initial state (hidden). The CSS transition will handle the fade-in.
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.opacity = '0';
        
        // Add click event listener to scroll to top
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add scroll event listener to show/hide button
        window.addEventListener('scroll', () => {
            // Show button after scrolling 200px
            if (window.pageYOffset > 200) {
                backToTopButton.style.visibility = 'visible';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.visibility = 'hidden';
                backToTopButton.style.opacity = '0';
            }
        }, { passive: true }); // Use passive listener for better scroll performance

        // Add the button to the body
        document.body.appendChild(backToTopButton);
    }
    
    // --- Run on page load ---
    // --- REMOVED old setupSocialSharing() call ---
    setupRelatedArticles();
    // --- ADDED call to new global share link function ---
    setupGlobalShareLinks();
    // --- ADDED call for Back to Top button ---
    setupBackToTopButton();
});
