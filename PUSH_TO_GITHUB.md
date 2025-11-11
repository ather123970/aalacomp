# 🚀 Push to GitHub - Fresh Start

## Commands to Empty Repo and Push Fresh Code

Run these commands in order:

```bash
cd c:\Users\MicroZaib\Music\luxe-tick-forge-main

# Remove existing git (if any)
rmdir /s /q .git

# Initialize fresh git repository
git init

# Add all files
git add .

# Commit
git commit -m "Production ready - Full e-commerce store with CRUD admin"

# Set main branch
git branch -M main

# Add remote
git remote add origin https://github.com/ather123970/aalacomp.git

# Force push to empty and replace repo
git push -u -f origin main
```

This will:
1. ✅ Remove old git history
2. ✅ Create fresh repository
3. ✅ Empty your GitHub repo
4. ✅ Push all new code

**The `-f` flag forces the push and empties the existing repo!**
