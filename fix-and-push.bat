@echo off
echo.
echo ========================================
echo  Pushing Updated Files to GitHub
echo ========================================
echo.

echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Add start script and serve dependency for Render"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  SUCCESS! Updated files pushed!
echo ========================================
echo.
echo Now trigger a redeploy on Render dashboard
echo or it will auto-deploy in a moment.
echo.
pause
