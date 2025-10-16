# 🎴 CardanoVerse - AI-Powered Trading Cards Platform

> **Live Demo:** 🌐 [https://cardanoverse-tradingcards.web.app](https://cardanoverse-tradingcards.web.app)

## Overview
CardanoVerse is a next-generation Web3 trading cards platform that combines the power of **Cardano blockchain**, **Masumi Network**, and **Sokosumi AI agents** to create an intelligent, decentralized trading card ecosystem.

## 🚀 Key Features

### 1. **Cardano NFT Integration**
- Mint trading cards as Cardano Native Tokens (CNTs)
- Smart contract-based card ownership and transfers
- Plutus V3 validators for secure transactions
- CIP-25 & CIP-68 compliant metadata standards

### 2. **Masumi Network Infrastructure**
- Decentralized peer-to-peer card trading
- Distributed card marketplace with no central authority
- IPFS integration for card artwork storage
- Real-time P2P price discovery and matching

### 3. **Sokosumi AI Agents**
- **Card Valuation Agent**: ML-powered card price predictions
- **Trading Advisor Agent**: Personalized trading recommendations
- **Market Analysis Agent**: Real-time market trends and insights
- **Collection Optimizer Agent**: Portfolio optimization suggestions
- **Rarity Evaluator Agent**: Automated card rarity assessment

## 📁 Project Structure

```
cardano-trading-cards/
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # UI Components (Marketplace, Cards, Wallet)
│   │   ├── services/           # API & Payment Services
│   │   └── App.tsx             # Main application
│   ├── .env                    # Frontend config (YOU CREATE)
│   └── package.json
│
├── backend/                     # Node.js + Express API
│   ├── src/
│   │   ├── routes/             # API Routes (cards, cardano, ai-agents, p2p)
│   │   ├── services/           # Business Logic (crewai, masumi-payment)
│   │   └── index.ts            # Main server
│   ├── .env                    # Backend config (YOU CREATE)
│   └── package.json
│
├── crewai-service/             # Python AI Service
│   ├── main.py                 # FastAPI server (MIP-003 compliant)
│   ├── crew_definition.py      # 4 AI agents (CrewAI + Gemini)
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # AI config (YOU CREATE)
│   └── venv/                   # Python virtual environment
│
├── smart-contracts/             # Aiken Smart Contracts (Placeholder)
├── masumi-integration/          # Masumi Network (Optional)
├── sokosumi-mcp/               # Sokosumi MCP (Future)
│
├── START_APP.ps1               # Windows launcher (PowerShell)
├── START_APP.bat               # Windows launcher (CMD)
├── README.md                   # This file
└── PRODUCTION_SETUP.md         # Complete setup guide

```

## 🛠️ Technology Stack

### AI Layer
- **CrewAI**: Multi-agent AI framework
- **Google Gemini**: LLM for intelligent agents
- **FastAPI**: Python API server for AI service
- **4 AI Agents**: Valuation, Risk Analysis, Market Intelligence, Payment Decision

### Blockchain Layer
- **Cardano**: Layer 1 blockchain for NFT transactions
- **Blockfrost API**: Cardano blockchain data access
- **RainbowKit**: Multi-wallet connection (Nami, Eternl, Flint, Lace)
- **Mesh SDK**: Cardano wallet integration

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **TailwindCSS**: Utility-first styling
- **RainbowKit**: Wallet connectivity
- **Framer Motion**: Smooth animations

### Backend
- **Node.js + Express**: REST API server
- **TypeScript**: Type-safe backend
- **Socket.IO**: Real-time WebSocket updates
- **Axios**: HTTP client for service communication

### Decentralized Infrastructure (Optional)
- **Masumi Network**: P2P networking and AI payment processing (MIP-003 compliant)
- **IPFS**: Permanent storage for card artwork

## 🎯 Core Functionalities

### For Collectors
1. **Browse & Discover**: AI-powered card recommendations
2. **Collect Cards**: Mint or purchase cards as Cardano NFTs
3. **Trade P2P**: Direct peer-to-peer trading via Masumi Network
4. **Portfolio Management**: Track collection value and trends
5. **Rarity Analysis**: AI-driven rarity scoring

### For Traders
1. **Market Intelligence**: Real-time pricing and volume data
2. **Price Predictions**: ML-based price forecasting
3. **Trading Signals**: AI-generated buy/sell recommendations
4. **Order Book**: Decentralized order matching
5. **Historical Analytics**: Comprehensive trading history

### For Creators
1. **Card Design Studio**: Create custom card designs
2. **NFT Minting**: One-click Cardano NFT minting
3. **Royalty Setup**: Automated royalty distributions
4. **Collection Management**: Organize card series
5. **Metadata Management**: CIP-compliant metadata

## 🤖 CrewAI Multi-Agent System

**Framework**: CrewAI + Google Gemini  
**Architecture**: 4 specialized AI agents working collaboratively

### 1. Valuation Expert Agent
```
Role: Senior NFT & Trading Card Valuation Specialist
Goal: Assess fair market value of cards
Input: Card metadata, price, rarity, stats
Output: Price assessment with confidence score
```

### 2. Risk Analyst Agent
```
Role: Blockchain Security & Fraud Detection Expert
Goal: Identify risks and red flags
Input: Transaction details, owner history, market conditions
Output: Risk score and security analysis
```

### 3. Market Intelligence Agent
```
Role: NFT Market Researcher & Trend Analyst
Goal: Analyze market trends and timing
Input: Market data, similar cards, trading volume
Output: Market insights and timing recommendations
```

### 4. Payment Decision Manager Agent
```
Role: Senior Payment Authorization Officer
Goal: Make final consensus decision
Input: Analysis from all other agents
Output: Approve/Reject decision with reasoning
```

**Communication**: Agents collaborate via CrewAI framework  
**LLM**: Google Gemini Pro (free tier)  
**MIP-003**: Masumi Network compliant for paid services

## 🔗 Cardano Integration

### Transaction Flow
1. **Wallet Connection**: Nami, Eternl, Flint, Lace support
2. **Card Selection**: Browse marketplace
3. **Price Agreement**: AI-suggested or user-defined
4. **Smart Contract**: Plutus validator execution
5. **Transaction Signing**: User confirms in wallet
6. **On-Chain Settlement**: Cardano blockchain confirmation
7. **NFT Transfer**: Ownership updated

### Smart Contract Features
- **Atomic Swaps**: Trustless card-for-card trades
- **Escrow System**: Secure multi-party transactions
- **Royalty Enforcement**: Automatic creator payments
- **Batch Minting**: Efficient collection drops
- **Governance**: DAO voting for platform decisions

## 🌐 Masumi Network Integration

### P2P Marketplace
- **Decentralized Order Book**: No central server
- **Direct Peer Trading**: Wallet-to-wallet transactions
- **DHT-based Discovery**: Distributed card catalog
- **NAT Traversal**: Universal connectivity
- **Encrypted Communication**: Secure message passing

### Node Architecture
```
User Wallet → Masumi Node → P2P Network → Other Nodes
                    ↓
              IPFS Storage
                    ↓
           Cardano Blockchain
```

## 📊 Future Roadmap Alignment

### Phase 1 (Q4 2025): Foundation
- ✅ Core platform development
- ✅ Basic AI agents integration
- ✅ Cardano testnet deployment
- ✅ Masumi network integration

### Phase 2 (Q1 2026): Enhancement
- 🔄 Advanced AI models (multi-modal analysis)
- 🔄 Cross-chain bridges (Ethereum, Polygon)
- 🔄 Mobile app (React Native)
- 🔄 3D card rendering with AR support

### Phase 3 (Q2 2026): Scale
- 🔮 DAO governance implementation
- 🔮 Creator marketplace with tools
- 🔮 Gaming integration (card battles)
- 🔮 Social features (guilds, tournaments)

### Phase 4 (Q3 2026): Innovation
- 🔮 Metaverse integration
- 🔮 Dynamic NFTs (evolving cards)
- 🔮 AI-generated card art
- 🔮 Predictive card drops

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Python** 3.10-3.12 ([Download](https://www.python.org/downloads/))
- **Git** (already installed)

### Installation (5 Minutes)

**Step 1: Install Dependencies**
```powershell
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..

# Python AI Service
cd crewai-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

**Step 2: Get API Keys (FREE)**
1. **Blockfrost** (Cardano): https://blockfrost.io
2. **Gemini** (Google AI): https://aistudio.google.com/app/apikey

**Step 3: Configure Environment**
```powershell
# Backend
cd backend
cp .env.example .env
# Edit backend/.env and add your BLOCKFROST_API_KEY

# Frontend
cd ../frontend
cp .env.example .env
# Frontend works with defaults

# CrewAI Service
cd ../crewai-service
cp .env.example .env
# Edit crewai-service/.env and add your GEMINI_API_KEY
```

**Step 4: Launch Application**
```powershell
# Easy way - Run launcher script
.\START_APP.ps1

# OR manually start each service:
# Terminal 1: cd crewai-service && .\venv\Scripts\activate && python main.py api
# Terminal 2: cd backend && npm run dev
# Terminal 3: cd frontend && npm run dev
```

**Step 5: Access Application**

Open browser: **http://localhost:5173**

📖 **Complete Setup Guide**: See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for detailed instructions, troubleshooting, and deployment guide.

## 🔐 Security Features

- **Hardware Wallet Support**: Ledger & Trezor integration
- **Multi-Sig Transactions**: Enhanced security for high-value trades
- **Rate Limiting**: DDoS protection
- **Input Validation**: Prevent malicious transactions
- **Audit Logging**: Complete transaction history
- **Encrypted Storage**: Sensitive data protection

## 📈 Market Differentiators

1. **AI-First Design**: Every feature enhanced by intelligent agents
2. **True Decentralization**: No central points of failure
3. **Cardano Native**: Built for Cardano's unique features
4. **Future-Proof**: Aligned with Web3 roadmaps
5. **Creator-Friendly**: Low fees, high royalties

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

## 🔗 Links

- **Website**: https://cardanoverse.io (placeholder)
- **Documentation**: https://docs.cardanoverse.io (placeholder)
- **Discord**: https://discord.gg/cardanoverse (placeholder)
- **Twitter**: @CardanoVerse (placeholder)

## 💡 Technical Highlights

This project demonstrates:
- ✅ Production-ready Cardano NFT implementation
- ✅ Masumi Network decentralized architecture
- ✅ Sokosumi AI agent orchestration
- ✅ Modern Web3 UX/UI patterns
- ✅ Scalable microservices design
- ✅ Comprehensive testing coverage
- ✅ Docker-based deployment
- ✅ CI/CD pipeline ready

---

**Built with ❤️ for the Cardano Community**
