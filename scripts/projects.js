// Project Data
const projects = [
    {
        id: 1,
        title: "UCI's 1st AI Case Comp",
        artist: "Thad",
        dateRange: "Sep. '25 to Nov. '25",
        image: "assets/projects/ai-case-comp.jpg"
    },
    {
        id: 2,
        title: "NIL Pace",
        artist: "Thad",
        dateRange: "Jan '25 to Present",
        image: "assets/projects/nil-pace.png"
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projects;
}
