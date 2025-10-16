# ✅ CardanoVerse Deployment Checklist

## 🎯 Complete Deployment Guide

**Use this checklist to track your deployment progress.**

---

## 📋 Pre-Deployment Checklist

### Prerequisites
- [ ] Google Cloud SDK installed (`gcloud --version`)
- [ ] Authenticated to Google Cloud (`gcloud auth list`)
- [ ] Firebase CLI installed (`firebase --version`)
- [ ] Firebase project exists (cardanoverse-tradingcards)
- [ ] Billing enabled on Google Cloud
- [ ] Project set correctly (`gcloud config get-value project`)

### Verification Commands
```powershell
# Check gcloud
gcloud --version

# Check authentication
gcloud auth list

# Check project
gcloud config get-value project

# Login if needed
gcloud auth login
gcloud config set project cardanoverse-tradingcards
```

---

## 🚀 Deployment Options

### Option A: Quick Deploy (Backend Only) - 5 minutes ⚡
**Best for**: Quick demo, testing backend
```powershell
.\deploy-backend.ps1
```

### Option B: Complete Deploy (All Services) - 15 minutes 🔥
**Best for**: Full feature demo, production-ready
```powershell
.\deploy-all-services.ps1
```

### Option C: Batch File (Windows Alternative)
```cmd
deploy.bat
```

---

## 📝 Deployment Steps

### Phase 1: Deploy Backend ✅

#### Step 1.1: Run Deployment Script
```powershell
.\deploy-backend.ps1
```

#### Step 1.2: Wait for Completion
- [ ] Build starts (Cloud Build)
- [ ] Container image created
- [ ] Service deployed to Cloud Run
- [ ] URL returned

**Expected output:**
```
✅ Backend deployed successfully!
   https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
```

#### Step 1.3: Save Backend URL
- [ ] URL saved to `BACKEND_URL.txt`
- [ ] Copy URL for next step

#### Step 1.4: Test Backend
```powershell
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/health
```
- [ ] Returns `{"status":"ok",...}`

---

### Phase 2: Update Frontend ✅

#### Step 2.1: Create/Update Environment File
Create `frontend/.env.production`:
```env
VITE_API_URL=https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
VITE_WS_URL=wss://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
VITE_NETWORK=mainnet
VITE_BLOCKFROST_PROJECT_ID=mainnet_your_project_id
```

**Replace `XXXXXXXXXX` with your actual Cloud Run URL!**

- [ ] File created
- [ ] Backend URL updated
- [ ] WebSocket URL updated

#### Step 2.2: Rebuild Frontend
```powershell
cd frontend
npm run build
```

- [ ] Build completes successfully
- [ ] `dist/` folder created
- [ ] No build errors

#### Step 2.3: Deploy Frontend
```powershell
cd ..
firebase deploy --only hosting
```

- [ ] Deployment starts
- [ ] Frontend uploaded
- [ ] Deployment completes

**Expected output:**
```
✔  Deploy complete!

Hosting URL: https://cardanoverse-tradingcards.web.app
```

---

### Phase 3: Testing ✅

#### Step 3.1: Test Backend Health
```powershell
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/health
```
- [ ] Status: 200 OK
- [ ] Response: `{"status":"ok"}`

#### Step 3.2: Test Frontend
Open: https://cardanoverse-tradingcards.web.app

**Browser checklist:**
- [ ] Page loads successfully
- [ ] No errors in console (F12)
- [ ] No CORS errors
- [ ] API calls work
- [ ] Cards display (if data exists)
- [ ] Wallet connect button visible

#### Step 3.3: Test API Endpoints
```powershell
# Test cardano endpoint
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/api/cardano/network

# Test cards endpoint
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/api/cards
```

- [ ] Cardano endpoint responds
- [ ] Cards endpoint responds
- [ ] No 500 errors

#### Step 3.4: Check Logs
```powershell
gcloud run services logs read cardanoverse-backend --limit=20
```

- [ ] No error logs
- [ ] Successful requests logged
- [ ] Server started successfully

---

## 🔧 Optional: Deploy Additional Services

### Deploy Masumi Network (Optional)
```powershell
cd masumi-integration
gcloud run deploy cardanoverse-masumi \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi
```

- [ ] Masumi deployed
- [ ] URL saved
- [ ] Health check passed

### Deploy Sokosumi AI (Optional)
```powershell
cd sokosumi-mcp
gcloud run deploy cardanoverse-sokosumi \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 2
```

- [ ] Sokosumi deployed
- [ ] URL saved
- [ ] Health check passed

---

## 📊 Post-Deployment Verification

### Functional Tests
- [ ] Frontend loads in <3 seconds
- [ ] Backend responds in <500ms
- [ ] No CORS errors
- [ ] API calls successful
- [ ] WebSocket connects (if used)
- [ ] Cardano wallet integration works
- [ ] Cards load and display

### Security Tests
- [ ] HTTPS enabled
- [ ] CORS restricted to frontend domain
- [ ] API keys not exposed in frontend
- [ ] Environment variables secure

### Performance Tests
- [ ] Lighthouse score >90
- [ ] First Contentful Paint <2s
- [ ] Time to Interactive <3s
- [ ] API response time <500ms

