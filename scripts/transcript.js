// Transcript data keyed by project index
const transcripts = [
    // Project 0: UCI's 1st AI Case Comp
    [
        "Led a team of 10+ students and full-time professionals through AI curriculum development, financing, and a multichannel marketing effort.",
        "Students that participated got a crash course on how to use emerging tools for research and problem solving.",
        "End result: 120 students, $1,000+ in sponsored funding, 15,000+ media impressions, and a pipeline to a major consulting firm."
    ],
    // Project 1: NIL Pace
    [
        "Developing software to empower college athletes in the modern era.",
        "Pace allows users to submit inbound sponsor deals (pre-NILGo) and manage partnerships to maximize incentive payouts.",
        "Currently in the user research phase, prototype by end of next month."
    ]
];

const WORD_DURATION = 350; // 0.35s per word

let transcriptInterval = null;
let currentWordIndex = 0;
let allWordSpans = []; // flat array of every word span for the current project

// Build the transcript DOM with each word wrapped in a span
function buildWordSpans(projectIndex) {
    const panel = document.getElementById('transcript-panel');
    panel.innerHTML = '';
    allWordSpans = [];

    const sentences = transcripts[projectIndex] || [];
    sentences.forEach((sentence) => {
        const p = document.createElement('p');
        p.className = 'transcript-line';

        sentence.split(' ').forEach((word, i, arr) => {
            const span = document.createElement('span');
            span.className = 'transcript-word';
            span.textContent = word;
            p.appendChild(span);
            allWordSpans.push(span);

            if (i < arr.length - 1) {
                p.appendChild(document.createTextNode(' '));
            }
        });

        panel.appendChild(p);
    });
}

// Toggle .active on a window of 4 words starting at index
function activateWord(index) {
    allWordSpans.forEach((span, i) => {
        span.classList.toggle('active', i >= index && i < index + 4);
    });
}

// Start the 2s-per-word interval loop
function startWordLoop() {
    if (transcriptInterval) {
        clearInterval(transcriptInterval);
        transcriptInterval = null;
    }

    if (allWordSpans.length === 0) return;

    activateWord(currentWordIndex);

    transcriptInterval = setInterval(() => {
        currentWordIndex = (currentWordIndex + 1) % allWordSpans.length;
        activateWord(currentWordIndex);
    }, WORD_DURATION);
}

// Reset to word 0 for a new project
function resetTranscript(projectIndex) {
    if (transcriptInterval) {
        clearInterval(transcriptInterval);
        transcriptInterval = null;
    }

    currentWordIndex = 0;
    buildWordSpans(projectIndex);
    startWordLoop();
}

function initTranscript() {
    buildWordSpans(0);
    startWordLoop();

    // Listen for project changes dispatched by timer.js
    document.addEventListener('projectchange', (e) => {
        resetTranscript(e.detail.index);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranscript);
} else {
    initTranscript();
}
