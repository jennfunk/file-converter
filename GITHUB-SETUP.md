# 🚀 GitHub Setup Guide

## Quick Steps to Push to GitHub

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name:** `pdf-converter-web` (or your choice)
   - **Description:** "Web app to convert PDFs to Markdown with drag & drop interface"
   - **Visibility:** Public (or Private)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

### 2. Push Your Code

GitHub will show you commands. Use these:

```bash
cd /Users/jfunk/Projects/claude-skills/pdf-converter-web

# Add your GitHub repo as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/pdf-converter-web.git

# Rename branch to main (optional, if you prefer main over master)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your GitHub username!

### 3. Verify

Visit your GitHub repo URL and you should see all the files!

---

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
cd /Users/jfunk/Projects/claude-skills/pdf-converter-web

# Create repo and push in one command
gh repo create pdf-converter-web --public --source=. --push
```

---

## After Pushing to GitHub

Now you can proceed with deployment:

### Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `pdf-converter-web`
5. Railway will ask which directory - select **`backend/`**
6. Wait 2-3 minutes
7. Copy the deployment URL (e.g., `https://pdf-converter-backend-production-xxxx.up.railway.app`)

### Update Frontend

```bash
# Edit frontend/script.js line 2
# Replace: const API_URL = 'https://your-backend-url.railway.app';
# With your actual Railway URL
```

Then commit and push the change:
```bash
git add frontend/script.js
git commit -m "Update API URL with Railway backend"
git push
```

### Deploy Frontend to Netlify

**Option 1: GitHub Integration**
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select `pdf-converter-web` repo
5. Configure:
   - **Base directory:** `frontend`
   - **Publish directory:** `.` (or leave empty)
6. Click **"Deploy site"**

**Option 2: Drag & Drop**
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `frontend/` folder
3. Done!

---

## Current Status ✅

- ✅ Git repo initialized
- ✅ Initial commit created
- ⏳ Need to push to GitHub
- ⏳ Need to deploy backend
- ⏳ Need to update frontend with backend URL
- ⏳ Need to deploy frontend

---

## Troubleshooting

### Authentication Issues

If you get authentication errors, use a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing:
   ```bash
   git push -u origin main
   # Username: YOUR-USERNAME
   # Password: ghp_your_token_here
   ```

Or set up SSH keys for easier access.

---

## Next Steps

1. ✅ You've already done: Initialize repo and commit
2. 🔄 **Do now**: Create GitHub repo and push
3. 🔄 **Then**: Follow DEPLOYMENT.md to deploy backend and frontend

Good luck! 🚀
