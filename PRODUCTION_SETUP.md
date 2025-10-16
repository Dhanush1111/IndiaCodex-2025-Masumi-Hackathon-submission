# 🚀 CardanoVerse - Production Setup Guide

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Data Flow Architecture](#data-flow-architecture)
- [API Keys Required](#api-keys-required)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

---

## Overview

**CardanoVerse** is an AI-powered Cardano NFT trading card marketplace with:
- ✅ **Frontend**: React + Vite + TailwindCSS + RainbowKit
- ✅ **Backend**: Node.js + Express + TypeScript
- ✅ **AI Service**: CrewAI + Python + Gemini API
- ✅ **Blockchain**: Cardano (Blockfrost API)
- ✅ **Masumi Network**: P2P payment integration (optional)

---

## Prerequisites

### Required Software

1. **Node.js** v18.x or higher
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **Python** 3.10-3.12
   - Download: https://www.python.org/downloads/
   - Verify: `python --version`
   - ⚠️ **Windows**: Check "Add Python to PATH" during installation

3. **Git** (already installed)
   - Verify: `git --version`

### Package Managers
- **npm** (comes with Node.js)
- **pip** (comes with Python)

---

## Quick Start

### Step 1: Install Dependencies

```powershell
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..

# Python AI service dependencies
cd crewai-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Step 2: Configure Environment Variables

#### Backend (.env)
```powershell
cd backend
cp .env.example .env
# Edit backend/.env and add:
# - BLOCKFROST_API_KEY (get from https://blockfrost.io)
cd ..
```

#### Frontend (.env)
```powershell
cd frontend
cp .env.example .env
# Frontend .env should work with defaults
cd ..
```

#### CrewAI Service (.env)
```powershell
cd crewai-service
cp .env.example .env
# Edit crewai-service/.env and add:
# - GEMINI_API_KEY (get from https://aistudio.google.com/app/apikey)
cd ..
```

### Step 3: Start All Services

**Option A: Using Launcher Scripts (Recommended)**

```powershell
# PowerShell
.\START_APP.ps1

# OR Command Prompt
START_APP.bat
```

**Option B: Manual Start (3 Terminals)**

```powershell
# Terminal 1: CrewAI Python Service
cd crewai-service
.\venv\Scripts\activate
python main.py api
# Runs on http://localhost:8000

# Terminal 2: Backend API
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 3: Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### Step 4: Access Application

Open browser: **http://localhost:5173**

---

## Detailed Setup

### 1. Backend API Setup

**Location**: `backend/`

**Dependencies**:
- Express (Web server)
- TypeScript (Type safety)
- Blockfrost (Cardano API)
- Socket.IO (WebSocket)
- Axios (HTTP client)

**Configuration** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
BLOCKFROST_API_KEY=your_key_here          # REQUIRED
CREWAI_SERVICE_URL=http://localhost:8000  # REQUIRED
SESSION_SECRET=your-secret-min-32-chars
```

**Key Files**:
- `src/index.ts` - Main server entry point
- `src/routes/cards.ts` - Card marketplace API
- `src/services/crewai-service.ts` - AI service client
- `src/services/masumi-payment.ts` - Payment integration

**Start Command**:
```powershell
cd backend
npm run dev
```

**Health Check**: http://localhost:5000/health

---

### 2. Frontend Setup

**Location**: `frontend/`

**Dependencies**:
- React 18
- Vite (Build tool)
- TailwindCSS (Styling)
- RainbowKit (Wallet connect)
- React Router (Navigation)
- Socket.IO Client (WebSocket)

**Configuration** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api/v1  # REQUIRED
VITE_WS_URL=ws://localhost:5000
VITE_NETWORK=preprod
```

**Key Files**:
- `src/App.tsx` - Main application
- `src/components/Marketplace.tsx` - Card marketplace
- `src/components/RainbowWalletConnect.tsx` - Wallet integration
- `src/services/paymentService.ts` - Payment handling

**Start Command**:
```powershell
cd frontend
npm run dev
```

**Access**: http://localhost:5173

---

### 3. CrewAI Python Service Setup

**Location**: `crewai-service/`

**Dependencies**:
- FastAPI (API framework)
- CrewAI (Multi-agent AI framework)
- Google Generative AI (Gemini)
- Uvicorn (ASGI server)

**Configuration** (`crewai-service/.env`):
```env
HOST=0.0.0.0
PORT=8000
GEMINI_API_KEY=your_key_here  # REQUIRED

# Masumi (Optional - leave empty for testing)
PAYMENT_SERVICE_URL=
PAYMENT_API_KEY=
AGENT_IDENTIFIER=
```

**Key Files**:
- `main.py` - FastAPI server & MIP-003 endpoints
- `crew_definition.py` - 4 AI agents (Valuation, Risk, Market, Decision)
- `requirements.txt` - Python dependencies

**AI Agents**:
1. **Valuation Expert** - NFT/card value assessment
2. **Risk Analyst** - Security and fraud detection
3. **Market Intelligence** - Market trends analysis
4. **Payment Decision Manager** - Final consensus

**Start Command**:
```powershell
cd crewai-service
.\venv\Scripts\activate  # Windows
python main.py api
```

**API Docs**: http://localhost:8000/docs

**Test Endpoint**: `POST http://localhost:8000/test_analysis`

---

## Data Flow Architecture

```
┌─────────────────┐
│   FRONTEND      │  React + Vite
│  Port: 5173     │  - User Interface
└────────┬────────┘  - Wallet Connection
         │           - Card Display
         ↓
┌─────────────────┐
│   BACKEND API   │  Node.js + Express
│  Port: 5000     │  - REST API
└────────┬────────┘  - WebSocket
         │           - Request Routing
         ↓
┌─────────────────┐
│  CREWAI SERVICE │  Python + FastAPI
│  Port: 8000     │  - AI Analysis
└────────┬────────┘  - 4 Agent Crew
         │           - Gemini Integration
         ↓
┌─────────────────┐
│  GEMINI API     │  Google AI
│  (Cloud)        │  - LLM Processing
└─────────────────┘  - Decision Making

┌─────────────────┐
│ BLOCKFROST API  │  Cardano Network
│  (Cloud)        │  - Blockchain Data
└─────────────────┘  - Transaction Info

┌─────────────────┐
│ MASUMI NETWORK  │  P2P Network (Optional)
│  Port: 7777     │  - Payment Verification
└─────────────────┘  - MIP-003 Standard
```

### Request Flow Example

**User clicks "AI Buy" button**:

1. **Frontend** → User clicks "AI Buy" on card
2. **Frontend** → Sends `POST /api/v1/cards/:id/ai-purchase`
3. **Backend** → Receives request, calls CrewAI service
4. **Backend** → `POST http://localhost:8000/test_analysis`
5. **CrewAI** → Starts 4-agent crew analysis
6. **CrewAI** → Calls Gemini API for each agent
7. **Gemini** → Returns AI analysis for each agent
8. **CrewAI** → Aggregates results, makes decision
9. **CrewAI** → Returns analysis to Backend
10. **Backend** → Returns decision to Frontend
11. **Frontend** → Displays AI recommendation to user
12. **Frontend** → (Optional) Proceeds with payment

---

## API Keys Required

### 1. Blockfrost API Key (Backend)

**Purpose**: Access Cardano blockchain data

**Get Key**:
1. Visit https://blockfrost.io
2. Sign up for free account
3. Create project (Preprod network)
4. Copy API key

**Add to**: `backend/.env`
```env
BLOCKFROST_API_KEY=preprod_your_key_here
```

**Cost**: FREE (500,000 requests/day)

---

### 2. Gemini API Key (CrewAI Service)

**Purpose**: Power AI agents with Google's Gemini LLM

**Get Key**:
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy key

**Add to**: `crewai-service/.env`
```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

**Cost**: FREE (60 requests/minute)

---

### 3. Masumi Network (Optional)

**Purpose**: Enable paid AI services with crypto payments

**Setup**:
1. Deploy Masumi node (see Masumi docs)
2. Register AI agent
3. Get agent identifier

**Add to**: `crewai-service/.env`
```env
PAYMENT_SERVICE_URL=http://localhost:3001/api/v1
PAYMENT_API_KEY=your_payment_key
AGENT_IDENTIFIER=your_agent_id
```

**Status**: OPTIONAL - App works without Masumi

---

## Troubleshooting

### Issue: "CrewAI service is not running"

**Cause**: Python service not started or crashed

**Solution**:
```powershell
cd crewai-service
.\venv\Scripts\activate
python main.py api
```

**Check**: Visit http://localhost:8000 (should show JSON response)

---

### Issue: "Module not found" (Python)

**Cause**: Virtual environment not activated or dependencies not installed

**Solution**:
```powershell
cd crewai-service
.\venv\Scripts\activate
pip install -r requirements.txt
```

---

### Issue: "Port already in use"

**Cause**: Another process using the port

**Solution** (Windows):
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change port in .env
# backend/.env: PORT=5001
```

---

### Issue: "Invalid API key" (Gemini/Blockfrost)

**Cause**: API key not set or invalid

**Solution**:
1. Check `.env` files have correct keys
2. No quotes around keys
3. No extra spaces
4. Keys are valid (not expired)

**Verify**:
```powershell
# Check backend .env
cat backend\.env

# Check crewai-service .env
cat crewai-service\.env
```

---

### Issue: Frontend shows "Network Error"

**Cause**: Backend not running or wrong URL

**Solution**:
1. Check backend is running: http://localhost:5000/health
2. Check `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```
3. Restart frontend: `npm run dev`

---

### Issue: "CORS Error"

**Cause**: Frontend URL mismatch in backend

**Solution**: Update `backend/.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

---

## Production Deployment

### Environment Variables

**Production** (.env):
```env
NODE_ENV=production
PORT=443
CORS_ORIGIN=https://yourdomain.com
```

### Build Commands

```powershell
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Deploy 'dist/' folder to hosting (Vercel, Netlify, etc.)

# CrewAI Service
cd crewai-service
# Deploy to cloud (AWS, GCP, Azure)
# Use gunicorn or similar ASGI server
```

### Security Checklist

- [ ] Change `SESSION_SECRET` to strong random string (32+ chars)
- [ ] Use environment variable management (AWS Secrets Manager, etc.)
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Set up proper CORS policies
- [ ] Add rate limiting
- [ ] Use production database (PostgreSQL)
- [ ] Enable logging and monitoring (Sentry, etc.)
- [ ] Keep API keys secret (never commit to Git)
- [ ] Use `.gitignore` for `.env` files
- [ ] Set up CI/CD pipeline

### Recommended Hosting

**Frontend**:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

**Backend**:
- Railway
- Render
- AWS EC2
- DigitalOcean

**CrewAI Service**:
- AWS Lambda (with Docker)
- Google Cloud Run
- Azure Container Instances

---

## What You Need To Do

### Immediate Actions

1. **Get API Keys**:
   - ✅ Blockfrost API key → Add to `backend/.env`
   - ✅ Gemini API key → Add to `crewai-service/.env`

2. **Install Dependencies**:
   ```powershell
   cd backend && npm install
   cd ../frontend && npm install
   cd ../crewai-service && pip install -r requirements.txt
   ```

3. **Start Services**:
   ```powershell
   .\START_APP.ps1  # or START_APP.bat
   ```

4. **Test Application**:
   - Open http://localhost:5173
   - Go to Marketplace
   - Click "AI Buy" button
   - Verify AI analysis works

### Optional Actions

1. **Set up Masumi Network** (for paid services):
   - Follow Masumi documentation
   - Configure payment endpoints
   - Test payment flow

2. **Deploy to Production**:
   - Choose hosting providers
   - Set up CI/CD
   - Configure production .env
   - Deploy services

3. **Add Features**:
   - Custom card designs
   - More AI agents
   - Enhanced analytics
   - Mobile app

---

## Project Structure

```
cardano-trading-cards/
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── index.ts        # Main server
│   │   ├── routes/         # API routes
│   │   └── services/       # Business logic
│   ├── .env                # Backend config (YOU CREATE)
│   ├── .env.example        # Template
│   └── package.json
│
├── frontend/               # React UI
│   ├── src/
│   │   ├── App.tsx        # Main app
│   │   ├── components/    # UI components
│   │   └── services/      # API clients
│   ├── .env               # Frontend config (YOU CREATE)
│   ├── .env.example       # Template
│   └── package.json
│
├── crewai-service/        # Python AI
│   ├── main.py           # FastAPI server
│   ├── crew_definition.py # AI agents
│   ├── .env              # AI config (YOU CREATE)
│   ├── .env.example      # Template
│   └── requirements.txt
│
├── START_APP.ps1         # Launcher (PowerShell)
├── START_APP.bat         # Launcher (CMD)
├── README.md             # Main readme
└── PRODUCTION_SETUP.md   # This file

```

---

## Support & Resources

### Documentation
- **Blockfrost**: https://docs.blockfrost.io/
- **Gemini API**: https://ai.google.dev/docs
- **CrewAI**: https://docs.crewai.com/
- **Masumi Network**: https://masumi.network/

### Links
- **Cardano**: https://cardano.org/
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/

---

## License

See [LICENSE](LICENSE) file.

---

## Quick Reference

| Service | Port | URL | Required Env |
|---------|------|-----|-------------|
| Frontend | 5173 | http://localhost:5173 | VITE_API_URL |
| Backend | 5000 | http://localhost:5000 | BLOCKFROST_API_KEY, CREWAI_SERVICE_URL |
| CrewAI | 8000 | http://localhost:8000 | GEMINI_API_KEY |
| Masumi | 7777 | http://localhost:7777 | (Optional) |

---

**🎉 You're all set! Happy building! 🚀**
