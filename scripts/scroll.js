// Scroll behavior and glow effect management

let currentViewIndex = 0;
const rightPanel = document.getElementById('right-panel');
const nameElement = document.getElementById('name');
const buildingElement = document.getElementById('building-label');

// Update glow effects based on current view
function updateGlowEffects() {
    if (currentViewIndex === 0) {
        // View 1: Elevator Pitch - glow on name
        nameElement.classList.add('glow-active');
        buildingElement.classList.remove('glow-active');
    } else {
        // View 2: Spotify UI - glow on building
        nameElement.classList.remove('glow-active');
        buildingElement.classList.add('glow-active');
    }
}

// Detect scroll position and update view index
function handleScroll() {
    const scrollPosition = rightPanel.scrollTop;
    const viewHeight = rightPanel.clientHeight;

    // Determine which view is currently visible
    const newViewIndex = Math.round(scrollPosition / viewHeight);

    if (newViewIndex !== currentViewIndex) {
        currentViewIndex = newViewIndex;
        updateGlowEffects();
    }
}

// Initialize scroll behavior
function initScrollBehavior() {
    rightPanel.addEventListener('scroll', handleScroll);

    // Set initial glow (View 1)
    updateGlowEffects();

    // Building label clicks to projects view
    buildingElement.addEventListener('click', () => scrollToView(1));
}

// Programmatic scroll to specific view
function scrollToView(viewIndex) {
    const viewHeight = rightPanel.clientHeight;
    rightPanel.scrollTo({
        top: viewIndex * viewHeight,
        behavior: 'smooth'
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollBehavior);
} else {
    initScrollBehavior();
}
