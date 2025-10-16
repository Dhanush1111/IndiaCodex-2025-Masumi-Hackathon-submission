#!/bin/bash

# ====================================
# CardanoVerse Complete Deployment Script
# ====================================
# This script deploys all services to Google Cloud Platform
# Author: AI Assistant
# Date: 2025
# ====================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="cardanoverse-tradingcards"
REGION="us-central1"
BACKEND_SERVICE="cardanoverse-backend"
MASUMI_SERVICE="cardanoverse-masumi"
SOKOSUMI_SERVICE="cardanoverse-sokosumi"
CREWAI_SERVICE="cardanoverse-crewai"

# Function to print colored messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if gcloud is installed
check_gcloud() {
    if ! command -v gcloud &> /dev/null; then
        print_error "gcloud CLI not found. Please install it first:"
        echo "https://cloud.google.com/sdk/docs/install"
        exit 1
    fi
    print_success "gcloud CLI found"
}

# Function to set project
set_project() {
    print_status "Setting GCP project to $PROJECT_ID..."
    gcloud config set project $PROJECT_ID
    print_success "Project set to $PROJECT_ID"
}

# Function to enable required APIs
enable_apis() {
    print_status "Enabling required GCP APIs..."
    
    APIS=(
        "run.googleapis.com"
        "cloudbuild.googleapis.com"
        "sqladmin.googleapis.com"
        "redis.googleapis.com"
        "secretmanager.googleapis.com"
        "compute.googleapis.com"
    )
    
    for api in "${APIS[@]}"; do
        print_status "Enabling $api..."
        gcloud services enable $api --project=$PROJECT_ID
    done
    
    print_success "All APIs enabled"
}

# Function to create Cloud SQL instance
create_database() {
    print_status "Checking for Cloud SQL instance..."
    
    if gcloud sql instances describe cardanoverse-db --project=$PROJECT_ID &> /dev/null; then
        print_warning "Cloud SQL instance already exists"
    else
        print_status "Creating Cloud SQL instance (this may take 5-10 minutes)..."
        gcloud sql instances create cardanoverse-db \
            --database-version=POSTGRES_15 \
            --tier=db-f1-micro \
            --region=$REGION \
            --project=$PROJECT_ID \
            --root-password="$(openssl rand -base64 32)"
        
        print_status "Creating database..."
        gcloud sql databases create cardanoverse \
            --instance=cardanoverse-db \
            --project=$PROJECT_ID
        
        print_success "Database created"
    fi
}

# Function to create Redis instance
create_redis() {
    print_status "Checking for Redis instance..."
    
    if gcloud redis instances describe cardanoverse-cache --region=$REGION --project=$PROJECT_ID &> /dev/null; then
        print_warning "Redis instance already exists"
    else
        print_status "Creating Redis instance (this may take 5-10 minutes)..."
        gcloud redis instances create cardanoverse-cache \
            --size=1 \
            --region=$REGION \
            --redis-version=redis_7_0 \
            --project=$PROJECT_ID
        
        print_success "Redis instance created"
    fi
}

# Function to deploy backend
deploy_backend() {
    print_status "Deploying backend to Cloud Run..."
    
    cd backend
    
    gcloud run deploy $BACKEND_SERVICE \
        --source . \
        --platform managed \
        --region $REGION \
        --allow-unauthenticated \
        --project=$PROJECT_ID \
        --memory 1Gi \
        --cpu 1 \
        --timeout 60 \
        --max-instances 10 \
        --set-env-vars "NODE_ENV=production,PORT=8080" \
        --add-cloudsql-instances "PROJECT_ID:REGION:cardanoverse-db"
    
    BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE \
        --platform managed \
        --region $REGION \
        --project=$PROJECT_ID \
        --format 'value(status.url)')
    
    print_success "Backend deployed to: $BACKEND_URL"
    echo "$BACKEND_URL" > ../BACKEND_URL.txt
    
    cd ..
}

# Function to deploy Masumi Network
deploy_masumi() {
    print_status "Deploying Masumi Network to Cloud Run..."
    
    cd masumi-integration
    
    gcloud run deploy $MASUMI_SERVICE \
        --source . \
        --platform managed \
        --region $REGION \
        --allow-unauthenticated \
        --project=$PROJECT_ID \
        --memory 512Mi \
        --cpu 1 \
        --timeout 300 \
        --max-instances 3
    
    MASUMI_URL=$(gcloud run services describe $MASUMI_SERVICE \
        --platform managed \
        --region $REGION \
        --project=$PROJECT_ID \
        --format 'value(status.url)')
    
    print_success "Masumi Network deployed to: $MASUMI_URL"
    echo "$MASUMI_URL" > ../MASUMI_URL.txt
    
    cd ..
}

