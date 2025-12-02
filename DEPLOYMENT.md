# 🚀 Quick Deployment Guide

Follow these steps to deploy your PDF to Markdown converter in under 10 minutes.

## Step-by-Step Deployment

### 1️⃣ Deploy Backend First

Choose either Railway (easier) or Render:

#### Railway (Recommended) ⚡

1. Visit [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository
6. Click **"Add variables"** → None needed for basic setup
7. Railway will automatically:
   - Detect it's a Python app
   - Install dependencies from `requirements.txt`
   - Start the app with `gunicorn`
8. Wait 2-3 minutes for deployment
9. Copy your deployment URL (looks like: `https://pdf-converter-backend-production-xxxx.up.railway.app`)

**Cost:** Free tier includes 500 hours/month

#### Render (Alternative) 🎨

1. Visit [render.com](https://render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `pdf-converter-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Instance Type:** `Free`
5. Click **"Create Web Service"**
6. Wait 3-5 minutes for deployment
7. Copy your deployment URL (looks like: `https://pdf-converter-backend.onrender.com`)

**Cost:** Free tier available (sleeps after inactivity)

---

### 2️⃣ Update Frontend with Backend URL

1. Open `frontend/script.js` in your editor
2. Find line 2:
   ```javascript
   const API_URL = 'https://your-backend-url.railway.app';
   ```
3. Replace with your actual backend URL:
   ```javascript
   const API_URL = 'https://pdf-converter-backend-production-xxxx.up.railway.app';
   ```
4. Save the file

---

### 3️⃣ Deploy Frontend to Netlify

#### Option A: Drag & Drop (Fastest) 🖱️

1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `frontend/` folder onto the page
3. Wait 30 seconds
4. Done! Copy your site URL

#### Option B: GitHub Integration (Recommended for Updates) 🔄

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add PDF converter web app"
   git push origin main
   ```

2. Visit [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Select your repository
6. Configure:
   - **Base directory:** `frontend`
   - **Build command:** (leave empty)
   - **Publish directory:** `.` or `frontend`
7. Click **"Deploy site"**
8. Wait 1 minute
9. Copy your site URL (looks like: `https://pdf-converter-xxxx.netlify.app`)

#### Option C: Netlify CLI 💻

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod

# Follow prompts:
# - Create & configure new site: Yes
# - Publish directory: . (current directory)
```

**Cost:** Free tier includes unlimited bandwidth

---

### 4️⃣ Test Your Deployment ✅

1. Visit your Netlify URL
2. Try uploading a PDF file
3. Try converting a PDF from URL (test with: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`)
4. Verify the conversion works
5. Test the copy and download features

---

## 🎉 You're Done!

Your app is now live! Share your Netlify URL with anyone who needs to convert PDFs to Markdown.

---

## 📝 Optional: Custom Domain

### Netlify Custom Domain

1. Go to your Netlify site dashboard
2. Click **"Domain settings"**
3. Click **"Add custom domain"**
4. Follow the DNS setup instructions
5. Wait for SSL certificate (automatic, ~1 minute)

### Railway Custom Domain

1. Go to your Railway project
2. Click **"Settings"**
3. Under **"Domains"**, click **"Add domain"**
4. Enter your domain and configure DNS

---

## 🔧 Troubleshooting

### Backend won't start
- Check logs in Railway/Render dashboard
- Verify `requirements.txt` has all dependencies
- Ensure Python version is 3.11+

### Frontend can't reach backend
- Verify API_URL in `script.js` is correct
- Check backend is running (visit backend URL directly)
- Check browser console for CORS errors

### CORS errors
- Backend should have `flask-cors` installed
- Check `CORS(app)` is in `app.py`

### Conversion fails
- Check PDF is valid
- Verify backend has enough memory (upgrade plan if needed)
- Check backend logs for specific error

---

## 💰 Cost Summary

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| Railway | 500 hrs/month | $5/month for more hours |
| Render | Free (sleeps) | $7/month for always-on |
| Netlify | Unlimited | $19/month for pro features |

**Total for basic usage:** $0/month 🎉

---

## 📚 Next Steps

- Add authentication for private use
- Implement rate limiting
- Add analytics
- Custom branding/styling
- Database for conversion history

Need help? Check the main README.md for detailed documentation.
