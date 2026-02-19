// Timer and playback logic for Spotify UI

// State
let isPlaying = false;
let currentTime = 0;
let currentProjectIndex = 0;
let timerInterval = null;

// DOM Elements
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const timeElapsed = document.getElementById('time-elapsed');
const projectTitle = document.getElementById('project-title');
const projectDate = document.getElementById('project-date');
const projectImage = document.getElementById('project-image');

// Constants
const TOTAL_TIME = 30; // 30 seconds

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update time and progress bar only (called every tick)
function updateDisplay() {
    timeElapsed.textContent = formatTime(currentTime);
    const percentage = (currentTime / TOTAL_TIME) * 100;
    progressBar.style.width = `${percentage}%`;
}

// Update project info and notify transcript (called only on project change)
function updateProjectInfo() {
    const project = projects[currentProjectIndex];
    projectTitle.textContent = project.title;
    projectDate.textContent = project.dateRange;
    projectImage.src = project.image;
    projectImage.alt = project.title;
    document.dispatchEvent(new CustomEvent('projectchange', { detail: { index: currentProjectIndex } }));
}

// Start timer
function startTimer() {
    if (!isPlaying) {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';

        timerInterval = setInterval(() => {
            currentTime += 0.1; // Increment by 0.1 second for smoother progress

            if (currentTime >= TOTAL_TIME) {
                // Auto-advance to next project
                nextProject();
            } else {
                updateDisplay();
            }
        }, 100); // Update every 100ms
    }
}

// Pause timer
function pauseTimer() {
    if (isPlaying) {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// Go to next project
function nextProject() {
    pauseTimer();
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    currentTime = 0;
    updateProjectInfo();
    updateDisplay();
    startTimer(); // Auto-continue playing
}

// Go to previous project
function previousProject() {
    pauseTimer();
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    currentTime = 0;
    updateProjectInfo();
    updateDisplay();
}

// Initialize timer
function initTimer() {
    // Set initial display
    updateProjectInfo();
    updateDisplay();

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextProject);
    prevBtn.addEventListener('click', previousProject);
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimer);
} else {
    initTimer();
}
