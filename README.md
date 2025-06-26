# Does My Girlfriend Love Me? 💕

A comprehensive relationship tracking application that helps you monitor relationship events and cycle data to understand patterns and trends in your relationship. P.S this Application is build solely for fun, to explore technologies, play with code, and make my girlfriend laugh.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC)
![Responsive](https://img.shields.io/badge/Responsive-Design-green)
![Accessible](https://img.shields.io/badge/Accessible-WCAG_2.1-orange)

## 🌟 Features

### 📊 **Dashboard & Analytics**
- **Real-time Overview**: View current cycle day, phase, and days until next period
- **Interactive Charts**: Visualize relationship events by cycle day with phase overlays
- **Statistical Analysis**: Comprehensive event summaries by type and cycle phase
- **ML-Powered Predictions**: Advanced regression algorithms for cycle prediction

### 📅 **Cycle Tracking**
- **Period Management**: Add and track menstrual cycles with customizable lengths
- **Phase Visualization**: Automatic phase detection (Menstruation, Follicular, Ovulation, Luteal)
- **Prediction Engine**: Machine learning algorithms using polynomial and exponential regression
- **Historical Data**: View and analyze past cycles with calculated lengths

### 📝 **Event Tracking**
- **Relationship Events**: Track 5 types of relationship interactions:
  - 💖 Was Nice to Me
  - 😠 Was Mean to Me  
  - ⚔️ Had Argument
  - 🎁 Gave Gift
  - 🍕 Bought Food
- **Detailed Notes**: Add context and details to each event
- **Cycle Integration**: Events automatically linked to cycle phases
- **Edit & Delete**: Full CRUD operations for event management

### 🎨 **User Experience**
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Touch-Friendly**: Optimized for touch devices with proper sizing
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Dark/Light Mode**: Automatic theme detection
- **Toast Notifications**: Real-time feedback for all actions

### 💾 **Data Management**
- **Local Storage**: All data stored locally in your browser
- **Redux State**: Centralized state management with persistence
- **Data Export**: Easy backup and restore capabilities
- **Privacy-First**: No data sent to external servers

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript 5.0** - Type-safe development with strict type checking

### **State Management**
- **Redux Toolkit 1.9.5** - Simplified Redux with built-in best practices
- **React-Redux 8.1.1** - Official React bindings for Redux
- **Redux Persist** - Automatic state persistence to localStorage

### **Styling & UI**
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Hot Toast** - Elegant toast notifications

### **Data Visualization**
- **Recharts** - Composable charting library for React
- **Regression.js** - Machine learning regression algorithms

### **Development Tools**
- **Create React App** - Zero-configuration React setup
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing and optimization

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone https://github.com/KevinLam2980/does-my-girlfriend-love-me.git

# Navigate to project directory
cd does-my-girlfriend-love-me

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
# Create optimized production build
npm run build

# Serve production build locally
npm run serve
```

## 📱 Usage Guide

### Getting Started
1. **Add Your First Cycle**: Go to "Cycle Tracking" and add your first period
2. **Configure Settings**: Set your average cycle length in "Profile"
3. **Track Events**: Use "Add Events" to record relationship interactions
4. **View Analytics**: Check the "Dashboard" for insights and predictions

### Key Features
- **Dashboard**: Overview of current cycle status and predictions
- **Cycle Tracking**: Manage menstrual cycles and view historical data
- **Event Management**: Add, edit, and delete relationship events
- **Profile Settings**: Configure default cycle parameters

### Data Privacy
- All data is stored locally in your browser
- No data is transmitted to external servers
- You can export/import your data for backup

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Header, Navigation, Footer, Dialogs
│   ├── dashboard/      # Dashboard-specific components
│   ├── events/         # Event management components
│   ├── cycles/         # Cycle tracking components
│   └── profile/        # Settings components
├── pages/              # Main page components
├── store/              # Redux store configuration
│   ├── slices/         # Redux Toolkit slices
│   ├── middleware/     # Custom middleware
│   └── hooks.ts        # Redux hooks
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_TITLE=Does My Girlfriend Love Me?
REACT_APP_VERSION=1.0.0
```

### Customization
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Themes**: Update color schemes in component files
- **Features**: Enable/disable features in Redux slices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Redux Toolkit** for simplified state management
- **Tailwind CSS** for the utility-first styling approach
- **Recharts** for beautiful data visualization
- **Lucide** for the beautiful icon set

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation in the code comments
- Review the TypeScript types for API understanding

---

**Note**: This app is designed for personal use and relationship tracking. All data is stored locally and remains private to you.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
