# ⚡ Quick Start - 5 Minutes to Deployment

## TL;DR

1. Deploy backend to Railway → Copy URL
2. Update `frontend/script.js` with backend URL
3. Deploy frontend to Netlify → Done!

---

## Commands

```bash
# 1. Test Backend Locally
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

# 2. Test Frontend Locally
cd frontend
python -m http.server 8000
# Open http://localhost:8000

# 3. Deploy Backend (Railway)
# Go to railway.app → Deploy from GitHub → Select repo

# 4. Deploy Frontend (Netlify)
cd frontend
npm install -g netlify-cli
netlify deploy --prod
```

---

## File Checklist

- ✅ `backend/app.py` - Flask API
- ✅ `backend/requirements.txt` - Dependencies
- ✅ `backend/Procfile` - Railway/Render config
- ✅ `frontend/index.html` - Web UI
- ✅ `frontend/script.js` - **Update API_URL here!**
- ✅ `frontend/styles.css` - Styling
- ✅ `frontend/netlify.toml` - Netlify config

---

## Important: Update API URL

Before deploying frontend, edit `frontend/script.js` line 2:

```javascript
// CHANGE THIS:
const API_URL = 'https://your-backend-url.railway.app';

// TO YOUR ACTUAL BACKEND URL:
const API_URL = 'https://pdf-converter-production-xxxx.up.railway.app';
```

---

## Test URLs

**Test PDF:**
```
https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
```

**Health Check:**
```
https://your-backend-url.railway.app/
```

Should return:
```json
{"status": "ok", "service": "PDF to Markdown Converter API"}
```

---

## Cost

- Railway: Free (500 hrs/month)
- Netlify: Free (unlimited)
- **Total: $0/month** 🎉

---

Need more details? See `DEPLOYMENT.md` or `README.md`
