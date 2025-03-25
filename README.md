# DocVideo Converter

A simple web tool to convert Tango iframe embeds into DocVideo components for Confluence.

## How to Use

1. Copy the iframe embed code from Tango
2. Paste it into the converter
3. Click "Convert"
4. Copy the generated DocVideo component code
5. Paste it into your Confluence page

## Hosting

This is a static website that can be hosted on any web server. To host it:

1. Upload all files to your web server
2. Ensure the following files are included:
   - `index.html`
   - `style.css`
   - `dist/script.js`

## Development

To run locally:
1. Install TypeScript: `npm install -g typescript`
2. Compile TypeScript: `tsc`
3. Serve the files using any static file server
