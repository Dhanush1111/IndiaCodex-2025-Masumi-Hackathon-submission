# ============================================
# CardanoVerse - Deploy All Services
# ============================================
# Deploys Backend, Masumi, and Sokosumi
# ============================================

Write-Host "🚀 CardanoVerse Complete Deployment" -ForegroundColor Cyan
Write-Host ""

$PROJECT_ID = "cardanoverse-tradingcards"
$REGION = "us-central1"

# Check prerequisites
try {
    $null = gcloud --version
    Write-Host "✅ Google Cloud SDK found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Setting up project..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID

Write-Host ""
Write-Host "Enabling APIs..." -ForegroundColor Yellow
gcloud services enable run.googleapis.com cloudbuild.googleapis.com --project=$PROJECT_ID

# Deploy Backend
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  1/3 Deploying Backend" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

Push-Location backend
gcloud run deploy cardanoverse-backend --source . --platform managed --region $REGION --allow-unauthenticated --project=$PROJECT_ID --memory 1Gi --set-env-vars "NODE_ENV=production,PORT=8080"
$BACKEND_URL = gcloud run services describe cardanoverse-backend --platform managed --region $REGION --project=$PROJECT_ID --format 'value(status.url)'
$BACKEND_URL | Out-File -FilePath "..\BACKEND_URL.txt" -Encoding utf8
Pop-Location

Write-Host "✅ Backend: $BACKEND_URL" -ForegroundColor Green

# Deploy Masumi
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  2/3 Deploying Masumi Network" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

Push-Location masumi-integration
gcloud run deploy cardanoverse-masumi --source . --platform managed --region $REGION --allow-unauthenticated --project=$PROJECT_ID --memory 512Mi
$MASUMI_URL = gcloud run services describe cardanoverse-masumi --platform managed --region $REGION --project=$PROJECT_ID --format 'value(status.url)'
$MASUMI_URL | Out-File -FilePath "..\MASUMI_URL.txt" -Encoding utf8
Pop-Location

Write-Host "✅ Masumi: $MASUMI_URL" -ForegroundColor Green

# Deploy Sokosumi
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  3/3 Deploying Sokosumi AI" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

Push-Location sokosumi-mcp
gcloud run deploy cardanoverse-sokosumi --source . --platform managed --region $REGION --allow-unauthenticated --project=$PROJECT_ID --memory 1Gi --cpu 2
$SOKOSUMI_URL = gcloud run services describe cardanoverse-sokosumi --platform managed --region $REGION --project=$PROJECT_ID --format 'value(status.url)'
$SOKOSUMI_URL | Out-File -FilePath "..\SOKOSUMI_URL.txt" -Encoding utf8
Pop-Location

Write-Host "✅ Sokosumi: $SOKOSUMI_URL" -ForegroundColor Green

# Create frontend env file
Write-Host ""
Write-Host "Creating frontend environment file..." -ForegroundColor Yellow

$WS_URL = $BACKEND_URL -replace "https://", "wss://"

@"
VITE_API_URL=$BACKEND_URL
VITE_WS_URL=$WS_URL
VITE_MASUMI_URL=$MASUMI_URL
VITE_NETWORK=mainnet
"@ | Out-File -FilePath "frontend\.env.production" -Encoding utf8

Write-Host "✅ Frontend .env.production created" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    DEPLOYMENT COMPLETE! 🎉" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Service URLs:" -ForegroundColor Yellow
Write-Host "   Backend:  $BACKEND_URL" -ForegroundColor White
Write-Host "   Masumi:   $MASUMI_URL" -ForegroundColor White
Write-Host "   Sokosumi: $SOKOSUMI_URL" -ForegroundColor White
Write-Host "   Frontend: https://cardanoverse-tradingcards.web.app" -ForegroundColor White
Write-Host ""
Write-Host "📝 Next Step:" -ForegroundColor Yellow
Write-Host "   cd frontend && npm run build && firebase deploy --only hosting" -ForegroundColor White
Write-Host ""
