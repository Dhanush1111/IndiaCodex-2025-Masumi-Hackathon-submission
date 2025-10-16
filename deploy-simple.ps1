# CardanoVerse Backend Deployment
Write-Host "🚀 Deploying Backend to Cloud Run..." -ForegroundColor Cyan
Write-Host ""

$PROJECT_ID = "cardanoverse-tradingcards"
$REGION = "us-central1"

# Check gcloud
try {
    $null = gcloud --version
    Write-Host "✅ Google Cloud SDK found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    Write-Host "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

Write-Host ""
Write-Host "Setting project..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID

Write-Host ""
Write-Host "Enabling APIs..." -ForegroundColor Yellow
gcloud services enable run.googleapis.com cloudbuild.googleapis.com --project=$PROJECT_ID

Write-Host ""
Write-Host "Deploying backend (this takes 3-5 minutes)..." -ForegroundColor Yellow

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
    --set-env-vars="NODE_ENV=production,PORT=8080,CORS_ORIGIN=https://cardanoverse-tradingcards.web.app"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Backend deployed!" -ForegroundColor Green
    
    $BACKEND_URL = gcloud run services describe cardanoverse-backend `
        --platform managed `
        --region $REGION `
        --project=$PROJECT_ID `
        --format 'value(status.url)'
    
    Write-Host ""
    Write-Host "Backend URL: $BACKEND_URL" -ForegroundColor Cyan
    $BACKEND_URL | Out-File -FilePath "..\BACKEND_URL.txt" -Encoding utf8
}

Pop-Location

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
