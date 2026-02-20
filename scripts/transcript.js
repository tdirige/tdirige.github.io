// Transcript data keyed by project index
const transcripts = [
    // Project 0: NIL Pace
    [
        "Developing software to empower college athletes in the modern era.",
        "Pace allows users to submit inbound sponsor deals (pre-NILGo) and manage partnerships to maximize incentive payouts.",
        "Currently in the user research phase, prototype by end of next month."
    ],
    // Project 1: UCI's 1st AI Case Comp
    [
        "Led a team of 10+ students and full-time professionals through AI curriculum development, financing, and a multichannel marketing effort.",
        "Students that participated got a crash course on how to use emerging tools for research and problem solving.",
        "End result: 120 students, $1,000+ in sponsored funding, 15,000+ media impressions, and a pipeline to a major consulting firm."
    ],
    // Project 2: AT&T
    [
        "Worked with performance metrics and data regarding commission payouts to 4,000+ stores selling AT&T plans nationwide.",
        "Capstone was a SQL script that automatically imported KPIs from existing warehouses, and inputted this data into an interactive visualization in PowerBI that was presented to major retailers (e.g., Walmart, Target).",
        "Collaborated with ICs that brought up their pain points associated with the former process, SMEs on building the script/visualization, and Director to evangelize the product. Resulted in 40% efficiency."
    ],
    // Project 3: Extern
    [
        "To promote their family wireless plans, AT&T sought to find ways to best reach Gen Z consumers. As part of a learning experience hosted by Extern, I put together a PowerPoint that placed an activation inside the (AT&T-sponsored) NFL Dallas Cowboys stadium.",
        "The concept of the activation was built on research conducted of previously successful campaigns like Visa @ World Cup and FC @ Amsterdam. Onsite themes like authentic storytelling and the use of new technologies like mixed reality to appeal to the senses were formulated based on desk research into Gen Z preferences.",
        "Culminated in an interactive station that allowed users to form a unique perception of the AT&T brand, and for them to potentially be converted into a customer in store."
    ],
    // Project 4: 180 Degrees Consulting
    [
        "Student-operated consulting club with branches worldwide. Worked with six clients in the nonprofit or social enterprise spaces. Quarter-long projects with clients: A Quarter Blue, Building Skills Partnership, Autism Partnerships Foundation, Thomas House Family Shelter, Healing to You, and Sublime Systems.",
        "Some highlights of my individual contributions: website UX redesign to increase donations, geo-fenced mobile advertising campaign, overseeing the analytics integration of Google For Nonprofits, and assessing production feasibility of a cement factory."
    ]
];

const WORD_DURATION = 100; // 0.1s per word

let transcriptTimeout = null;
let currentParaIndex = 0;
let allWordSpans = []; // flat array of every word span for the current project
let paraWordRanges = []; // [{start, end}] word-index boundaries per paragraph

// Build the transcript DOM with each word wrapped in a span
function buildWordSpans(projectIndex) {
    const panel = document.getElementById('transcript-panel');
    panel.innerHTML = '';
    allWordSpans = [];
    paraWordRanges = [];

    const sentences = transcripts[projectIndex] || [];
    sentences.forEach((sentence) => {
        const p = document.createElement('p');
        p.className = 'transcript-line';

        const start = allWordSpans.length;

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

        paraWordRanges.push({ start, end: allWordSpans.length });
        panel.appendChild(p);
    });
}

// Toggle .active on all words in a paragraph
function activateParagraph(paraIndex) {
    const { start, end } = paraWordRanges[paraIndex];
    allWordSpans.forEach((span, i) => {
        span.classList.toggle('active', i >= start && i < end);
    });
}

// Schedule next paragraph after duration proportional to word count
function scheduleNext() {
    const { start, end } = paraWordRanges[currentParaIndex];
    const duration = WORD_DURATION * (end - start);

    transcriptTimeout = setTimeout(() => {
        currentParaIndex = (currentParaIndex + 1) % paraWordRanges.length;
        activateParagraph(currentParaIndex);
        scheduleNext();
    }, duration);
}

function startWordLoop() {
    if (transcriptTimeout) {
        clearTimeout(transcriptTimeout);
        transcriptTimeout = null;
    }

    if (allWordSpans.length === 0 || paraWordRanges.length === 0) return;

    activateParagraph(currentParaIndex);
    scheduleNext();
}

// Reset to paragraph 0 for a new project
function resetTranscript(projectIndex) {
    if (transcriptTimeout) {
        clearTimeout(transcriptTimeout);
        transcriptTimeout = null;
    }

    currentParaIndex = 0;
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
