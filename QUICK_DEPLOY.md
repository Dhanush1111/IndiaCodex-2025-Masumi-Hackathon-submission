# CardanoVerse - Quick Deployment Guide

## 🚀 One-Command Deployment

### For Windows (PowerShell):
```powershell
.\scripts\deploy-all.ps1
```

### For Linux/Mac:
```bash
chmod +x scripts/deploy-all.sh
./scripts/deploy-all.sh
```

## 📋 What Gets Deployed

1. **Frontend** → Firebase Hosting ✅
   - URL: https://cardanoverse-tradingcards.web.app
   - Already deployed

2. **Backend** → Google Cloud Run
   - Express API server
   - WebSocket support
   - Cardano integration

3. **Masumi Network** → Google Cloud Run
   - P2P networking node
   - libp2p implementation
   - Peer discovery

4. **Sokosumi AI** → Google Cloud Run
   - AI agents server
   - Trading advisor
   - Rarity evaluator
   - Market analysis

## 🎯 Step-by-Step Manual Deployment

### Prerequisites

1. **Install Google Cloud SDK**
   ```powershell
   # Windows (PowerShell)
   choco install gcloudsdk
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   ```

2. **Login to Google Cloud**
   ```powershell
   gcloud auth login
   gcloud config set project cardanoverse-tradingcards
   ```

3. **Install Firebase CLI** (if not already installed)
   ```powershell
   npm install -g firebase-tools
   firebase login
   ```

### Deploy Backend

```powershell
# Navigate to project root
cd c:\Users\dhwin\Project-UltraSonicBoom\cardano-trading-cards

# Deploy backend to Cloud Run
gcloud run deploy cardanoverse-backend `
  --source ./backend `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --memory 1Gi `
  --set-env-vars "NODE_ENV=production,PORT=8080"
```

**Expected Output:**
```
Service [cardanoverse-backend] deployed to URL:
https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
```

**Copy this URL!** You'll need it for the frontend.

### Deploy Masumi Network

```powershell
gcloud run deploy cardanoverse-masumi `
  --source ./masumi-integration `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --memory 512Mi
```

### Deploy Sokosumi AI

```powershell
gcloud run deploy cardanoverse-sokosumi `
  --source ./sokosumi-mcp `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --memory 1Gi `
  --cpu 2
```

### Update Frontend Environment

Create `frontend/.env.production`:

```env
VITE_API_URL=https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
VITE_WS_URL=wss://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app
VITE_MASUMI_URL=https://cardanoverse-masumi-XXXXXXXXXX-uc.a.run.app
VITE_NETWORK=mainnet
```

**Replace** `XXXXXXXXXX` with your actual Cloud Run URLs!

### Redeploy Frontend

```powershell
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

## 🧪 Test Deployment

### Test Backend
```powershell
# Replace with your backend URL
curl https://cardanoverse-backend-XXXXXXXXXX-uc.a.run.app/health
```

Expected response: `{"status":"ok","timestamp":"..."}`

### Test Frontend
Open: https://cardanoverse-tradingcards.web.app

Check browser console for any errors.

## 🔧 Troubleshooting

### Issue: "Permission denied"
```powershell
# Grant yourself permissions
gcloud projects add-iam-policy-binding cardanoverse-tradingcards `
  --member="user:your-email@gmail.com" `
  --role="roles/run.admin"
```

### Issue: "API not enabled"
```powershell
# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Issue: "Build failed"
Check the logs:
```powershell
gcloud builds list --limit=5
gcloud builds log [BUILD_ID]
```

### Issue: CORS errors in frontend
Update backend CORS configuration in `backend/src/index.ts`:
```typescript
app.use(cors({
  origin: [
    'https://cardanoverse-tradingcards.web.app',
    'https://cardanoverse-tradingcards.firebaseapp.com'
  ]
}));
```

Then redeploy backend.

## 📊 Monitor Deployment

### View Logs
```powershell
# Backend logs
gcloud run services logs read cardanoverse-backend --limit=50

# Masumi logs
gcloud run services logs read cardanoverse-masumi --limit=50

# Sokosumi logs
gcloud run services logs read cardanoverse-sokosumi --limit=50
```

### Check Service Status
```powershell
gcloud run services list
```

### View Metrics
Go to: https://console.cloud.google.com/run

## 💰 Cost Estimate

### Free Tier (First Month)
- Cloud Run: 2M requests free
- Cloud Build: 120 build-minutes/day free
- Firebase Hosting: 10 GB transfer free

### Expected Monthly Cost (After Free Tier)
- Backend: ~$5-10 (depending on traffic)
- Masumi: ~$2-5
- Sokosumi: ~$5-10
- Total: **$12-25/month** for low traffic

## 🎯 Next Steps

1. ✅ Deploy backend to Cloud Run
2. ✅ Deploy Masumi Network
3. ✅ Deploy Sokosumi AI
4. ✅ Update frontend with backend URLs
5. ✅ Redeploy frontend
6. ✅ Test complete flow
7. 📝 Update GitHub README with new URLs
8. 🎉 Demo ready!

## 🔐 Security Considerations

### Add API Keys
Store sensitive keys in Google Secret Manager:

```powershell
# Create secret
echo "your_blockfrost_api_key" | gcloud secrets create blockfrost-api-key --data-file=-

# Grant access to Cloud Run
gcloud secrets add-iam-policy-binding blockfrost-api-key `
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" `
  --role="roles/secretmanager.secretAccessor"

# Update Cloud Run to use secret
gcloud run services update cardanoverse-backend `
  --update-secrets=BLOCKFROST_API_KEY=blockfrost-api-key:latest
```

### Enable Authentication (Optional)
For production, enable Firebase Authentication:

```powershell
gcloud run services update cardanoverse-backend `
  --no-allow-unauthenticated
```

## 📚 Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [Cardano Documentation](https://docs.cardano.org/)
- [Blockfrost API](https://blockfrost.io/)

## ⚡ Pro Tips

1. **Use Cloud Build for CI/CD**: Automate deployments with GitHub Actions
2. **Enable Cloud CDN**: Speed up global access
3. **Use Cloud SQL**: For production database (currently using in-memory)
4. **Monitor with Cloud Monitoring**: Set up alerts for downtime
5. **Use Custom Domain**: Map your own domain to Firebase Hosting

---

**Status**: Frontend Deployed ✅ | Backend Ready ⏳ | Services Ready ⏳

**Time to Deploy**: 15-30 minutes (first time)

**Need Help?** Check logs or open an issue on GitHub!
