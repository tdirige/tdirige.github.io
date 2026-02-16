// Main application initialization and coordination

// Initialize all components
function initApp() {
    console.log('Portfolio V2 initialized');

    // Add any global event listeners or coordination logic here
    // The individual modules (scroll.js, timer.js) handle their own initialization
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
