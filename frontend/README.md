# PDF to Markdown Converter - Frontend

Beautiful, modern web interface for PDF to Markdown conversion.

## Features

- 📤 Drag & drop file upload
- 🔗 URL input for remote PDFs
- 📑 Page selection options
- 📋 Copy to clipboard
- 📥 Download markdown files
- 📱 Fully responsive design

## Setup

1. Update the API URL in `script.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.railway.app';
   ```

2. Deploy to Netlify:
   ```bash
   # Option 1: Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod
   
   # Option 2: Drag & Drop
   Visit https://app.netlify.com/drop
   ```

## Local Development

```bash
# Simple HTTP server
python -m http.server 8000

# Or use any static file server
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Configuration

Edit `script.js` to change:
- API endpoint
- File size limits
- Timeout settings

Edit `styles.css` to customize:
- Colors (CSS variables in `:root`)
- Fonts
- Layout
- Animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Deployment

### Netlify (Recommended)

1. **GitHub Integration**
   - Push to GitHub
   - Import project in Netlify
   - Set publish directory to `frontend/`

2. **CLI Deploy**
   ```bash
   netlify deploy --prod --dir=.
   ```

3. **Drag & Drop**
   - Zip the frontend folder
   - Drop at app.netlify.com/drop

## File Structure

```
frontend/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Frontend logic
├── netlify.toml    # Netlify configuration
└── README.md       # This file
```

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;  /* Change this */
    --success-color: #10b981;  /* And this */
    /* ... */
}
```

### Add Features
Modify `script.js` to add:
- File validation
- Progress tracking
- Error handling
- Analytics
