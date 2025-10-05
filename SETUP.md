# 🚀 CardanoVerse Setup Guide

This guide will help you get CardanoVerse up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **npm** v10 or higher (comes with Node.js)
- **Docker** and **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/downloads))
- **Cardano Wallet** (Nami, Eternl, Flint, or Lace browser extension)

### Optional (for advanced features)
- **Aiken** (for smart contract development)
- **PostgreSQL** 15+ (if not using Docker)
- **Redis** (if not using Docker)

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/cardanoverse/trading-cards.git
cd cardano-trading-cards
```

### Step 2: Environment Setup

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env` and configure the following essential variables:

```env
# Cardano Configuration
CARDANO_NETWORK=preprod
BLOCKFROST_API_KEY=your_blockfrost_api_key_here

# Get your Blockfrost API key from: https://blockfrost.io/

# Database
DATABASE_URL=postgresql://cardano_user:secure_password@localhost:5432/cardanoverse_db

# Redis
REDIS_URL=redis://localhost:6379

# Backend API
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Frontend
VITE_API_URL=http://localhost:5000/api/v1
VITE_CARDANO_NETWORK=preprod
```

### Step 3: Install Dependencies

Install all project dependencies:

```bash
npm run install:all
```

This will install dependencies for:
- Root project
- Frontend
- Backend
- Masumi integration
- Sokosumi MCP server

### Step 4: Start Docker Services

Start PostgreSQL, Redis, IPFS, and other services:

```bash
docker-compose up -d
```

Verify services are running:

```bash
docker-compose ps
```

You should see:
- ✅ cardanoverse-postgres (port 5432)
- ✅ cardanoverse-redis (port 6379)
- ✅ cardanoverse-ipfs (ports 4001, 5001, 8080)
- ✅ cardanoverse-masumi (port 7777)
- ✅ cardanoverse-sokosumi (port 3000)

### Step 5: Database Setup

Initialize the database schema:

```bash
cd backend
npm run db:migrate
```

### Step 6: Start Development Servers

In the project root, run:

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Masumi Network**: http://localhost:7777
- **Sokosumi MCP**: http://localhost:3000

## 🔍 Verification

### Check Frontend
Open your browser and navigate to: http://localhost:5173

You should see the CardanoVerse homepage.

### Check Backend API
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-05T..."
}
```

### Check Sokosumi AI Agents
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "agents": ["valuation", "trading-advisor", "market-analysis", "rarity-evaluator"]
}
```

### Check Masumi Network
```bash
curl http://localhost:7777/p2p/stats
```

Expected response:
```json
{
  "connectedPeers": 0,
  "totalOffers": 0,
  "volume24h": 0
}
```

## 🎮 Quick Start Guide

### 1. Connect Your Wallet

1. Click "Connect Wallet" in the top right
2. Select your Cardano wallet (Nami, Eternl, Flint, or Lace)
3. Approve the connection in your wallet extension
4. Your wallet address will appear in the header

### 2. Browse the Marketplace

1. Click "Marketplace" in the navigation
2. Browse available trading cards
3. Click on a card to view details

### 3. Create Your First Card

1. Click "Create" in the navigation
2. Upload card artwork (PNG, JPG, or SVG)
3. Fill in card details (name, description, attributes)
4. Click "Mint NFT"
5. Approve the transaction in your wallet
6. Wait for blockchain confirmation

### 4. Get AI Insights

1. Click "AI Insights" in the navigation
2. View AI-powered market analysis
3. Get valuation estimates for your cards
4. Receive personalized trading recommendations

### 5. P2P Trading

1. Click "P2P Trading" in the navigation
2. Browse peer-to-peer offers
3. Make direct trades with other collectors
4. Benefit from decentralized infrastructure

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port already in use" errors:

**Windows:**
```powershell
# Check what's using the port
netstat -ano | findstr :5173

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Docker Issues

**Restart all services:**
```bash
docker-compose down
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

### Wallet Connection Issues

1. Ensure your wallet extension is installed and unlocked
2. Make sure you're on the correct network (PreProd for testing)
3. Try refreshing the page
4. Clear browser cache and cookies

### Database Connection Errors

```bash
# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

## 📚 Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Lint code
npm run test         # Run tests
```

### Backend
```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm start            # Start production server
npm run test         # Run tests
```

### Smart Contracts
```bash
cd smart-contracts
aiken build          # Compile contracts
aiken check          # Type check
aiken test           # Run tests
```

### Docker
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f [service]  # View logs
docker-compose restart [service]  # Restart service
```

## 🌐 Network Configuration

### Using Cardano PreProd Testnet (Recommended for Testing)

1. Get test ADA from the [Cardano Testnet Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet/)
2. Set `CARDANO_NETWORK=preprod` in `.env`
3. Use a PreProd Blockfrost API key

### Using Cardano Mainnet (Production)

⚠️ **Warning**: Use real ADA on mainnet. Test thoroughly on preprod first!

1. Set `CARDANO_NETWORK=mainnet` in `.env`
2. Use a Mainnet Blockfrost API key
3. Ensure smart contracts are audited

## 🔑 Getting API Keys

### Blockfrost (Required)
1. Visit https://blockfrost.io/
2. Sign up for a free account
3. Create a new project (select PreProd or Mainnet)
4. Copy your API key to `.env`

### OpenAI (Optional - for enhanced AI features)
1. Visit https://platform.openai.com/
2. Create an account
3. Generate an API key
4. Add to `.env` as `OPENAI_API_KEY`

### Anthropic Claude (Optional - for enhanced AI features)
1. Visit https://console.anthropic.com/
2. Create an account
3. Generate an API key
4. Add to `.env` as `ANTHROPIC_API_KEY`

## 📖 Next Steps

- Read the [Architecture Documentation](./ARCHITECTURE.md)
- Explore the [API Documentation](./docs/API.md)
- Check out [Contributing Guidelines](./CONTRIBUTING.md)
- Join our [Discord Community](https://discord.gg/cardanoverse)

## 🆘 Support

Need help? Here's where to get it:

- 💬 **Discord**: https://discord.gg/cardanoverse
- 🐦 **Twitter**: @CardanoVerse
- 📧 **Email**: support@cardanoverse.io
- 🐛 **Issues**: https://github.com/cardanoverse/trading-cards/issues

## 🎉 Congratulations!

You've successfully set up CardanoVerse! Start creating, trading, and collecting AI-powered trading cards on the Cardano blockchain.

Happy trading! 🎴✨
