const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Building backend...');

try {
  // Change to backend directory
  process.chdir(path.join(__dirname, 'backend'));
  
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Build the project
  console.log('🔨 Building TypeScript...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Backend build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 