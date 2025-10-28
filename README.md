# Interactive CV - Onur Karsli

An extraordinary, interactive CV built with React featuring particle effects, theme switching, animated stats, and more!

## 🎨 Features

- **Particle Animation System**: Floating particles create a magical atmosphere
- **Theme Switcher**: 4 beautiful themes (Purple, Ocean, Sunset, Forest)
- **Career Stats Overlay**: Click the profile photo to see impressive career statistics
- **Magic Cursor Trail**: Mouse leaves glowing sparkles on desktop
- **Shake to Reorder**: Shake your device or press SPACE to reorder sections
- **Interactive Skills**: Hover over skills for ripple effects and animations
- **Responsive Design**: Looks like an iPad on larger screens
- **Smooth Animations**: Professional transitions and effects throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/interactive-cv.git
cd interactive-cv
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to GitHub Pages

### Step 1: Update package.json

Replace `YOUR_GITHUB_USERNAME` in `package.json` with your actual GitHub username:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/interactive-cv"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `interactive-cv`
2. **Important**: Do NOT initialize with README, .gitignore, or license

### Step 3: Deploy

From your project directory, run:

```bash
# Add your GitHub repository as remote (if not already done)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/interactive-cv.git

# Push to GitHub
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under "Source", select `gh-pages` branch
4. Click **Save**

Your CV will be live at: `https://YOUR_GITHUB_USERNAME.github.io/interactive-cv`

## 🎮 Interactive Features

### Desktop
- **Click 🎨**: Change theme colors
- **Click profile photo**: See career stats
- **Press SPACE or double-click**: Shake and reorder sections
- **Move mouse**: Create sparkle trails
- **Hover over skills**: See ripple effects

### Mobile
- **Tap 🎨**: Change themes
- **Tap profile photo**: View stats
- **Tap "Shake to reorder"**: Reorder sections
- **Shake device**: Automatically reorder sections

## 🛠️ Technologies Used

- **React 19**: Latest React with hooks
- **CSS3**: Advanced animations and effects
- **Canvas API**: Particle system
- **GitHub Pages**: Hosting

## 📝 Customization

To customize the CV with your own information:

1. Edit `/src/cvData.js` with your details
2. Replace `/public/onur.jpeg` with your photo
3. Update stats in `/src/components/StatsOverlay.js`
4. Modify colors/themes in `/src/App.js`

## 📄 License

MIT License - feel free to use this for your own CV!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Onur Karsli**
- LinkedIn: [@onur-karsli](https://linkedin.com/in/onur-karsli)
- Email: i.onur.karsli@gmail.com

---

⭐️ If you like this project, give it a star on GitHub!

