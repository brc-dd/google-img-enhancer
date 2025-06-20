# Google Images Enhancer

Google Images Enhancer is a Chromium extension that automatically replaces Instagram preview images on Google search results with their high-resolution versions.

## Installation

1. Clone or download this repository:

   ```bash
   git clone https://github.com/brc-dd/google-img-enhancer.git
   ```

2. Open Chrome (or another Chromium-based browser) and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the root directory of this repository.
5. The **Google Images Enhancer** extension should now appear in your extensions list.

## Usage

1. Go to [Google Search](https://www.google.com/) and perform a search that includes Instagram post thumbnails.
2. Whenever an Instagram thumbnail appears in image results, it will be upgraded to the full-resolution image automatically.

## Compatibility

- Tested on the latest Arc browser (v137). Should work fine on Google Chrome and other Chromium-based browsers.
- Currently supports Instagram images only. Future updates may include support for other image sources.
- Limitations:
  - IGTV and stories are not supported.
  - Search results that link to Instagram profiles or other non-post pages are not supported, as the extension cannot resolve the associated HD image.
  - For posts containing multiple images, only the first image will be retrieved. This may not match the thumbnail shown in the search result. There is currently no reliable way to determine which image corresponds to the preview, or if the post has multiple images.
  - In rare cases, Instagram may throttle requests or return fallback pages. These are detected and excluded to avoid broken or incorrect thumbnails.

## Development

To install developer dependencies and run type checks:

```bash
pnpm install
pnpm tsc --noEmit
```

Modify `content.js`, `background.js`, or `ruleset.json` as needed and reload the extension in `chrome://extensions` to see your changes.

### File Structure

```
├── background.js        # Service worker fetching HD images and converting to data URIs
├── content.js           # Content script that swaps Instagram thumbnails for HD versions
├── manifest.json        # Manifest V3 configuration and permissions
├── ruleset.json         # Declarative Net Request rules for CORS header injection
├── package.json         # Development dependencies (TypeScript, Chrome types)
└── tsconfig.json        # TypeScript/JSDoc compiler options
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/brc-dd/static/sponsors.svg">
    <img alt="Sponsors" src="https://cdn.jsdelivr.net/gh/brc-dd/static/sponsors.svg"/>
  </a>
</p>
