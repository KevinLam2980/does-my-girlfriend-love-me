# Does My GF Love Me? - Full Stack Application

A comprehensive relationship tracking application with cycle prediction and event logging, built with React/TypeScript frontend and Node.js/Express backend with MongoDB.

## 🚀 Features

### Frontend (React + TypeScript)
- **Cycle Tracking**: Log and track menstrual cycles with ML-based predictions
- **Event Logging**: Record relationship events (nice gestures, arguments, gifts, etc.)
- **Dashboard**: Visual charts and statistics for cycle analysis
- **Authentication**: Secure user registration and login
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live data synchronization with backend

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for cycles, events, and settings
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Data Persistence**: MongoDB database with Mongoose ODM
- **Multi-user Support**: Isolated data per user with proper authorization
- **TypeScript**: Full type safety throughout the backend

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- React Hot Toast for notifications
- Recharts for data visualization
- Regression.js for ML predictions

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- dotenv for environment variables

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd does-my-gf-love-me
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/does-my-gf-love-me
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   npm start
   ```
   Frontend will run on http://localhost:3000

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend in production**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
does-my-gf-love-me/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── store/             # Redux store and slices
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── public/                # Static assets
└── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Cycles
- `GET /api/cycles` - Get user's cycles
- `POST /api/cycles` - Create new cycle
- `PUT /api/cycles/:id` - Update cycle
- `DELETE /api/cycles/:id` - Delete cycle

### Events
- `GET /api/events` - Get user's events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register/login through the frontend
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage
4. Token is sent with each API request in the Authorization header
5. Backend middleware validates the token for protected routes

## 📊 Features in Detail

### Cycle Prediction
- Uses linear regression to predict future cycle start dates
- Analyzes historical cycle data for patterns
- Provides confidence intervals for predictions

### Event Tracking
- Log relationship events with timestamps
- Associate events with specific cycles
- Visual indicators for different event types

### Dashboard Analytics
- Cycle length statistics
- Event frequency analysis
- Phase-based event distribution
- Interactive charts and graphs

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy from GitHub
3. Configure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Note**: This application is designed for educational and personal use. Always respect privacy and consent when tracking personal data.
