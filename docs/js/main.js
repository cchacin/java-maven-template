// Interactive JavaScript for Java 25 Maven Template site

// Prevent flash of wrong theme by applying theme as early as possible
(function() {
    const stored = localStorage.getItem('theme-preference');
    const preference = stored || 'auto';

    function getEffectiveTheme(pref) {
        if (pref === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return pref;
    }

    const effectiveTheme = getEffectiveTheme(preference);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
})();

document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher functionality
    initializeThemeSystem();

    // Copy code functionality
    setupCopyButtons();

    // Smooth scrolling for anchor links
    setupSmoothScrolling();

    // Navigation highlighting
    setupNavigationHighlighting();

    // Mobile menu toggle (if needed in future)
    setupMobileMenu();
});

/**
 * Setup copy buttons for code blocks
 */
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            copyCode(this);
        });
    });
}

/**
 * Copy code from code block to clipboard
 * @param {HTMLElement} button - The copy button that was clicked
 */
function copyCode(button) {
    const codeBlock = button.parentNode;
    let code;

    // Try to find the code element within pre tags (new structure)
    const codeElement = codeBlock.querySelector('pre code');
    if (codeElement) {
        code = codeElement.textContent.trim();
    } else {
        // Fallback to old structure (remove button text from parent)
        code = codeBlock.textContent.replace(button.textContent, '').trim();
    }

    // Try to use the modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function() {
            showCopySuccess(button);
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            fallbackCopyToClipboard(code, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(code, button);
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - The copy button
 */
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyError(button);
    }

    document.body.removeChild(textArea);
}

/**
 * Show successful copy feedback
 * @param {HTMLElement} button - The copy button
 */
function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'rgba(34, 197, 94, 0.2)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 2000);
}

/**
 * Show copy error feedback
 * @param {HTMLElement} button - The copy button
 */
function showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = 'Failed';
    button.style.background = 'rgba(239, 68, 68, 0.2)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 2000);
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup navigation highlighting based on scroll position
 */
function setupNavigationHighlighting() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Setup mobile menu toggle (placeholder for future mobile nav)
 */
function setupMobileMenu() {
    // Mobile menu functionality can be added here if needed
    // For now, the CSS handles responsive navigation

    // Example mobile menu toggle:
    /*
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    */
}

/**
 * Add loading animation to external links
 */
function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle loading indicator
            const originalText = this.textContent;
            this.style.opacity = '0.7';

            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
}

/**
 * Setup intersection observer for animations (optional enhancement)
 */
function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe feature cards and content cards for potential animations
        const animatableElements = document.querySelectorAll('.feature-card, .content-card');
        animatableElements.forEach(el => {
            observer.observe(el);
        });
    }
}

/**
 * Initialize additional features
 */
function initializeEnhancements() {
    setupExternalLinks();
    setupScrollAnimations();
}

// Initialize enhancements after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancements);
} else {
    initializeEnhancements();
}

/**
 * Utility function to debounce scroll events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Theme Management System
 * Sophisticated theme switching with Auto/Light/Dark modes
 */

// Theme configuration
const THEME_STORAGE_KEY = 'theme-preference';
const THEME_CYCLE = ['auto', 'light', 'dark']; // Cycling order
const THEMES = {
    light: { icon: '☀️', label: 'Light' },
    dark: { icon: '🌙', label: 'Dark' },
    auto: { icon: '💻', label: 'Auto' }
};

/**
 * Initialize the complete theme system
 */
function initializeThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const srOnlyText = document.querySelector('.sr-only');

    if (!themeToggle || !themeIcon) {
        console.warn('Theme switcher elements not found');
        return;
    }

    // Initialize theme on page load
    const preference = getThemePreference();
    applyTheme(preference, true); // Skip transition on initial load
    updateThemeUI(preference);

    // Set up event listeners
    themeToggle.addEventListener('click', handleThemeToggle);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

}

/**
 * Get current theme preference from localStorage
 */
function getThemePreference() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored && THEME_CYCLE.includes(stored) ? stored : 'auto';
}

/**
 * Save theme preference to localStorage
 */
function saveThemePreference(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Get the effective theme (resolves 'auto' to actual theme)
 */
function getEffectiveTheme(preference = getThemePreference()) {
    if (preference === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return preference;
}

/**
 * Apply theme to the document
 */
function applyTheme(theme, skipTransition = false) {
    const effectiveTheme = getEffectiveTheme(theme);
    const root = document.documentElement;

    // Add transition prevention class if needed
    if (skipTransition) {
        root.style.transition = 'none';
    }

    // Remove existing theme attributes
    root.removeAttribute('data-theme');

    // Apply new theme via data attribute
    if (effectiveTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
    }

    // Re-enable transitions after a frame
    if (skipTransition) {
        requestAnimationFrame(() => {
            root.style.transition = '';
        });
    }

}

/**
 * Get next theme in the cycle
 */
function getNextTheme(currentTheme) {
    const currentIndex = THEME_CYCLE.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    return THEME_CYCLE[nextIndex];
}

/**
 * Update UI elements to reflect current theme
 */
function updateThemeUI(preference = getThemePreference()) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const srOnlyText = document.querySelector('.sr-only');

    if (!themeToggle || !themeIcon) return;

    const themeConfig = THEMES[preference];
    if (!themeConfig) return;

    // Update icon and labels
    themeIcon.textContent = themeConfig.icon;
    const label = `Switch theme (currently ${themeConfig.label})`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);

    if (srOnlyText) {
        srOnlyText.textContent = `Current theme: ${themeConfig.label}`;
    }
}

/**
 * Handle theme toggle button click
 */
function handleThemeToggle(event) {
    event.preventDefault();
    event.stopPropagation();

    const currentTheme = getThemePreference();
    const nextTheme = getNextTheme(currentTheme);

    // Save and apply new theme
    saveThemePreference(nextTheme);
    applyTheme(nextTheme);
    updateThemeUI(nextTheme);

    // Show notification
    showThemeChangeNotification(nextTheme);
}

/**
 * Handle system theme change (when user changes OS theme)
 */
function handleSystemThemeChange() {
    const preference = getThemePreference();
    if (preference === 'auto') {
        applyTheme('auto');
        showThemeChangeNotification('auto', 'System theme changed');
    }
}

/**
 * Show theme change notification
 */
function showThemeChangeNotification(theme, customMessage = null) {
    const themeConfig = THEMES[theme];
    if (!themeConfig) return;

    const message = customMessage || `Theme changed to ${themeConfig.label}`;

    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-white);
        color: var(--text-dark);
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateX(-50%) translateY(10px);
        max-width: 90vw;
        text-align: center;
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after 2.5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-10px)';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2500);
}