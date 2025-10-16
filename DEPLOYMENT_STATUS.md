# 🚀 CardanoVerse - Deployment Status & Instructions

## 📊 Current Deployment Status

### ✅ Completed
- **Frontend**: LIVE at https://cardanoverse-tradingcards.web.app
- **GitHub**: Repository updated with live demo link
- **Docker Configuration**: Complete with 6 services
- **Backend Code**: Complete and tested locally
- **Deployment Scripts**: Ready for execution

### ⏳ Pending Deployment
- **Backend API**: Ready to deploy to Cloud Run
- **Masumi Network**: Ready to deploy to Cloud Run  
- **Sokosumi AI**: Ready to deploy to Cloud Run
- **Database**: Using in-memory (can upgrade to Cloud SQL)
- **Redis Cache**: Using in-memory (can upgrade to Memorystore)

---

## 🎯 Quick Deployment (Choose One)

### Option 1: Deploy Backend Only (Fastest - 5 minutes)
```powershell
.\deploy-backend.ps1
```
**What it does:**
- Deploys Express backend to Google Cloud Run
- Configures CORS for frontend
- Returns backend URL
- Tests health endpoint

**Cost**: FREE (within Cloud Run free tier)

### Option 2: Deploy All Services (Complete - 15 minutes)
```powershell
.\deploy-all-services.ps1
```
**What it does:**
- Deploys Backend + Masumi + Sokosumi
- Configures all environment variables
- Creates frontend .env.production
- Returns all service URLs

**Cost**: ~$10-20/month (after free tier)

### Option 3: Manual Step-by-Step (Full Control)
Follow instructions in `QUICK_DEPLOY.md`

---

## 📦 What's Being Deployed

### Backend Service
- **Technology**: Node.js + Express + TypeScript
- **Features**:
  - Cardano blockchain integration (Blockfrost API)
  - WebSocket support for real-time updates
  - AI agent integration
  - P2P networking integration
- **Port**: 8080 (Cloud Run standard)
- **Memory**: 1 GB
- **Scaling**: 0-10 instances (auto-scales)

### Masumi Network Service
- **Technology**: Node.js + libp2p
- **Features**:
  - P2P networking
  - Peer discovery
  - Distributed messaging
- **Port**: 7777
- **Memory**: 512 MB
- **Scaling**: 0-3 instances

### Sokosumi AI Service
- **Technology**: Node.js + AI models
- **Features**:
  - Trading advisor agent
  - Rarity evaluator agent
  - Market analysis agent
  - Valuation agent
- **Port**: 3000
- **Memory**: 1 GB
- **CPU**: 2 cores
- **Scaling**: 0-5 instances

---

## 🔧 Prerequisites

### Required Software
1. **Google Cloud SDK** (gcloud CLI)
   - Download: https://cloud.google.com/sdk/docs/install
   - Or install via PowerShell: `choco install gcloudsdk`

2. **Firebase CLI** (Already installed)
   - Check: `firebase --version`

3. **Git** (Already installed)

### Required Accounts
1. **Google Cloud Account**
   - Must have billing enabled (free tier available)
   - Project: `cardanoverse-tradingcards` (already exists)

2. **Firebase Project** (Already set up)
   - Project ID: `cardanoverse-tradingcards`

### Authentication
```powershell
# Login to Google Cloud
gcloud auth login

# Set project
gcloud config set project cardanoverse-tradingcards

# Verify
gcloud config list
```

---

## 🚀 Deployment Instructions

### Step 1: Authenticate
```powershell
gcloud auth login
gcloud config set project cardanoverse-tradingcards
```

### Step 2: Deploy Services
```powershell
# Quick option: Backend only
.\deploy-backend.ps1

# OR complete option: All services
.\deploy-all-services.ps1
```

### Step 3: Update Frontend
After deployment completes, you'll get backend URL(s). Then:

```powershell
# Frontend will rebuild and redeploy
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

### Step 4: Test
```powershell
# Test backend
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/health

# Test frontend
# Open: https://cardanoverse-tradingcards.web.app
```

---

## 📋 Deployment Checklist

- [ ] Google Cloud SDK installed
- [ ] Authenticated to Google Cloud
- [ ] Project set to `cardanoverse-tradingcards`
- [ ] Billing enabled on Google Cloud
- [ ] Run deployment script
- [ ] Save backend URL
- [ ] Update frontend environment
- [ ] Rebuild and redeploy frontend
- [ ] Test complete application
- [ ] Update GitHub README with backend URL

---

## 🔍 Monitoring & Logs

### View Logs
```powershell
# Backend logs
gcloud run services logs read cardanoverse-backend --limit=50

# Masumi logs
gcloud run services logs read cardanoverse-masumi --limit=50

