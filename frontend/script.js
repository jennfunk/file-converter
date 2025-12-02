// Configuration
const API_URL = 'https://file-converter-production-4a66.up.railway.app';

// State
let selectedFile = null;

// DOM Elements
const uploadTab = document.getElementById('upload-tab');
const urlTab = document.getElementById('url-tab');
const tabButtons = document.querySelectorAll('.tab-button');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const urlInput = document.getElementById('urlInput');
const urlConvertBtn = document.getElementById('urlConvertBtn');
const optionsPanel = document.getElementById('optionsPanel');
const convertBtn = document.getElementById('convertBtn');
const progressBar = document.getElementById('progressBar');
const resultPanel = document.getElementById('resultPanel');
const errorPanel = document.getElementById('errorPanel');
const pagesInput = document.getElementById('pagesInput');
const strikethroughCheckbox = document.getElementById('strikethroughCheckbox');
const markdownOutput = document.getElementById('markdownOutput');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const convertAnotherBtn = document.getElementById('convertAnotherBtn');
const dismissErrorBtn = document.getElementById('dismissErrorBtn');
const errorMessage = document.getElementById('errorMessage');

// Tab Switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Reset state
        resetForm();
    });
});

// File Upload - Drag & Drop
dropZone.addEventListener('click', () => fileInput.click());
browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
        showError('Please select a PDF file');
        return;
    }
    
    selectedFile = file;
    
    // Update UI
    dropZone.querySelector('.upload-icon').textContent = '📄';
    dropZone.querySelector('.upload-text').textContent = file.name;
    dropZone.querySelector('.upload-subtext').textContent = `${formatFileSize(file.size)} • Ready to convert`;
    dropZone.querySelector('.btn').style.display = 'none';
    
    // Show options
    optionsPanel.style.display = 'block';
}

// URL Convert
urlConvertBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Please enter a URL');
        return;
    }
    
    if (!isValidUrl(url)) {
        showError('Please enter a valid URL');
        return;
    }
    
    if (!url.toLowerCase().endsWith('.pdf')) {
        showError('URL must point to a PDF file');
        return;
    }
    
    convertFromUrl(url);
});

// Convert Button
convertBtn.addEventListener('click', () => {
    if (selectedFile) {
        convertFile(selectedFile);
    }
});

// Copy to Clipboard
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(markdownOutput.value);
        
        // Update button text temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        showError('Failed to copy to clipboard');
    }
});

// Download Markdown
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([markdownOutput.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Convert Another
convertAnotherBtn.addEventListener('click', () => {
    resetForm();
});

// Dismiss Error
dismissErrorBtn.addEventListener('click', () => {
    errorPanel.style.display = 'none';
});

// Conversion Functions
async function convertFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const pages = pagesInput.value.trim();
    if (pages) {
        formData.append('pages', pages);
    }
    
    formData.append('remove_strikethrough', strikethroughCheckbox.checked);
    
    await performConversion(formData);
}

async function convertFromUrl(url) {
    const body = {
        url: url
    };
    
    const pages = pagesInput.value.trim();
    if (pages) {
        body.pages = pages;
    }
    
    body.remove_strikethrough = strikethroughCheckbox.checked;
    
    await performConversion(body, true);
}

async function performConversion(data, isJson = false) {
    // Hide panels
    optionsPanel.style.display = 'none';
    resultPanel.style.display = 'none';
    errorPanel.style.display = 'none';
    
    // Show progress
    progressBar.style.display = 'block';
    
    try {
        const options = {
            method: 'POST',
            body: isJson ? JSON.stringify(data) : data
        };
        
        if (isJson) {
            options.headers = {
                'Content-Type': 'application/json'
            };
        }
        
        const response = await fetch(`${API_URL}/convert`, options);
        const result = await response.json();
        
        progressBar.style.display = 'none';
        
        if (!response.ok) {
            throw new Error(result.error || 'Conversion failed');
        }
        
        // Show result
        markdownOutput.value = result.markdown;
        resultPanel.style.display = 'block';
        
    } catch (error) {
        progressBar.style.display = 'none';
        showError(error.message || 'Failed to convert PDF. Please try again.');
    }
}

// Helper Functions
function resetForm() {
    selectedFile = null;
    fileInput.value = '';
    urlInput.value = '';
    pagesInput.value = '';
    strikethroughCheckbox.checked = false;
    
    dropZone.querySelector('.upload-icon').textContent = '📎';
    dropZone.querySelector('.upload-text').textContent = 'Drag & drop your PDF here';
    dropZone.querySelector('.upload-subtext').textContent = 'or';
    dropZone.querySelector('.btn').style.display = 'inline-block';
    
    optionsPanel.style.display = 'none';
    progressBar.style.display = 'none';
    resultPanel.style.display = 'none';
    errorPanel.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorPanel.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorPanel.style.display = 'none';
    }, 5000);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Initialize
console.log('PDF to Markdown Converter initialized');
console.log('API URL:', API_URL);
