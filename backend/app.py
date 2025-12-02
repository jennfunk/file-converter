#!/usr/bin/env python3
"""
PDF to Markdown Converter API
Flask backend for converting PDFs to Markdown format.
"""

import os
import tempfile
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlretrieve
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymupdf4llm

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

def is_url(path):
    """Check if the path is a URL."""
    try:
        result = urlparse(path)
        return all([result.scheme, result.netloc])
    except:
        return False


@app.route('/')
def home():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'service': 'PDF to Markdown Converter API',
        'version': '1.0.0'
    })


@app.route('/convert', methods=['POST'])
def convert_pdf():
    """
    Convert PDF to Markdown.
    
    Accepts either:
    - File upload (multipart/form-data with 'file' field)
    - URL (JSON with 'url' field)
    
    Optional parameters:
    - pages: Comma-separated page numbers (e.g., "1,2,3")
    - remove_strikethrough: Boolean to remove strikethrough formatting
    """
    temp_file = None
    uploaded_file = None
    
    try:
        # Check if this is a file upload or URL request
        if 'file' in request.files:
            # Handle file upload
            uploaded_file = request.files['file']
            if uploaded_file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            if not uploaded_file.filename.lower().endswith('.pdf'):
                return jsonify({'error': 'File must be a PDF'}), 400
            
            # Save uploaded file temporarily
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            uploaded_file.save(temp_file.name)
            temp_file.close()
            local_path = temp_file.name
            
        elif request.is_json and 'url' in request.json:
            # Handle URL download
            pdf_url = request.json['url']
            
            if not is_url(pdf_url):
                return jsonify({'error': 'Invalid URL provided'}), 400
            
            # Download PDF from URL
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            temp_file.close()
            urlretrieve(pdf_url, temp_file.name)
            local_path = temp_file.name
            
        else:
            return jsonify({'error': 'No file or URL provided'}), 400
        
        # Get optional parameters
        pages = None
        remove_strikethrough = False
        
        if 'pages' in request.form:
            pages_str = request.form['pages']
            if pages_str:
                try:
                    pages = [int(p.strip()) for p in pages_str.split(',')]
                except ValueError:
                    return jsonify({'error': 'Pages must be comma-separated integers'}), 400
        elif request.is_json and 'pages' in request.json:
            pages_str = request.json['pages']
            if pages_str:
                try:
                    pages = [int(p.strip()) for p in str(pages_str).split(',')]
                except ValueError:
                    return jsonify({'error': 'Pages must be comma-separated integers'}), 400
        
        if 'remove_strikethrough' in request.form:
            remove_strikethrough = request.form['remove_strikethrough'].lower() in ['true', '1', 'yes']
        elif request.is_json and 'remove_strikethrough' in request.json:
            remove_strikethrough = bool(request.json['remove_strikethrough'])
        
        # Convert PDF to Markdown
        if pages:
            md_text = pymupdf4llm.to_markdown(local_path, pages=pages)
        else:
            md_text = pymupdf4llm.to_markdown(local_path)
        
        # Remove strikethrough if requested
        if remove_strikethrough:
            md_text = md_text.replace('~~', '')
        
        return jsonify({
            'success': True,
            'markdown': md_text,
            'pages_converted': pages if pages else 'all'
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Error converting PDF: {str(e)}'
        }), 500
    
    finally:
        # Clean up temporary file
        if temp_file:
            try:
                Path(temp_file.name).unlink()
            except:
                pass


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
