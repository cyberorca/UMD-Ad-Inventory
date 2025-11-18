# UMD Ad Inventory

A JavaScript library for managing ad inventory across KLY Network platforms. This UMD (Universal Module Definition) library provides modular ad formats that can be dynamically loaded and initialized.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Ad Formats](#ad-formats)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Build & Development](#build--development)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features

- 🎯 **Multiple Ad Formats**: Support for Newstag, SkinAd, and AdvertorialEmbed
- 📦 **Code Splitting**: Dynamic imports for optimal performance
- 🔧 **Auto-Initialization**: Automatic setup via URL parameters
- 🌐 **Multi-Platform**: Support for multiple KLY Network sites
- 📱 **Responsive**: Desktop and mobile support
- 🗺️ **Source Maps**: Full debugging support in development mode

## Installation

### Using npm

```bash
npm install
```

### Build the Project

```bash
# Production build (minified, optimized)
npm run build

# Development build (with source maps)
npm run build:dev

# Watch mode (auto-rebuild on changes)
npm run build:watch
```

The built files will be available in the `dist/` directory.

## Quick Start

### 1. Include the Library

Add the main bundle to your HTML:

```html
<script src="path/to/KLYCreative.1.0.1-beta.0.umd.js"></script>
```

### 2. Set Global Configuration

Configure the KLY global object before loading the script:

```html
<script>
  window.kly = {
    site: "bolacom",        // Site identifier
    platform: "desktop",    // "desktop" or "mobile"
    pageType: "readpage"    // Page type (for AdvertorialEmbed)
  };
</script>
```

### 3. Initialize Ad Format

#### Option A: Auto-Initialize via URL Parameter

```html
<script src="KLYCreative.1.0.1-beta.0.umd.js?creative=newstag"></script>
```

#### Option B: Manual Initialization

```html
<script src="KLYCreative.1.0.1-beta.0.umd.js"></script>
<script>
  window.KLYCreative.init("newstag", {
    textTag: "Sponsored Tag",
    landingPage: "https://example.com",
    position: 0
  });
</script>
```

## Ad Formats

### Newstag

Inserts sponsored tags into trending/tag lists on news sites.

**Supported Sites:**
- `kapanlagi`
- `liputan6`
- `fimela`
- `bolacom`
- `bola`

**Configuration:**
```javascript
window.KLYCreative.init("newstag", {
  textTag: "Sponsored Tag",      // Text to display
  landingPage: "https://...",    // Click destination
  position: 0,                   // Position in list (0 = first)
  debugPreview: false            // Skip element detection (for testing)
});
```

**Modes:**
- **Clone** (default): Clones existing tag and inserts ad tag
- **Replace**: Replaces existing tag content
- **Swiper**: Inserts into Swiper carousel
- **Bolacom**: Special handling for cycle carousel

**How it works:**
- Polls for target elements every 100ms (max 30 seconds)
- Inserts ad tag at specified position
- Automatically adapts to site-specific DOM structure

### SkinAd

Displays fixed-position side advertisements (desktop only).

**Configuration:**
```javascript
window.KLYCreative.init("skinad", {
  leftImage: "https://...",      // Left side image URL
  rightImage: "https://...",      // Right side image URL
  landingPage: "https://...",     // Click destination
  imageWidth: 300                 // Image width in pixels
});
```

**Note:** Only works on desktop platform. Mobile requests are ignored.

**Features:**
- Fixed position on left/right sides of viewport
- Automatically calculates offset based on content width
- Full-height images with object-fit cover
- High z-index (9999) to appear above content

### AdvertorialEmbed

Embeds advertorial articles in an iframe within article pages.

**Supported Sites:**
- `bolacom`
- `liputan6`
- `kapanlagi`
- `fimela`
- `merdeka`
- `merdeka.com`
- `otosia.com`
- `bola`

**Configuration:**
```javascript
window.KLYCreative.init("advertorial-embed", {
  embedURL: "https://d.kapanlaginetwork.com/.../article.html?advembed=1"
});
```

**Features:**
- Automatic iframe resizing via postMessage
- Site-specific styling and colors
- "Baca juga" label
- "Baca Selengkapnya" CTA button
- Gradient overlay effect
- Native window.open to avoid ad blocker interference

**Site-specific colors:**
- `bolacom`: #31824A
- `liputan6`: #FF3300
- `kapanlagi`: #F28900
- `fimela`: #BF0561
- `merdeka`/`merdeka.com`: #8E01FF
- `otosia.com`: #D71920
- `bola`: #138137

## API Reference

### `KLYCreative.init(format, config)`

Initializes an ad format.

**Parameters:**
- `format` (string): Ad format name - `"newstag"`, `"skinad"`, or `"advertorial-embed"`
- `config` (object): Configuration object specific to each format

**Returns:** `Promise<void>`

**Example:**
```javascript
await window.KLYCreative.init("newstag", {
  textTag: "Sponsored",
  landingPage: "https://example.com"
});
```

## Configuration

### Global Configuration Object

The library reads from `window.kly` or `window.kmklabs`:

```javascript
window.kly = {
  site: "bolacom",        // Required: Site identifier
  platform: "desktop",    // Required: "desktop" or "mobile"
  pageType: "readpage"   // Optional: Page type for AdvertorialEmbed
};
```

### Site Identifiers

- `kapanlagi`
- `liputan6`
- `fimela`
- `bolacom` (or `bola.com` - auto-converted)
- `bola`
- `merdeka`
- `merdeka.com`
- `otosia.com`

## Build & Development

### Available Scripts

```bash
# Production build (minified, optimized, auto-clean)
npm run build

# Development build (unminified, with source maps)
npm run build:dev

# Watch mode (auto-rebuild on file changes)
npm run build:watch

# Bundle analysis (visualize bundle size)
npm run build:analyze

# Clean dist folder manually
npm run clean
```

### Build Output

The build process generates:

- `KLYCreative.{version}.umd.js` - Main bundle
- `KLYCreative.{name}.{version}.{hash}.js` - Dynamic chunks
- `manifest.json` - File manifest for tracking
- `*.map` files - Source maps (production)

### Development Tips

1. **Source Maps**: Development builds include `eval-source-map` for fast debugging
2. **Watch Mode**: Use `npm run build:watch` for automatic rebuilds
3. **Bundle Analysis**: Run `npm run build:analyze` to visualize bundle composition
4. **Console Logging**: Check browser console for `[adInventory]` and format-specific messages

### Testing Locally

1. Build the project:
   ```bash
   npm run build:dev
   ```

2. Serve the dist folder:
   ```bash
   npx http-server dist -p 3000 -c-1
   # or
   npx serve dist -p 3000
   ```

3. Open in browser:
   ```
   http://localhost:3000
   ```

4. Test in browser console:
   ```javascript
   window.kly = { site: "bolacom", platform: "desktop" };
   window.KLYCreative.init("newstag", {
     textTag: "Test",
     landingPage: "https://example.com",
     debugPreview: true
   });
   ```

## Project Structure

```
umd-ad-inventory/
├── src/
│   ├── global_init.js          # Entry point, initialization logic
│   └── modules/
│       ├── Newstag.js          # News tag ad format
│       ├── SkinAd.js           # Skin advertisement format
│       └── AdvertorialEmbed.js # Advertorial iframe embed
├── dist/                       # Build output (gitignored)
├── webpack.config.js           # Webpack configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Troubleshooting

### Ad format not initializing

1. **Check global configuration:**
   ```javascript
   console.log(window.kly); // Should show site, platform, pageType
   ```

2. **Verify script is loaded:**
   ```javascript
   console.log(window.KLYCreative); // Should be defined
   ```

3. **Check console for errors:**
   - Look for `[adInventory]` messages
   - Check for format-specific error messages

### Newstag not appearing

- Ensure target elements exist in DOM
- Use `debugPreview: true` for testing without real elements
- Check site identifier matches supported sites
- Verify position is within valid range
- Check browser console for polling timeout messages

### SkinAd not showing

- Verify `platform: "desktop"` (mobile is ignored)
- Check that at least one image URL is provided
- Ensure container element exists for offset calculation
- Verify images are accessible (no CORS issues)

### AdvertorialEmbed iframe not loading

- Verify `embedURL` is correct and accessible
- Check site and pageType configuration
- Ensure target element selector exists
- Check browser console for CORS or iframe errors
- Verify iframe can communicate via postMessage

### Build issues

- **Clean build:** Run `npm run clean && npm run build`
- **Check Node version:** Requires Node.js 14+
- **Reinstall dependencies:** `rm -rf node_modules && npm install`
- **Check for errors:** Review webpack output for specific errors

### Dynamic imports not working

- Ensure you're using HTTP server (not `file://` protocol)
- Check browser console for CORS errors
- Verify chunk files are accessible
- Check manifest.json for correct file paths

## Contributing

### Adding a New Ad Format

1. Create new module in `src/modules/YourFormat.js`:
   ```javascript
   export function YourFormat(config, site, platform, doc) {
     // Your format logic
   }
   ```

2. Import in `src/global_init.js`:
   ```javascript
   const { YourFormat } = await import(/* webpackChunkName: "yourformat" */ "./modules/YourFormat.js");
   ```

3. Add to switch statement:
   ```javascript
   case "your-format":
     YourFormat(config, site, platform, doc);
     break;
   ```

4. Rebuild and test:
   ```bash
   npm run build:dev
   ```

### Code Style

- Use `camelCase` for variables and functions
- Use `PascalCase` for class names
- Document module purpose at top of file
- Use inline comments sparingly for non-obvious code
- Follow existing patterns in the codebase

### Testing New Features

1. Build in development mode: `npm run build:dev`
2. Test locally with static server
3. Verify in multiple browsers
4. Check console for errors
5. Test on different sites/platforms if applicable

## License

ISC

## Version

Current version: `1.0.1-beta.0`

---

**Note:** This library is designed for use within KLY Network platforms. Ensure proper configuration of the global `kly` object before initialization.
