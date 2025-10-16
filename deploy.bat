@echo off
REM ====================================
REM CardanoVerse - Quick Backend Deploy
REM ====================================

echo.
echo ============================================
echo   CardanoVerse Backend Deployment
echo ============================================
echo.

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Google Cloud SDK not found!
    echo Please install from: https://cloud.google.com/sdk/docs/install
    pause
    exit /b 1
)

echo [OK] Google Cloud SDK found
echo.

REM Set project
echo Setting project...
gcloud config set project cardanoverse-tradingcards

REM Enable APIs
echo.
echo Enabling required APIs...
gcloud services enable run.googleapis.com cloudbuild.googleapis.com --project=cardanoverse-tradingcards

REM Deploy backend
echo.
echo ============================================
echo   Deploying Backend to Cloud Run...
echo   This will take 3-5 minutes...
echo ============================================
echo.

cd backend

gcloud run deploy cardanoverse-backend ^
    --source . ^
    --platform managed ^
    --region us-central1 ^
    --allow-unauthenticated ^
    --project=cardanoverse-tradingcards ^
    --memory 1Gi ^
    --cpu 1 ^
    --timeout 60 ^
    --max-instances 10 ^
    --set-env-vars="NODE_ENV=production,PORT=8080,CORS_ORIGIN=https://cardanoverse-tradingcards.web.app"

if %ERRORLEVEL% equ 0 (
    echo.
    echo ============================================
    echo   DEPLOYMENT SUCCESSFUL!
    echo ============================================
    echo.
    
    REM Get backend URL
    for /f "delims=" %%i in ('gcloud run services describe cardanoverse-backend --platform managed --region us-central1 --project=cardanoverse-tradingcards --format="value(status.url)"') do set BACKEND_URL=%%i
    
    echo Backend URL: %BACKEND_URL%
    echo.
    echo URL saved to BACKEND_URL.txt
    echo %BACKEND_URL% > ..\BACKEND_URL.txt
    
    echo.
    echo Next steps:
    echo 1. Update frontend/.env.production with backend URL
    echo 2. cd frontend ^&^& npm run build
    echo 3. firebase deploy --only hosting
    echo.
) else (
    echo.
    echo [ERROR] Deployment failed!
    echo Check the error messages above.
    echo.
)

cd ..

echo.
pause
