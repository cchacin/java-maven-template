// Interactive JavaScript for Java 25 Maven Template site

document.addEventListener('DOMContentLoaded', function() {
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
    const code = codeBlock.textContent.replace(button.textContent, '').trim();

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