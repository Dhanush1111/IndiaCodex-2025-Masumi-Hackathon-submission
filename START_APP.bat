@echo off
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║     🚀 CardanoVerse - AI-Powered Trading Cards 🚀        ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check environment files
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo ✅ Created backend\.env
)

if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env"
    echo ✅ Created frontend\.env
)

if not exist "crewai-service\.env" (
    copy "crewai-service\.env.example" "crewai-service\.env"
    echo ✅ Created crewai-service\.env
    echo.
    echo ⚠️  IMPORTANT: Add GEMINI_API_KEY to crewai-service\.env
    echo Get key from: https://aistudio.google.com/app/apikey
    pause
)

echo 🤖 Starting CrewAI AI Service...
start "CardanoVerse AI" cmd /k "cd crewai-service && venv\Scripts\activate && python main.py api"
echo    ✅ AI service launched!
echo    🧠 http://localhost:8000
echo.

echo ⏳ Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo 🔧 Starting Backend Server...
start "CardanoVerse Backend" cmd /k "cd backend && npm run dev"
echo    ✅ Backend launched!
echo    📡 http://localhost:5000
echo.

echo ⏳ Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo 🎨 Starting Frontend Server...
start "CardanoVerse Frontend" cmd /k "cd frontend && npm run dev"
echo    ✅ Frontend launched!
echo    🌐 http://localhost:5173
echo.

echo ⏳ Waiting 5 seconds for servers to start...
timeout /t 5 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                  ✅ SERVERS LAUNCHED! ✅                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🌐 Opening browser...
start http://localhost:5173
echo.
echo 📋 Next Steps:
echo    1. Connect your wallet
echo    2. Go to Marketplace
echo    3. Click "✨ AI Buy" on any card
echo    4. Watch AI process payment!
echo.
echo 🎉 Ready to trade! Press any key to close...
pause >nul