# Function to deploy Sokosumi AI
deploy_sokosumi() {
    print_status "Deploying Sokosumi AI to Cloud Run..."
    
    cd sokosumi-mcp
    
    gcloud run deploy $SOKOSUMI_SERVICE \
        --source . \
        --platform managed \
        --region $REGION \
        --allow-unauthenticated \
        --project=$PROJECT_ID \
        --memory 1Gi \
        --cpu 2 \
        --timeout 300 \
        --max-instances 5
    
    SOKOSUMI_URL=$(gcloud run services describe $SOKOSUMI_SERVICE \
        --platform managed \
        --region $REGION \
        --project=$PROJECT_ID \
        --format 'value(status.url)')
    
    print_success "Sokosumi AI deployed to: $SOKOSUMI_URL"
    echo "$SOKOSUMI_URL" > ../SOKOSUMI_URL.txt
    
    cd ..
}

# Function to deploy CrewAI Service
deploy_crewai() {
    if [ ! -d "crewai-service" ]; then
        print_warning "CrewAI service directory not found, skipping..."
        return
    fi
    
    print_status "Deploying CrewAI Service to Cloud Run..."
    
    cd crewai-service
    
    gcloud run deploy $CREWAI_SERVICE \
        --source . \
        --platform managed \
        --region $REGION \
        --allow-unauthenticated \
        --project=$PROJECT_ID \
        --memory 2Gi \
        --cpu 2 \
        --timeout 300 \
        --max-instances 3
    
    CREWAI_URL=$(gcloud run services describe $CREWAI_SERVICE \
        --platform managed \
        --region $REGION \
        --project=$PROJECT_ID \
        --format 'value(status.url)')
    
    print_success "CrewAI Service deployed to: $CREWAI_URL"
    echo "$CREWAI_URL" > ../CREWAI_URL.txt
    
    cd ..
}

# Function to update frontend environment
update_frontend_env() {
    print_status "Updating frontend environment variables..."
    
    BACKEND_URL=$(cat BACKEND_URL.txt 2>/dev/null || echo "")
    MASUMI_URL=$(cat MASUMI_URL.txt 2>/dev/null || echo "")
    SOKOSUMI_URL=$(cat SOKOSUMI_URL.txt 2>/dev/null || echo "")
    
    cat > frontend/.env.production << EOF
VITE_API_URL=$BACKEND_URL
VITE_WS_URL=${BACKEND_URL/https/wss}
VITE_MASUMI_URL=$MASUMI_URL
VITE_NETWORK=mainnet
VITE_BLOCKFROST_PROJECT_ID=mainnet_your_project_id
EOF
    
    print_success "Frontend environment updated"
}

# Function to deploy frontend
deploy_frontend() {
    print_status "Building and deploying frontend to Firebase..."
    
    cd frontend
    
    # Install dependencies
    npm ci
    
    # Build
    npm run build
    
    cd ..
    
    # Deploy to Firebase
    firebase deploy --only hosting --project=$PROJECT_ID
    
    print_success "Frontend deployed to Firebase Hosting"
}

# Function to run health checks
health_check() {
    print_status "Running health checks..."
    
    BACKEND_URL=$(cat BACKEND_URL.txt 2>/dev/null || echo "")
    
    if [ ! -z "$BACKEND_URL" ]; then
        if curl -s -f "$BACKEND_URL/health" > /dev/null; then
            print_success "Backend health check passed"
        else
            print_error "Backend health check failed"
        fi
    fi
}

# Function to display deployment summary
deployment_summary() {
    print_status "============================================"
    print_status "      Deployment Summary"
    print_status "============================================"
    
    echo ""
    print_success "Frontend URL: https://cardanoverse-tradingcards.web.app"
    
    if [ -f "BACKEND_URL.txt" ]; then
        BACKEND_URL=$(cat BACKEND_URL.txt)
        print_success "Backend URL: $BACKEND_URL"
    fi
    
    if [ -f "MASUMI_URL.txt" ]; then
        MASUMI_URL=$(cat MASUMI_URL.txt)
        print_success "Masumi Network URL: $MASUMI_URL"
    fi
    
    if [ -f "SOKOSUMI_URL.txt" ]; then
        SOKOSUMI_URL=$(cat SOKOSUMI_URL.txt)
        print_success "Sokosumi AI URL: $SOKOSUMI_URL"
    fi
    
    if [ -f "CREWAI_URL.txt" ]; then
        CREWAI_URL=$(cat CREWAI_URL.txt)
        print_success "CrewAI URL: $CREWAI_URL"
    fi
    
    echo ""
    print_status "============================================"
    print_success "Deployment completed successfully!"
    print_status "============================================"
}

# Main deployment flow
main() {
    print_status "Starting CardanoVerse Complete Deployment..."
    echo ""
    
    # Step 1: Prerequisites
    check_gcloud
    set_project
    
    # Step 2: Infrastructure
    enable_apis
    create_database
    create_redis
    
    # Step 3: Backend Services
    deploy_backend
    deploy_masumi
    deploy_sokosumi
    deploy_crewai
    
    # Step 4: Frontend
    update_frontend_env
    deploy_frontend
    
    # Step 5: Verification
    health_check
    
    # Step 6: Summary
    deployment_summary
}

# Run main function
main