# Sokosumi logs
gcloud run services logs read cardanoverse-sokosumi --limit=50
```

### View Services
```powershell
# List all services
gcloud run services list

# Get service details
gcloud run services describe cardanoverse-backend --region=us-central1
```

### Cloud Console
- Dashboard: https://console.cloud.google.com/run
- Logs: https://console.cloud.google.com/logs
- Metrics: https://console.cloud.google.com/monitoring

---

## 💰 Cost Breakdown

### Free Tier (Always Free)
- Cloud Run: 2M requests/month
- Cloud Build: 120 build-minutes/day
- Firebase Hosting: 10 GB transfer/month
- Firebase Functions: 2M invocations/month

### Estimated Monthly Cost (After Free Tier)
- **Backend**: $5-10 (low traffic)
- **Masumi**: $2-5 (minimal traffic)
- **Sokosumi**: $5-10 (AI processing)
- **Networking**: $1-2
- **Total**: **$13-27/month** for production

### Cost Optimization Tips
1. Use Cloud Run's auto-scaling (scales to zero)
2. Set max instances to control costs
3. Use Cloud CDN for static assets
4. Enable Cloud Run CPU throttling
5. Monitor usage in Cloud Console

---

## 🐛 Troubleshooting

### Issue: "gcloud: command not found"
**Solution**: Install Google Cloud SDK
```powershell
# Via Chocolatey
choco install gcloudsdk

# Or download from
# https://cloud.google.com/sdk/docs/install
```

### Issue: "Permission denied"
**Solution**: Check authentication
```powershell
gcloud auth login
gcloud projects list  # Should show your project
```

### Issue: "API not enabled"
**Solution**: Enable required APIs
```powershell
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Issue: "Billing not enabled"
**Solution**: Enable billing in Cloud Console
- Go to: https://console.cloud.google.com/billing
- Link billing account to project

### Issue: "Build failed"
**Solution**: Check build logs
```powershell
gcloud builds list --limit=5
gcloud builds log [BUILD_ID]
```

### Issue: CORS errors
**Solution**: Backend CORS is configured for:
- `https://cardanoverse-tradingcards.web.app`
- `https://cardanoverse-tradingcards.firebaseapp.com`

If using custom domain, update CORS in backend.

---

## 🎯 Success Criteria

### Backend Deployment Success
- ✅ Service deployed to Cloud Run
- ✅ Health endpoint responds (200 OK)
- ✅ CORS configured for frontend
- ✅ Environment variables set
- ✅ Logs show no errors

### Frontend Integration Success
- ✅ Frontend connects to backend
- ✅ API requests succeed
- ✅ WebSocket connection established
- ✅ No CORS errors in console
- ✅ Cards load and display

### Complete System Success
- ✅ Frontend loads in <3 seconds
- ✅ Backend responds in <500ms
- ✅ All features functional
- ✅ No errors in logs
- ✅ Mobile responsive

---

## 📚 Documentation

- **Complete Guide**: `COMPLETE_DEPLOYMENT_GUIDE.md`
- **Quick Start**: `QUICK_DEPLOY.md`
- **Main README**: `README.md`
- **Backend Docs**: `backend/README.md`
- **Frontend Docs**: `frontend/README.md`

---

## 🎉 After Deployment

### Update GitHub README
Add backend URL to README.md:
```markdown
## 🌐 Live Demo
- Frontend: https://cardanoverse-tradingcards.web.app
- Backend API: https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
- Masumi P2P: https://cardanoverse-masumi-XXXXXXXXXX-uc.a.run.app
```

### Share Your Project
- Demo URL: https://cardanoverse-tradingcards.web.app
- GitHub: https://github.com/Dhanush1111/IndiaCodex-2025-Masumi-Hackathon-submission
- Backend API: [Your Cloud Run URL]

### Monitor Performance
- Set up Cloud Monitoring alerts
- Monitor costs in Cloud Console
- Track user analytics in Firebase

---

## 📞 Support

### Google Cloud Support
- Documentation: https://cloud.google.com/run/docs
- Community: https://stackoverflow.com/questions/tagged/google-cloud-run

### Firebase Support
- Documentation: https://firebase.google.com/docs
- Community: https://stackoverflow.com/questions/tagged/firebase

### Cardano Support
- Documentation: https://docs.cardano.org
- Community: https://forum.cardano.org

---

**Current Status**: 
- ✅ Frontend Deployed
- ⏳ Backend Ready for Deployment
- ⏳ Masumi Ready for Deployment
- ⏳ Sokosumi Ready for Deployment

**Next Action**: Run `.\deploy-backend.ps1` or `.\deploy-all-services.ps1`

**Estimated Time**: 5-15 minutes

---

**Last Updated**: 2025
**Version**: 1.0.0
**Project**: CardanoVerse Trading Cards
