# 📄 PDF to Markdown Converter

A beautiful web application that converts PDF files to clean Markdown format with table extraction. Features a modern UI hosted on Netlify with a Python backend on Railway/Render.

![PDF Converter](https://img.shields.io/badge/PDF-Markdown-blue)
![Python](https://img.shields.io/badge/Python-3.11-green)
![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey)

## ✨ Features

- 📤 **Multiple Upload Options**: Drag & drop files or enter PDF URLs
- 📑 **Page Selection**: Convert specific pages or entire documents
- 🎨 **Clean UI**: Modern, responsive design with smooth animations
- 📋 **Copy to Clipboard**: One-click markdown copying
- 📥 **Download**: Save converted markdown files
- ⚙️ **Options**: Remove strikethrough formatting
- 🚀 **Fast & Reliable**: Separate frontend/backend architecture

## 🏗️ Architecture

This project uses a **hybrid architecture** for optimal performance:

- **Frontend**: Static site on Netlify (HTML/CSS/JS)
- **Backend**: Python API on Railway or Render (Flask + PyMuPDF)

This separation ensures:
- No timeout issues with large PDFs
- Better handling of heavy dependencies
- Scalable infrastructure
- Free tier availability

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- A Netlify account (free)
- A Railway or Render account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pdf-converter-web
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
   Backend will run on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend
   # Update API_URL in script.js to http://localhost:5000
   # Open index.html in your browser or use a local server:
   python -m http.server 8000
   ```
   Frontend will run on `http://localhost:8000`

## 📦 Deployment

### Step 1: Deploy Backend (Choose Railway OR Render)

#### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend/`
5. Railway will auto-detect the configuration
6. Copy your deployment URL (e.g., `https://your-app.railway.app`)

#### Option B: Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Click "Create Web Service"
6. Copy your deployment URL (e.g., `https://your-app.onrender.com`)

### Step 2: Deploy Frontend (Netlify)

1. **Update API URL**
   - Edit `frontend/script.js`
   - Change `const API_URL = 'https://your-backend-url.railway.app'` to your actual backend URL

2. **Deploy to Netlify**
   ```bash
   cd frontend
   # Option 1: Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod
   
   # Option 2: Drag & Drop
   # Go to https://app.netlify.com/drop
   # Drag the frontend folder
   ```

3. **Or use GitHub Integration**
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Set publish directory to `frontend/`
   - Deploy!

### Step 3: Test Your Deployment

Visit your Netlify URL and try converting a PDF!

## 🛠️ Development

### Backend API Endpoints

#### `GET /`
Health check endpoint
```json
{
  "status": "ok",
  "service": "PDF to Markdown Converter API",
  "version": "1.0.0"
}
```

#### `POST /convert`
Convert PDF to Markdown

**Request (File Upload)**
```bash
curl -X POST http://localhost:5000/convert \
  -F "file=@document.pdf" \
  -F "pages=1,2,3" \
  -F "remove_strikethrough=true"
```

**Request (URL)**
```bash
curl -X POST http://localhost:5000/convert \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/document.pdf",
    "pages": "1,2,3",
    "remove_strikethrough": true
  }'
```

**Response**
```json
{
  "success": true,
  "markdown": "# Document Content...",
  "pages_converted": [1, 2, 3]
}
```

### Project Structure

```
pdf-converter-web/
├── backend/
│   ├── app.py              # Flask API
│   ├── requirements.txt    # Python dependencies
│   ├── Procfile           # For Railway/Render
│   ├── runtime.txt        # Python version
│   ├── railway.json       # Railway config
│   └── render.yaml        # Render config
├── frontend/
│   ├── index.html         # Main page
│   ├── styles.css         # Styling
│   ├── script.js          # Frontend logic
│   └── netlify.toml       # Netlify config
└── README.md
```

## 🎨 Customization

### Styling
Edit `frontend/styles.css` to customize colors, fonts, and layout. CSS variables are defined in `:root` for easy theming:

```css
:root {
    --primary-color: #4f46e5;
    --primary-hover: #4338ca;
    /* ... */
}
```

### Backend Options
Modify `backend/app.py` to add features like:
- Authentication
- Rate limiting
- Custom conversion options
- File size limits

## 🐛 Troubleshooting

### "Failed to convert PDF"
- Check that your backend is deployed and running
- Verify the API_URL in `frontend/script.js` is correct
- Check backend logs for errors

### CORS Errors
- Ensure `flask-cors` is installed in backend
- Verify CORS is enabled in `app.py`

### Large PDF Timeouts
- Railway/Render have timeout limits (usually 5-10 minutes)
- For very large PDFs, consider splitting into smaller files

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

## 🙏 Credits

Built with:
- [PyMuPDF](https://github.com/pymupdf/PyMuPDF) for PDF processing
- [Flask](https://flask.palletsprojects.com/) for the API
- [Netlify](https://netlify.com) for frontend hosting
- [Railway](https://railway.app) / [Render](https://render.com) for backend hosting

---

Made with ❤️ for easy PDF to Markdown conversion
