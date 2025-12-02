# PDF to Markdown Converter - Backend API

Flask-based REST API for converting PDF files to Markdown format.

## Features

- Convert PDFs from file uploads or URLs
- Select specific pages for conversion
- Remove strikethrough formatting
- CORS enabled for frontend requests
- Production-ready with Gunicorn

## Local Development

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python app.py
   ```

Server will start on `http://localhost:5000`

## API Documentation

### Health Check
```
GET /
```

### Convert PDF
```
POST /convert
```

**Parameters:**
- `file`: PDF file (multipart/form-data)
- `url`: PDF URL (JSON)
- `pages`: Comma-separated page numbers (optional)
- `remove_strikethrough`: Boolean (optional)

**Example:**
```bash
curl -X POST http://localhost:5000/convert \
  -F "file=@document.pdf" \
  -F "pages=1,2,3"
```

## Deployment

### Railway
1. Connect GitHub repository
2. Set root directory to `backend/`
3. Deploy automatically

### Render
1. Create new Web Service
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn app:app`

## Environment Variables

- `PORT`: Server port (default: 5000)

## Dependencies

- Flask 3.0.0
- flask-cors 4.0.0
- pymupdf4llm 0.0.17
- gunicorn 21.2.0
