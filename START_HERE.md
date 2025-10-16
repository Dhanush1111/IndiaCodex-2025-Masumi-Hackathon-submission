# 🚀 START HERE

Your CardanoVerse application is **production-ready**! Follow these steps:

## ⚡ Quick Start (15 minutes)

### 1️⃣ Get API Keys (FREE - 2 minutes)
```
Blockfrost: https://blockfrost.io
Gemini: https://aistudio.google.com/app/apikey
```

### 2️⃣ Install Dependencies (5 minutes)
```powershell
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd crewai-service && python -m venv venv && .\venv\Scripts\activate && pip install -r requirements.txt && cd ..
```

### 3️⃣ Configure (2 minutes)
```powershell
# Create .env files
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
cd ../crewai-service && cp .env.example .env

# Edit and add keys:
# - backend/.env → BLOCKFROST_API_KEY
# - crewai-service/.env → GEMINI_API_KEY
```

### 4️⃣ Launch (1 minute)
```powershell
.\START_APP.ps1
```

### 5️⃣ Access
```
http://localhost:5173
```

---

## 📚 Documentation

- **[MISSING_SETUP.md](./MISSING_SETUP.md)** ← Quick checklist
- **[PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)** ← Complete guide
- **[README.md](./README.md)** ← Project overview

---

## ✅ What's Working

✅ **3 Services**: Frontend (5173), Backend (5000), CrewAI (8000)  
✅ **4 AI Agents**: Valuation, Risk, Market, Decision  
✅ **Data Flow**: Frontend → Backend → CrewAI → Gemini  
✅ **Marketplace**: Browse cards, filters, AI analysis  
✅ **Wallet Integration**: RainbowKit multi-wallet support  
✅ **Masumi Ready**: MIP-003 compliant for paid services  

---

**Questions? Check [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for troubleshooting!** 🎉
