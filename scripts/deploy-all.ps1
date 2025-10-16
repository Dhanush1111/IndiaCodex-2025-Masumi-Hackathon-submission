# ====================================
# CardanoVerse Complete Deployment Script (PowerShell)
# ====================================
# This script deploys all services to Google Cloud Platform
# For Windows users
# ====================================

# Set error action preference
$ErrorActionPreference = "Stop"

# Configuration
$PROJECT_ID = "cardanoverse-tradingcards"
$REGION = "us-central1"
$BACKEND_SERVICE = "cardanoverse-backend"
$MASUMI_SERVICE = "cardanoverse-masumi"
$SOKOSUMI_SERVICE = "cardanoverse-sokosumi"
$CREWAI_SERVICE = "cardanoverse-crewai"

# Colors for output
function Write-Status {
    Write-Host "[INFO] $args" -ForegroundColor Blue
}

function Write-Success {
    Write-Host "[SUCCESS] $args" -ForegroundColor Green
}

function Write-Warning {
    Write-Host "[WARNING] $args" -ForegroundColor Yellow
}

function Write-Error {
    Write-Host "[ERROR] $args" -ForegroundColor Red
}

# Function to check if gcloud is installed
function Test-GCloud {
    try {
        $null = gcloud --version
        Write-Success "gcloud CLI found"
        return $true
    }
    catch {
        Write-Error "gcloud CLI not found. Please install it first:"
        Write-Host "https://cloud.google.com/sdk/docs/install"
        return $false
    }
}

# Function to set project
function Set-GCPProject {
    Write-Status "Setting GCP project to $PROJECT_ID..."
    gcloud config set project $PROJECT_ID
    Write-Success "Project set to $PROJECT_ID"
}

# Function to enable required APIs
function Enable-APIs {
    Write-Status "Enabling required GCP APIs..."
    
    $apis = @(
        "run.googleapis.com",
        "cloudbuild.googleapis.com",
        "sqladmin.googleapis.com",
        "redis.googleapis.com",
        "secretmanager.googleapis.com",
        "compute.googleapis.com"
    )
    
    foreach ($api in $apis) {
        Write-Status "Enabling $api..."
        gcloud services enable $api --project=$PROJECT_ID
    }
    
    Write-Success "All APIs enabled"
}

# Function to deploy backend
function Deploy-Backend {
    Write-Status "Deploying backend to Cloud Run..."
    
    Push-Location backend
    
    gcloud run deploy $BACKEND_SERVICE `
        --source . `
        --platform managed `
        --region $REGION `
        --allow-unauthenticated `
        --project=$PROJECT_ID `
        --memory 1Gi `
        --cpu 1 `
        --timeout 60 `
        --max-instances 10 `
        --set-env-vars "NODE_ENV=production,PORT=8080"
    
    $BACKEND_URL = gcloud run services describe $BACKEND_SERVICE `
        --platform managed `
        --region $REGION `
        --project=$PROJECT_ID `
        --format 'value(status.url)'
    
    Write-Success "Backend deployed to: $BACKEND_URL"
    $BACKEND_URL | Out-File -FilePath "..\BACKEND_URL.txt" -Encoding utf8
    
    Pop-Location
}

# Function to deploy Masumi Network
function Deploy-Masumi {
    Write-Status "Deploying Masumi Network to Cloud Run..."
    
    Push-Location masumi-integration
    
    gcloud run deploy $MASUMI_SERVICE `
        --source . `
        --platform managed `
        --region $REGION `
        --allow-unauthenticated `
        --project=$PROJECT_ID `
        --memory 512Mi `
        --cpu 1 `
        --timeout 300 `
        --max-instances 3
    
    $MASUMI_URL = gcloud run services describe $MASUMI_SERVICE `
        --platform managed `
        --region $REGION `
        --project=$PROJECT_ID `
        --format 'value(status.url)'
    
    Write-Success "Masumi Network deployed to: $MASUMI_URL"
    $MASUMI_URL | Out-File -FilePath "..\MASUMI_URL.txt" -Encoding utf8
    
    Pop-Location
}

# Function to deploy Sokosumi AI
function Deploy-Sokosumi {
    Write-Status "Deploying Sokosumi AI to Cloud Run..."
    
    Push-Location sokosumi-mcp
    
    gcloud run deploy $SOKOSUMI_SERVICE `
        --source . `
        --platform managed `
        --region $REGION `
        --allow-unauthenticated `
        --project=$PROJECT_ID `
        --memory 1Gi `
        --cpu 2 `
        --timeout 300 `
        --max-instances 5
    
    $SOKOSUMI_URL = gcloud run services describe $SOKOSUMI_SERVICE `
        --platform managed `
        --region $REGION `
        --project=$PROJECT_ID `
        --format 'value(status.url)'
    
    Write-Success "Sokosumi AI deployed to: $SOKOSUMI_URL"
    $SOKOSUMI_URL | Out-File -FilePath "..\SOKOSUMI_URL.txt" -Encoding utf8
    
    Pop-Location
}

