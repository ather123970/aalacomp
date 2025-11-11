# 🚀 Render Deployment - Quick Reference

## ⚡ Commands for Render

When setting up your Web Service on Render, use these exact commands:

### **Build Command:**
```bash
npm install && npm run build
```

### **Start Command:**
```bash
npm run start
```

### **Environment:**
- **Environment**: Node
- **Node Version**: 18.17.0 or higher
- **Branch**: main

---

## 📋 Step-by-Step

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Go to Render.com** → Sign up/Login

3. **New Web Service** → Connect GitHub → Select `aalacomp`

4. **Configure**:
   - Name: `chronos-watch-store`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Environment: `Node`

5. **Create Web Service** → Wait 3-5 minutes

6. **Done!** Your store is live at: `https://YOUR-SERVICE.onrender.com`

---

## ✅ Configuration Files Ready

Your project already includes:

✅ `render.yaml` - Auto-configuration  
✅ `package.json` - Start script added  
✅ `serve` package - Installed  
✅ `.gitignore` - Configured  

Just push and deploy!

---

## 🎯 Quick Test

After deployment:
- Visit: `https://YOUR-SERVICE.onrender.com`
- Admin: `https://YOUR-SERVICE.onrender.com/admin`
- Login: `admin` / `admin123`

---

## 📚 Full Guide

Read `RENDER_DEPLOYMENT.md` for:
- Detailed instructions
- Troubleshooting
- Custom domains
- Environment variables
- Performance tips

---

**You're ready to deploy!** 🚀
