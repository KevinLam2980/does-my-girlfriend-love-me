# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All TypeScript errors fixed
- [ ] Dependencies moved to correct sections in package.json
- [ ] Environment variables configured
- [ ] API URL uses environment variables
- [ ] Build scripts working locally

### GitHub Setup
- [ ] Code pushed to GitHub repository
- [ ] Repository is public (for free tiers)
- [ ] All files committed

### MongoDB Atlas
- [ ] Connection string ready
- [ ] IP whitelist includes `0.0.0.0/0` (for Railway)
- [ ] Database user created with read/write permissions

## 🚀 Deployment Steps

### Backend (Railway)
1. [ ] Sign up at [railway.app](https://railway.app)
2. [ ] Create new project from GitHub
3. [ ] Set root directory to `backend`
4. [ ] Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (will update after frontend deployment)
5. [ ] Deploy and get backend URL

### Frontend (Vercel)
1. [ ] Sign up at [vercel.com](https://vercel.com)
2. [ ] Import GitHub repository
3. [ ] Configure build settings:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. [ ] Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.railway.app`
5. [ ] Deploy and get frontend URL

### Final Configuration
1. [ ] Update `CORS_ORIGIN` in Railway to match Vercel URL
2. [ ] Test authentication flow
3. [ ] Test all features (cycles, events, settings)
4. [ ] Share your live app URL! 🎉

## 🔧 Quick Commands

```bash
# Test backend locally
cd backend
npm run build
npm start

# Test frontend locally
npm run build
npm start

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push
```

## 📞 Need Help?

- Check deployment logs in Railway/Vercel
- Verify environment variables are set correctly
- Test locally first
- Your app should be live in ~10 minutes! ⚡ 