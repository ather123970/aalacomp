@echo off
echo.
echo ========================================
echo  Pushing to GitHub (Empty & Replace)
echo ========================================
echo.
echo Repository: https://github.com/ather123970/aalacomp.git
echo.
echo This will:
echo  1. Remove old git history
echo  2. Create fresh repository
echo  3. EMPTY your GitHub repo
echo  4. Push all new code
echo.
pause
echo.
echo Starting...
echo.

REM Remove existing .git folder
if exist .git (
    echo Removing old git repository...
    rmdir /s /q .git
    echo Done!
    echo.
)

REM Initialize fresh git repository
echo Initializing git...
git init
echo.

REM Add all files
echo Adding all files...
git add .
echo.

REM Commit
echo Committing...
git commit -m "Production ready - Full e-commerce store with CRUD admin"
echo.

REM Set main branch
echo Setting main branch...
git branch -M main
echo.

REM Add remote
echo Adding remote...
git remote add origin https://github.com/ather123970/aalacomp.git
echo.

REM Force push
echo Force pushing to GitHub (this empties the repo)...
git push -u -f origin main
echo.

echo.
echo ========================================
echo  SUCCESS! Code pushed to GitHub!
echo ========================================
echo.
echo Your repository: https://github.com/ather123970/aalacomp
echo.
echo Next: Deploy to Render
echo.
pause
