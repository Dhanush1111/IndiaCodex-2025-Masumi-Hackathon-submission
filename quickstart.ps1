# CardanoVerse Quick Start Script (Windows PowerShell)
# This script helps you get started quickly with CardanoVerse

Write-Host "🎴 CardanoVerse Quick Start" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

# Check Docker
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Docker not found. Some features may not work." -ForegroundColor Yellow
    Write-Host "   Install from https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
}

Write-Host "`n"

# Setup environment
Write-Host "Setting up environment..." -ForegroundColor Yellow

if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please edit it with your API keys!" -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host "`n"

# Install dependencies
Write-Host "Do you want to install all dependencies? (Y/N)" -ForegroundColor Yellow
$install = Read-Host

if ($install -eq "Y" -or $install -eq "y") {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes...`n" -ForegroundColor Yellow
    
    # Root dependencies
    Write-Host "Installing root dependencies..." -ForegroundColor Cyan
    npm install
    
    # Frontend dependencies
    Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
    
    # Backend dependencies
    Write-Host "`nInstalling backend dependencies..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
    
    # Masumi integration dependencies
    Write-Host "`nInstalling Masumi Network dependencies..." -ForegroundColor Cyan
    Set-Location masumi-integration
    npm install
    Set-Location ..
    
    # Sokosumi MCP dependencies
    Write-Host "`nInstalling Sokosumi MCP dependencies..." -ForegroundColor Cyan
    Set-Location sokosumi-mcp
    npm install
    Set-Location ..
    
    Write-Host "`n✅ All dependencies installed!" -ForegroundColor Green
}

Write-Host "`n"

# Docker setup
Write-Host "Do you want to start Docker services? (Y/N)" -ForegroundColor Yellow
$docker = Read-Host

if ($docker -eq "Y" -or $docker -eq "y") {
    Write-Host "Starting Docker services..." -ForegroundColor Yellow
    docker-compose up -d
    Write-Host "`n✅ Docker services started!" -ForegroundColor Green
    Write-Host "   - PostgreSQL: localhost:5432" -ForegroundColor Cyan
    Write-Host "   - Redis: localhost:6379" -ForegroundColor Cyan
    Write-Host "   - IPFS: localhost:5001" -ForegroundColor Cyan
    Write-Host "   - Masumi Network: localhost:7777" -ForegroundColor Cyan
    Write-Host "   - Sokosumi MCP: localhost:3000" -ForegroundColor Cyan
}

Write-Host "`n"

# Final instructions
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit .env file with your API keys" -ForegroundColor White
Write-Host "   - Get Blockfrost API key: https://blockfrost.io/" -ForegroundColor White
Write-Host "`n2. Start the development servers:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host "`n3. Open in browser:" -ForegroundColor White
Write-Host "   http://localhost:5173" -ForegroundColor Cyan
Write-Host "`n4. Read the documentation:" -ForegroundColor White
Write-Host "   - SETUP.md - Complete setup guide" -ForegroundColor White
Write-Host "   - ARCHITECTURE.md - System architecture" -ForegroundColor White
Write-Host "   - README.md - Project overview" -ForegroundColor White

Write-Host "`n"
Write-Host "📚 Documentation: https://docs.cardanoverse.io" -ForegroundColor Cyan
Write-Host "💬 Discord: https://discord.gg/cardanoverse" -ForegroundColor Cyan
Write-Host "🐦 Twitter: @CardanoVerse" -ForegroundColor Cyan

Write-Host "`n"
Write-Host "Happy trading! 🎴✨" -ForegroundColor Green
