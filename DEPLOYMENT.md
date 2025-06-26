# 🚀 Deployment Guide

This guide will help you deploy your "Does My GF Love Me?" app for free using your existing MongoDB Atlas cluster.

## 📋 Prerequisites

1. **MongoDB Atlas Cluster** (you already have this)
2. **GitHub Account** (to host your code)
3. **Vercel Account** (free for frontend)
4. **Railway Account** (free tier for backend)

## 🔧 Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/does-my-gf-love-me.git
git push -u origin main
```

### 1.2 Update Environment Variables
You'll need to set these environment variables in your deployment platforms:

**Backend Environment Variables:**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**Frontend Environment Variables:**
```env
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

## 🌐 Step 2: Deploy Backend (Railway)

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Get $5 free credit (enough for months of usage)

### 2.2 Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Set the root directory to `backend`
5. Railway will automatically detect it's a Node.js app

### 2.3 Configure Environment Variables
1. Go to your project settings
2. Add these environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

### 2.4 Get Your Backend URL
Railway will give you a URL like: `https://your-app-name.railway.app`

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### 3.2 Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (root of repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Configure Environment Variables
1. Go to project settings
2. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-domain.railway.app
   ```

### 3.4 Update API Configuration
The frontend will automatically use the `REACT_APP_API_URL` environment variable to connect to your backend.

## 🔗 Step 4: Update CORS Settings

After deploying both frontend and backend, update the `CORS_ORIGIN` in your Railway backend environment variables to match your Vercel frontend URL.

## 🧪 Step 5: Test Your Deployment

1. **Test Backend Health**: Visit `https://your-backend.railway.app/api/health`
2. **Test Frontend**: Visit your Vercel URL
3. **Test Authentication**: Try registering and logging in
4. **Test Features**: Add cycles and events

## 💰 Cost Breakdown

### Free Tier Limits:
- **Vercel**: Completely free for personal projects
- **Railway**: $5/month free credit (your app will use ~$1-2/month)
- **MongoDB Atlas**: Free tier (512MB storage, shared RAM)

### Total Monthly Cost: ~$0-2

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Make sure `CORS_ORIGIN` is set correctly in backend
   - Check that frontend URL matches exactly

2. **MongoDB Connection Issues**
   - Verify your MongoDB Atlas connection string
   - Make sure your IP whitelist includes `0.0.0.0/0` for Railway

3. **Build Failures**
   - Check that all dependencies are in `dependencies` not `devDependencies`
   - Verify TypeScript compilation works locally

4. **Environment Variables**
   - Make sure all required variables are set
   - Check that variable names match exactly

### Debug Commands:
```bash
# Test backend locally
cd backend
npm run build
npm start

# Test frontend locally
npm run build
npm start
```

## 🚀 Alternative Deployment Options

### If Railway doesn't work:
- **Render**: Free tier available
- **Cyclic**: Free tier with limitations
- **Heroku**: Free tier discontinued, but paid plans available

### If Vercel doesn't work:
- **Netlify**: Excellent alternative
- **GitHub Pages**: Free but requires build setup

## 📞 Support

If you encounter issues:
1. Check the deployment logs in Railway/Vercel
2. Verify environment variables are set correctly
3. Test locally first
4. Check MongoDB Atlas connection

Your app should be live and accessible from anywhere in the world! 🌍 