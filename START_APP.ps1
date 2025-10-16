# CardanoVerse Application Launcher
# This script starts both backend and frontend servers

Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "║     🚀 CardanoVerse - AI-Powered Trading Cards 🚀        ║" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "📁 Project Directory: $scriptDir" -ForegroundColor Yellow
Write-Host ""

# Check environment files
$backendEnv = Join-Path $scriptDir "backend\.env"
$frontendEnv = Join-Path $scriptDir "frontend\.env"
$crewaiEnv = Join-Path $scriptDir "crewai-service\.env"

if (-not (Test-Path $backendEnv)) {
    Write-Host "⚠️  Creating backend\.env..." -ForegroundColor Yellow
    Copy-Item (Join-Path $scriptDir "backend\.env.example") $backendEnv
    Write-Host "   ✅ Created backend\.env" -ForegroundColor Green
}

if (-not (Test-Path $frontendEnv)) {
    Write-Host "⚠️  Creating frontend\.env..." -ForegroundColor Yellow
    Copy-Item (Join-Path $scriptDir "frontend\.env.example") $frontendEnv
    Write-Host "   ✅ Created frontend\.env" -ForegroundColor Green
}

if (-not (Test-Path $crewaiEnv)) {
    Write-Host "⚠️  Creating crewai-service\.env..." -ForegroundColor Yellow
    Copy-Item (Join-Path $scriptDir "crewai-service\.env.example") $crewaiEnv
    Write-Host "   ✅ Created crewai-service\.env" -ForegroundColor Green
    Write-Host "   📝 IMPORTANT: Add your GEMINI_API_KEY to crewai-service\.env!" -ForegroundColor Red
    Write-Host "   📝 Get key from: https://aistudio.google.com/app/apikey" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Start CrewAI Python Service
Write-Host "🤖 Starting CrewAI AI Service..." -ForegroundColor Cyan
$crewaiPath = Join-Path $scriptDir "crewai-service"
$venvActivate = Join-Path $crewaiPath "venv\Scripts\Activate.ps1"

if (Test-Path $venvActivate) {
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "cd '$crewaiPath'; & '$venvActivate'; Write-Host '🤖 CrewAI Service Starting...' -ForegroundColor Green; python main.py api"
    ) -WindowStyle Normal
    Write-Host "   ✅ CrewAI service launched in new window" -ForegroundColor Green
    Write-Host "   🧠 Expected on: http://localhost:8000" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "   ⚠️  Virtual environment not found!" -ForegroundColor Red
    Write-Host "   Run: cd crewai-service && python -m venv venv && .\venv\Scripts\activate && pip install -r requirements.txt" -ForegroundColor Yellow
    Write-Host ""
}

# Wait for AI service to start
Write-Host "⏳ Waiting 5 seconds for AI service to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Backend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
$backendPath = Join-Path $scriptDir "backend"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$backendPath'; Write-Host '🚀 Backend Server Starting...' -ForegroundColor Green; npm run dev"
) -WindowStyle Normal

Write-Host "   ✅ Backend launched in new window" -ForegroundColor Green
Write-Host "   📡 Expected on: http://localhost:5000" -ForegroundColor Gray
Write-Host ""

# Wait a bit for backend to start
Write-Host "⏳ Waiting 3 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Cyan
$frontendPath = Join-Path $scriptDir "frontend"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$frontendPath'; Write-Host '🚀 Frontend Server Starting...' -ForegroundColor Green; npm run dev"
) -WindowStyle Normal

Write-Host "   ✅ Frontend launched in new window" -ForegroundColor Green
Write-Host "   🌐 Expected on: http://localhost:5173" -ForegroundColor Gray
Write-Host ""

# Wait for servers to fully start
Write-Host "⏳ Waiting for servers to fully start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "║                  ✅ SERVERS LAUNCHED! ✅                  ║" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 Open your browser and navigate to:" -ForegroundColor Cyan
Write-Host "   👉 http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Connect your wallet (click 'Connect Wallet' button)" -ForegroundColor White
Write-Host "   2. Go to Marketplace" -ForegroundColor White
Write-Host "   3. Click '✨ AI Buy' on any card" -ForegroundColor White
Write-Host "   4. Watch the Gemini AI analyze and process payment!" -ForegroundColor White
Write-Host ""

Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "   • PRODUCTION_SETUP.md - Complete setup guide" -ForegroundColor Gray
Write-Host "   • README.md - Project overview" -ForegroundColor Gray
Write-Host ""

Write-Host "🎉 Ready to trade with AI! 🤖💎" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press any key to open browser..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open browser
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✅ Browser opened! Happy trading! 🎴✨" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit this launcher (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