# Function to update frontend environment
function Update-FrontendEnv {
    Write-Status "Updating frontend environment variables..."
    
    $BACKEND_URL = Get-Content "BACKEND_URL.txt" -ErrorAction SilentlyContinue
    $MASUMI_URL = Get-Content "MASUMI_URL.txt" -ErrorAction SilentlyContinue
    $SOKOSUMI_URL = Get-Content "SOKOSUMI_URL.txt" -ErrorAction SilentlyContinue
    
    $WS_URL = $BACKEND_URL -replace "https://", "wss://"
    
    @"
VITE_API_URL=$BACKEND_URL
VITE_WS_URL=$WS_URL
VITE_MASUMI_URL=$MASUMI_URL
VITE_NETWORK=mainnet
VITE_BLOCKFROST_PROJECT_ID=mainnet_your_project_id
"@ | Out-File -FilePath "frontend\.env.production" -Encoding utf8
    
    Write-Success "Frontend environment updated"
}

# Function to deploy frontend
function Deploy-Frontend {
    Write-Status "Building and deploying frontend to Firebase..."
    
    Push-Location frontend
    
    # Install dependencies
    npm ci
    
    # Build
    npm run build
    
    Pop-Location
    
    # Deploy to Firebase
    firebase deploy --only hosting --project=$PROJECT_ID
    
    Write-Success "Frontend deployed to Firebase Hosting"
}

# Function to run health checks
function Test-Deployment {
    Write-Status "Running health checks..."
    
    $BACKEND_URL = Get-Content "BACKEND_URL.txt" -ErrorAction SilentlyContinue
    
    if ($BACKEND_URL) {
        try {
            $response = Invoke-WebRequest -Uri "$BACKEND_URL/health" -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Success "Backend health check passed"
            }
        }
        catch {
            Write-Error "Backend health check failed"
        }
    }
}

# Function to display deployment summary
function Show-DeploymentSummary {
    Write-Status "============================================"
    Write-Status "      Deployment Summary"
    Write-Status "============================================"
    Write-Host ""
    
    Write-Success "Frontend URL: https://cardanoverse-tradingcards.web.app"
    
    if (Test-Path "BACKEND_URL.txt") {
        $BACKEND_URL = Get-Content "BACKEND_URL.txt"
        Write-Success "Backend URL: $BACKEND_URL"
    }
    
    if (Test-Path "MASUMI_URL.txt") {
        $MASUMI_URL = Get-Content "MASUMI_URL.txt"
        Write-Success "Masumi Network URL: $MASUMI_URL"
    }
    
    if (Test-Path "SOKOSUMI_URL.txt") {
        $SOKOSUMI_URL = Get-Content "SOKOSUMI_URL.txt"
        Write-Success "Sokosumi AI URL: $SOKOSUMI_URL"
    }
    
    Write-Host ""
    Write-Status "============================================"
    Write-Success "Deployment completed successfully!"
    Write-Status "============================================"
}

# Main deployment flow
function Start-Deployment {
    Write-Status "Starting CardanoVerse Complete Deployment..."
    Write-Host ""
    
    # Step 1: Prerequisites
    if (-not (Test-GCloud)) {
        return
    }
    Set-GCPProject
    
    # Step 2: Infrastructure
    Enable-APIs
    
    # Step 3: Backend Services
    Deploy-Backend
    Deploy-Masumi
    Deploy-Sokosumi
    
    # Step 4: Frontend
    Update-FrontendEnv
    Deploy-Frontend
    
    # Step 5: Verification
    Test-Deployment
    
    # Step 6: Summary
    Show-DeploymentSummary
}

# Run main function
Start-Deployment
