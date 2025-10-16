# ============================================
# CardanoVerse - Simple Backend Deployment
# ============================================
# Quick deployment script for backend only
# ============================================

Write-Host "🚀 CardanoVerse Backend Deployment Starting..." -ForegroundColor Cyan
Write-Host ""

# Configuration
$PROJECT_ID = "cardanoverse-tradingcards"
$REGION = "us-central1"

# Check if gcloud is installed
try {
    $null = gcloud --version
    Write-Host "✅ Google Cloud SDK found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    Write-Host "Please install from: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Step 1: Setting up project..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID

Write-Host ""
Write-Host "🔧 Step 2: Enabling required APIs..." -ForegroundColor Yellow
gcloud services enable run.googleapis.com --project=$PROJECT_ID
gcloud services enable cloudbuild.googleapis.com --project=$PROJECT_ID

Write-Host ""
Write-Host "🚀 Step 3: Deploying Backend to Cloud Run..." -ForegroundColor Yellow
Write-Host "This may take 3-5 minutes..." -ForegroundColor Gray

Push-Location backend

gcloud run deploy cardanoverse-backend `
    --source . `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --project=$PROJECT_ID `
    --memory 1Gi `
    --cpu 1 `
    --timeout 60 `
    --max-instances 10 `
    --set-env-vars "NODE_ENV=production,PORT=8080,CORS_ORIGIN=https://cardanoverse-tradingcards.web.app"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Backend deployed successfully!" -ForegroundColor Green
    
    # Get the URL
    $BACKEND_URL = gcloud run services describe cardanoverse-backend `
        --platform managed `
        --region $REGION `
        --project=$PROJECT_ID `
        --format 'value(status.url)'
    
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "       DEPLOYMENT COMPLETE!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🌐 Backend URL:" -ForegroundColor Yellow
    Write-Host "   $BACKEND_URL" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Frontend URL:" -ForegroundColor Yellow
    Write-Host "   https://cardanoverse-tradingcards.web.app" -ForegroundColor White
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Update frontend/.env.production with backend URL"
    Write-Host "2. Run: cd frontend; npm run build"
    Write-Host "3. Run: firebase deploy --only hosting"
    Write-Host ""
    
    # Save URL to file
    $BACKEND_URL | Out-File -FilePath "..\BACKEND_URL.txt" -Encoding utf8
    Write-Host "✅ Backend URL saved to BACKEND_URL.txt" -ForegroundColor Green
    
    # Test backend
    Write-Host ""
    Write-Host "🧪 Testing backend health..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$BACKEND_URL/health" -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Backend health check passed!" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "⚠️  Backend health check failed (this is normal if no /health endpoint exists)" -ForegroundColor Yellow
    }
}
else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host "Check the logs above for errors" -ForegroundColor Yellow
}

Pop-Location

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
