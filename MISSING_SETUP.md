# ✅ What You Need To Complete Setup

This is a **quick reference** for what's missing on your end. See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for complete instructions.

---

## 🔑 API Keys Required (FREE)

### 1. Blockfrost API Key (Backend)
- **Get from**: https://blockfrost.io
- **Steps**: 
  1. Sign up for free account
  2. Create project → Select "Preprod" network
  3. Copy API key
- **Add to**: `backend/.env`
  ```env
  BLOCKFROST_API_KEY=preprod_your_key_here
  ```

### 2. Gemini API Key (CrewAI Service)
- **Get from**: https://aistudio.google.com/app/apikey
- **Steps**:
  1. Sign in with Google account
  2. Click "Create API Key"
  3. Copy key
- **Add to**: `crewai-service/.env`
  ```env
  GEMINI_API_KEY=AIzaSy...your_key_here
  ```

---

## 📦 Dependencies To Install

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

### CrewAI Python Service
```powershell
cd crewai-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

---

## ⚙️ Environment Files To Create

All `.env` files need to be created from `.env.example`:

```powershell
# Backend
cd backend
cp .env.example .env
# Then edit .env and add BLOCKFROST_API_KEY

# Frontend
cd frontend
cp .env.example .env
# Works with defaults (no changes needed)

# CrewAI Service
cd crewai-service
cp .env.example .env
# Then edit .env and add GEMINI_API_KEY
```

---

## 🚀 How To Run

**Option 1: Use Launcher (Easiest)**
```powershell
.\START_APP.ps1
```

**Option 2: Manual (3 terminals)**
```powershell
# Terminal 1 - AI Service
cd crewai-service
.\venv\Scripts\activate
python main.py api

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend
cd frontend
npm run dev
```

Then open: **http://localhost:5173**

---

## ✅ Verification Checklist

- [ ] Node.js v18+ installed (`node --version`)
- [ ] Python 3.10-3.12 installed (`python --version`)
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Python venv created (`crewai-service/venv` exists)
- [ ] Python dependencies installed (in venv)
- [ ] Blockfrost API key added to `backend/.env`
- [ ] Gemini API key added to `crewai-service/.env`
- [ ] All 3 services running without errors
- [ ] Frontend opens at http://localhost:5173
- [ ] Can see cards in marketplace
- [ ] Can click "AI Buy" button (triggers AI analysis)

---

## 🆘 Quick Troubleshooting

**"CrewAI service is not running"**
→ Start it: `cd crewai-service && .\venv\Scripts\activate && python main.py api`

**"Module not found" (Python)**
→ Install deps: `cd crewai-service && .\venv\Scripts\activate && pip install -r requirements.txt`

**"Port already in use"**
→ Kill process or change port in `.env` files

**"Invalid API key"**
→ Check `.env` files have correct keys (no quotes, no spaces)

**"Network Error" in frontend**
→ Backend not running, start it: `cd backend && npm run dev`

---

## 📖 Full Documentation

For complete setup guide, architecture, data flow, and production deployment:

👉 **[PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)**

---

**That's it! Get your API keys, install dependencies, and run the launcher. 🎉**
