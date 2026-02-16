# Portfolio V2

A personal portfolio website with a Spotify-inspired project showcase and TikTok-style snap-scroll navigation.

## Features

- **Two-panel layout**: Static left panel with intro, dynamic right panel with content
- **Snap-scroll navigation**: TikTok-style vertical scrolling between views
- **Spotify UI**: Interactive project carousel with timer and playback controls
- **Glow effects**: Dynamic text glow based on active view
- **Responsive design**: Mobile-optimized with vertical stacking

## Structure

```
portfolio-v2/
├── index.html              # Main HTML structure
├── styles/
│   ├── main.css           # Core styles and desktop layout
│   └── responsive.css     # Mobile/tablet responsive styles
├── scripts/
│   ├── main.js           # Main app initialization
│   ├── projects.js       # Project data array
│   ├── scroll.js         # Scroll behavior and glow effects
│   └── timer.js          # Spotify UI timer and controls
├── assets/
│   ├── icons/            # SVG icons
│   └── projects/         # Project images
│       └── placeholder.svg
└── README.md
```

## Usage

Simply open `index.html` in a browser. No build process required.

## Adding New Projects

Edit `scripts/projects.js` to add new projects:

```javascript
const projects = [
    {
        id: 1,
        title: "Your Project Title",
        artist: "Thad",
        dateRange: "Month 'YY to Month 'YY",
        image: "assets/projects/your-image.jpg"
    }
];
```

Add corresponding images to `assets/projects/`.

## Technical Details

- **Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Scroll**: CSS `scroll-snap-type` for smooth snap behavior
- **Timer**: JavaScript `setInterval` for 30-second countdown
- **Responsive**: CSS media queries at 768px and 480px breakpoints

## Live Site

Will be deployed to: `tdirige.github.io`

## Contact

**Thaddeus Dirige**
LinkedIn: https://www.linkedin.com/in/tdirige/
Email: tdirige@uci.edu