---

## 📝 Documentation Updates

### Update GitHub README
Add to README.md:
```markdown
## 🌐 Live Demo
- **Frontend**: https://cardanoverse-tradingcards.web.app
- **Backend API**: https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
- **Status**: Live and operational ✅

## 🏗️ Architecture
- Frontend: Firebase Hosting (React + Vite)
- Backend: Google Cloud Run (Node.js + Express)
- Database: PostgreSQL (Cloud SQL)
- Caching: Redis (Memorystore)
- Blockchain: Cardano (Blockfrost API)
```

Checklist:
- [ ] README.md updated
- [ ] Backend URL added
- [ ] Deployment section added
- [ ] Architecture documented

### Commit Changes
```powershell
git add README.md
git add frontend/.env.production
git commit -m "docs: add backend deployment URLs"
git push origin main
```

- [ ] Changes committed
- [ ] Pushed to GitHub

---

## 💰 Cost Monitoring

### Set Up Budget Alerts
1. Go to: https://console.cloud.google.com/billing
2. Create budget alert
3. Set budget: $20-50/month
4. Enable email alerts

- [ ] Budget alerts configured
- [ ] Email notifications enabled

### Monitor Usage
```powershell
# View service costs
gcloud billing projects describe cardanoverse-tradingcards

# Check Cloud Run usage
gcloud run services list
```

- [ ] Usage monitored
- [ ] Costs within budget

---

## 🚨 Troubleshooting

### Common Issues

#### Issue: Backend not responding
**Symptoms**: 502, 503, or timeout errors

**Solutions**:
1. Check logs:
   ```powershell
   gcloud run services logs read cardanoverse-backend --limit=50
   ```
2. Check service status:
   ```powershell
   gcloud run services describe cardanoverse-backend --region us-central1
   ```
3. Redeploy:
   ```powershell
   .\deploy-backend.ps1
   ```

#### Issue: CORS errors in frontend
**Symptoms**: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solutions**:
1. Check backend CORS config in `backend/src/index.ts`
2. Verify environment variable:
   ```powershell
   gcloud run services describe cardanoverse-backend \
     --region us-central1 \
     --format="value(spec.template.spec.containers[0].env)"
   ```
3. Update CORS:
   ```powershell
   gcloud run services update cardanoverse-backend \
     --set-env-vars="CORS_ORIGIN=https://cardanoverse-tradingcards.web.app" \
     --region us-central1
   ```

#### Issue: Frontend not updated
**Symptoms**: Old frontend still showing

**Solutions**:
1. Clear build cache:
   ```powershell
   cd frontend
   rm -rf dist node_modules/.vite
   npm run build
   ```
2. Hard deploy:
   ```powershell
   firebase deploy --only hosting --force
   ```
3. Clear browser cache: Ctrl+Shift+R

#### Issue: Environment variables not loading
**Symptoms**: Backend crashes or returns errors

**Solutions**:
1. Check environment variables:
   ```powershell
   gcloud run services describe cardanoverse-backend \
     --region us-central1
   ```
2. Update variables:
   ```powershell
   gcloud run services update cardanoverse-backend \
     --set-env-vars="NODE_ENV=production,PORT=8080" \
     --region us-central1
   ```

---

## ✅ Final Checklist

### Deployment Complete
- [ ] Backend deployed to Cloud Run
- [ ] Frontend updated with backend URL
- [ ] Frontend redeployed to Firebase
- [ ] All tests passing
- [ ] No errors in logs
- [ ] Documentation updated
- [ ] GitHub updated
- [ ] Cost monitoring enabled

### URLs Documented
- [ ] Frontend URL saved
- [ ] Backend URL saved
- [ ] Masumi URL saved (if deployed)
- [ ] Sokosumi URL saved (if deployed)

### Monitoring Set Up
- [ ] Cloud Run monitoring enabled
- [ ] Firebase Performance monitoring enabled
- [ ] Budget alerts configured
- [ ] Error tracking enabled

### Ready for Demo
- [ ] All features working
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Wallet integration works
- [ ] Cards display properly

---

## 🎉 Success!

If all items are checked, your deployment is complete! 🚀

### Share Your Project
- **Live Demo**: https://cardanoverse-tradingcards.web.app
- **GitHub**: https://github.com/Dhanush1111/IndiaCodex-2025-Masumi-Hackathon-submission
- **Backend**: [Your Cloud Run URL]

### Next Steps
1. Monitor usage and costs
2. Add more features
3. Optimize performance
4. Scale as needed
5. Share with community!

---

## 📊 Deployment Summary

**Completed**: ___/___  
**Time Taken**: ___ minutes  
**Status**: ✅ Live | ⏳ In Progress | ❌ Failed  

**Frontend URL**: https://cardanoverse-tradingcards.web.app  
**Backend URL**: ___________________________________  
**Masumi URL**: ___________________________________  
**Sokosumi URL**: ___________________________________  

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Last Updated**: 2025  
**Version**: 1.0.0  
**Project**: CardanoVerse Trading Cards  
**Status**: Production Ready ✅
