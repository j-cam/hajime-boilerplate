# hajime [![Build Status](https://travis-ci.org/j-cam/hajime-boilerplate.svg?branch=master)](https://travis-ci.org/j-cam/hajime-boilerplate)

A modern front-end boilerplate using vanilla JavaScript, Sass, and Handlebars templates with a streamlined npm-based build system.

## Features

- 🚀 Modern npm scripts (no Gulp required)
- 💅 Sass with PostCSS (autoprefixer + cssnano)
- 📝 Handlebars templating system
- 🖼️ Image and SVG optimization
- 🎨 SVG sprite generation
- 🔍 ESLint + Stylelint + Prettier
- 🔄 Live reloading with Browser Sync
- ⚡ esbuild for fast JavaScript bundling

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0

## Setup

Clone the repo:
```bash
git clone https://github.com/j-cam/hajime-boilerplate.git project-name
cd project-name
```

Install dependencies:
```bash
npm install
```

## Available Scripts

### Development
```bash
npm start
```
Builds the project in development mode, starts a local server with live reloading, and watches for file changes.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `docs/` folder.

### Individual Build Tasks
- `npm run styles` - Compile and minify Sass
- `npm run scripts` - Bundle JavaScript with esbuild
- `npm run templates` - Build HTML from Handlebars templates
- `npm run images` - Copy images to docs folder
- `npm run svg` - Optimize SVG files
- `npm run sprite:svg` - Generate SVG sprite

### Linting
```bash
npm run lint        # Run all linters
npm run lint:fix    # Auto-fix linting issues
npm run lint:js     # Lint JavaScript only
npm run lint:scss   # Lint SCSS only
```

### Deployment
```bash
npm run gh-pages           # Deploy to GitHub Pages
npm run deploy:staging     # Deploy to staging
npm run deploy:production  # Build and deploy to production
```

## Project Structure

```
├── src/
│   ├── js/              # JavaScript source files
│   ├── scss/            # Sass stylesheets
│   ├── templates/       # Handlebars templates
│   │   ├── layouts/     # Page layouts
│   │   ├── pages/       # Individual pages
│   │   ├── partials/    # Reusable partials
│   │   └── helpers/     # Handlebars helpers
│   └── media/
│       ├── img/         # Images
│       ├── svg/         # SVG files
│       └── sprite-svg/  # SVG files for sprite generation
├── docs/                # Build output (served by GitHub Pages)
├── scripts/             # Build scripts
└── package.json
```

## Build System

This boilerplate uses npm scripts instead of a task runner like Gulp or Grunt. The build system is powered by:

- **Sass** - CSS preprocessing
- **PostCSS** - CSS post-processing (autoprefixer, cssnano)
- **esbuild** - Fast JavaScript bundling
- **Handlebars** - HTML templating
- **SVGO** - SVG optimization
- **Browser Sync** - Development server with live reload
- **Chokidar** - File watching

## Sass Structure

The Sass follows a modular structure inspired by SMACSS:

- `base/` - Reset, base element styles
- `lib/` - Functions, mixins, utilities
- `components/` - Reusable UI components (e.g., buttons)
- `_variables.scss` - Global variables
- `_media-queries.scss` - Responsive breakpoints
- `_shame.scss` - Quick fixes and hacks (to be refactored)

## Browser Support

The default configuration supports modern browsers. Modify the `browserslist` in `package.json` to adjust browser support as needed.

## License

GPL-2.0



