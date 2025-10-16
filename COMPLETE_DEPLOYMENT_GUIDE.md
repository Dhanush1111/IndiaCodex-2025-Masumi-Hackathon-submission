# 🚀 Complete Deployment Guide - CardanoVerse Trading Cards

## 📋 Project Analysis Summary

### Current Architecture
```
cardano-trading-cards/
├── frontend/          # React + Vite (Already deployed to Firebase Hosting)
├── backend/           # Node.js + Express API
├── masumi-integration/    # Masumi Network P2P node
├── sokosumi-mcp/     # Sokosumi AI agents
├── crewai-service/   # CrewAI agents (Python)
└── smart-contracts/  # Aiken smart contracts
```

### Deployment Status
✅ **Frontend**: Deployed to Firebase Hosting (https://cardanoverse-tradingcards.web.app)
❌ **Backend**: Not deployed
❌ **Masumi Network**: Not deployed
❌ **Sokosumi AI**: Not deployed
❌ **CrewAI Service**: Not deployed

---

## 🎯 Deployment Strategy

### Option 1: Full Firebase Deployment (Recommended for Demo)
- Frontend: Firebase Hosting ✅ (Done)
- Backend: Firebase Functions (Cloud Functions)
- Database: Firebase Firestore or Cloud SQL
- Masumi: Cloud Run container
- Sokosumi: Cloud Run container
- CrewAI: Cloud Run container

### Option 2: Hybrid Deployment
- Frontend: Firebase Hosting ✅
- Backend: Google Cloud Run
- Masumi: Google Cloud Run
- Sokosumi: Google Cloud Run
- Database: Cloud SQL (PostgreSQL)
- Cache: Memorystore (Redis)

### Option 3: Docker-Based Deployment
- All services: Docker Compose on VPS (DigitalOcean, Linode, etc.)
- Frontend: Firebase Hosting (CDN)
- Backend/Services: Single VPS with Docker

---

## 🔧 Implementation: Firebase + Cloud Run (Best for Hackathon)

### Step 1: Backend Deployment to Cloud Run

**Why Cloud Run?**
- Pay-per-use (free tier generous)
- Auto-scaling
- Supports Node.js backend
- Easy integration with Firebase

### Step 2: Update Firebase Config

We'll add Cloud Run backend URL and Functions configuration.

---

## 📦 Deployment Steps

### Phase 1: Backend Preparation

#### 1.1 Create Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

#### 1.2 Create .dockerignore
```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
dist
```

#### 1.3 Update Backend for Production
- Add health check endpoint
- Configure CORS for Firebase Hosting domain
- Add environment variable validation
- Implement graceful shutdown

### Phase 2: Masumi Network Deployment

#### 2.1 Already has Dockerfile
```
masumi-integration/Dockerfile ✅
```

#### 2.2 Configure for Cloud Run
- Expose port 7777
- Add health check
- Configure peer discovery

### Phase 3: Sokosumi AI Deployment

#### 3.1 Already has Dockerfile
```
sokosumi-mcp/Dockerfile ✅
```

#### 3.2 Configure for Cloud Run
- Expose port 3000
- Add health check
- Configure model loading

### Phase 4: CrewAI Service Deployment

#### 4.1 Create Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

---

## 🚀 Quick Deployment Commands

### Deploy Backend to Cloud Run
```bash
# Build and deploy
gcloud run deploy cardanoverse-backend \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production"
```

### Deploy Masumi Node
```bash
gcloud run deploy cardanoverse-masumi \
  --source ./masumi-integration \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deploy Sokosumi AI
```bash
gcloud run deploy cardanoverse-sokosumi \
  --source ./sokosumi-mcp \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deploy CrewAI Service
```bash
gcloud run deploy cardanoverse-crewai \
  --source ./crewai-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📝 Environment Variables Configuration

### Backend (.env for Cloud Run)
```env
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://cardanoverse-tradingcards.web.app

# Cardano
BLOCKFROST_API_KEY=your_key_here
CARDANO_NETWORK=mainnet

# Database (Cloud SQL)
DATABASE_URL=postgresql://user:pass@/db?host=/cloudsql/project:region:instance

# Redis (Memorystore)
REDIS_URL=redis://10.0.0.3:6379

# Masumi Network
MASUMI_NODE_URL=https://cardanoverse-masumi-xxx.run.app

# Sokosumi AI
SOKOSUMI_MCP_URL=https://cardanoverse-sokosumi-xxx.run.app

# CrewAI
CREWAI_SERVICE_URL=https://cardanoverse-crewai-xxx.run.app

# AI APIs
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
GOOGLE_AI_API_KEY=your_key_here
```

---

## 🔗 Update Frontend with Backend URLs

### Update frontend/.env.production
```env
VITE_API_URL=https://cardanoverse-backend-xxx.run.app
VITE_WS_URL=wss://cardanoverse-backend-xxx.run.app
VITE_MASUMI_URL=https://cardanoverse-masumi-xxx.run.app
VITE_NETWORK=mainnet
```

### Rebuild and Redeploy Frontend
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

---

## 🏗️ Infrastructure Setup

### 1. Enable Required APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable redis.googleapis.com
```

### 2. Create Cloud SQL Instance
```bash
gcloud sql instances create cardanoverse-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

### 3. Create Redis Instance
```bash
gcloud redis instances create cardanoverse-cache \
  --size=1 \
  --region=us-central1 \
  --redis-version=redis_7_0
```

---

## 💰 Cost Estimate (Free Tier Optimized)

### Monthly Costs
- **Firebase Hosting**: Free (10 GB/month)
- **Cloud Run Backend**: ~$0-5 (2M requests free)
- **Cloud Run Masumi**: ~$0-3 (minimal requests)
- **Cloud Run Sokosumi**: ~$0-3 (minimal requests)
- **Cloud Run CrewAI**: ~$0-3 (minimal requests)
- **Cloud SQL (f1-micro)**: $7.67/month
- **Memorystore Redis (1GB)**: $31/month

**Total Estimated**: ~$45-60/month (can optimize further)

### Free Tier Alternative
Use Firebase only:
- Firebase Hosting: Free
- Firebase Functions: Free (2M invocations/month)
- Firestore: Free (1 GB storage, 50K reads/day)
- No backend VMs needed

---

## 🎯 Recommended Deployment for Hackathon

### Minimal Working Setup (FREE)
1. ✅ **Frontend**: Firebase Hosting (already deployed)
2. ✅ **Backend**: Serverless Functions (Firebase Functions)
3. ✅ **Database**: Firestore (NoSQL) or mock data
4. ✅ **Masumi**: Mock implementation (frontend only)
5. ✅ **AI**: Mock responses (frontend only)

### Enhanced Setup (Paid - $50/month)
1. ✅ **Frontend**: Firebase Hosting
2. ✅ **Backend**: Cloud Run
3. ✅ **Database**: Cloud SQL PostgreSQL
4. ✅ **Cache**: Memorystore Redis
5. ✅ **Masumi**: Cloud Run container
6. ✅ **Sokosumi**: Cloud Run container

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: cd frontend && npm ci
      
      - name: Build
        run: cd frontend && npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: cardanoverse-tradingcards

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: cardanoverse-tradingcards
      
      - name: Deploy Backend
        run: |
          gcloud run deploy cardanoverse-backend \
            --source ./backend \
            --platform managed \
            --region us-central1 \
            --allow-unauthenticated
```

---

## 🧪 Testing Deployment

### 1. Health Checks
```bash
# Backend
curl https://cardanoverse-backend-xxx.run.app/health

# Masumi
curl https://cardanoverse-masumi-xxx.run.app/health

# Sokosumi
curl https://cardanoverse-sokosumi-xxx.run.app/health
```

### 2. Integration Tests
```bash
# Test API from frontend
curl -X GET https://cardanoverse-tradingcards.web.app/api/cards

# Test WebSocket
wscat -c wss://cardanoverse-backend-xxx.run.app
```

---

## 📊 Monitoring & Logging

### Cloud Run Monitoring
```bash
# View logs
gcloud run services logs read cardanoverse-backend \
  --limit=50 \
  --region=us-central1

# View metrics
gcloud run services describe cardanoverse-backend \
  --region=us-central1
```

### Firebase Performance Monitoring
Add to frontend:
```javascript
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

---

## 🚨 Troubleshooting

### Common Issues

**1. CORS Errors**
- Update backend CORS to include Firebase Hosting domain
- Add to backend/src/index.ts:
```typescript
app.use(cors({
  origin: [
    'https://cardanoverse-tradingcards.web.app',
    'https://cardanoverse-tradingcards.firebaseapp.com'
  ]
}));
```

**2. Cold Start Issues**
- Enable minimum instances:
```bash
gcloud run services update cardanoverse-backend \
  --min-instances=1 \
  --region=us-central1
```

**3. Environment Variables Not Loading**
- Set via gcloud:
```bash
gcloud run services update cardanoverse-backend \
  --set-env-vars="KEY=value" \
  --region=us-central1
```

---

## 📚 Next Steps

1. **Immediate** (For hackathon demo):
   - ✅ Frontend is live
   - Deploy backend to Cloud Run (30 mins)
   - Update frontend to use Cloud Run backend
   - Test end-to-end

2. **Short-term** (Week 1):
   - Deploy Masumi node
   - Deploy Sokosumi AI
   - Add real wallet integration
   - Add Blockfrost API key

3. **Medium-term** (Month 1):
   - Setup CI/CD pipeline
   - Add monitoring and alerting
   - Implement caching strategy
   - Optimize performance

4. **Long-term**:
   - Scale to production
   - Add redundancy
   - Implement load balancing
   - Add CDN for static assets

---

## 🎯 Success Metrics

### Deployment Goals
- ✅ Frontend: <3s load time
- ✅ Backend: <500ms API response
- ✅ Uptime: >99.9%
- ✅ Cost: <$100/month
- ✅ Global: <200ms latency worldwide

### Monitoring Dashboards
- Firebase Console: Performance
- Cloud Run: Request metrics
- Cloud SQL: Query performance
- Uptime Robot: 24/7 monitoring

---

**Status**: Frontend Deployed ✅ | Backend Ready for Deployment ⏳
**Next Action**: Deploy backend to Cloud Run
**Timeline**: 1-2 hours for complete deployment

