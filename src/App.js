import React, { useState, useEffect } from 'react';
import './App.css';
import Particles from './components/Particles';
import StatsOverlay from './components/StatsOverlay';
import FaceTimeCall from './components/FaceTimeCall';
import SpotlightSearch from './components/SpotlightSearch';
import SearchHint from './components/SearchHint';
import SFIcon from './components/SFIcon';
import { cvData } from './cvData';

const themes = [
  { 
    name: 'Purple Galaxy',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    wallpaper: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.8) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.7) 0%, transparent 40%), radial-gradient(circle at 40% 20%, rgba(240, 147, 251, 0.6) 0%, transparent 35%), radial-gradient(circle at 60% 60%, rgba(102, 126, 234, 0.5) 0%, transparent 45%)'
  },
  { 
    name: 'Ocean Blue',
    gradient: 'linear-gradient(135deg, #2e3192 0%, #1bffff 50%, #667eea 100%)',
    wallpaper: 'radial-gradient(circle at 30% 30%, rgba(27, 255, 255, 0.7) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(46, 49, 146, 0.8) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(102, 126, 234, 0.6) 0%, transparent 50%)'
  },
  { 
    name: 'Sunset',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #f29263 100%)',
    wallpaper: 'radial-gradient(ellipse at 50% 100%, rgba(255, 107, 107, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(254, 202, 87, 0.7) 0%, transparent 45%), radial-gradient(circle at 20% 40%, rgba(242, 146, 99, 0.6) 0%, transparent 40%)'
  },
  { 
    name: 'Forest',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 50%, #a8e063 100%)',
    wallpaper: 'radial-gradient(circle at 40% 40%, rgba(113, 178, 128, 0.7) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(168, 224, 99, 0.7) 0%, transparent 40%), radial-gradient(circle at 20% 70%, rgba(19, 78, 94, 0.6) 0%, transparent 50%)'
  }
];

const appIcons = [
  { id: 'profile', name: 'About Me', icon: 'person', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', type: 'summary' },
  { id: 'experience', name: 'Work', icon: 'briefcase', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', type: 'experience' },
  { id: 'skills', name: 'Tech Stack', icon: 'gear', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', type: 'skills' },
  { id: 'education', name: 'Education', icon: 'graduationcap', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', type: 'education' },
  { id: 'contact', name: 'Connect', icon: 'message', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', type: 'contact' },
  { id: 'languages', name: 'Languages', icon: 'globe', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', type: 'languages' },
  { id: 'interests', name: 'Hobbies', icon: 'music', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', type: 'interests' },
];

function App() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [iconRect, setIconRect] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [statsIconRect, setStatsIconRect] = useState(null);
  const [isStatsAnimating, setIsStatsAnimating] = useState(false);
  const [showFaceTime, setShowFaceTime] = useState(false);
  const [faceTimeIconRect, setFaceTimeIconRect] = useState(null);
  const [isFaceTimeAnimating, setIsFaceTimeAnimating] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);

  // Handle pull down to show Spotlight search (iOS-style)
  useEffect(() => {
    let startY = 0;
    let startX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      // Only trigger if touching the home screen area (not on modals)
      if (e.target.closest('.app-detail-overlay, .stats-overlay, .facetime-overlay, .spotlight-search')) {
        return;
      }
      
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = currentY - startY;
      const deltaX = Math.abs(currentX - startX);

      // Only trigger if mostly vertical movement
      if (deltaX > 50) {
        isDragging = false;
        return;
      }

      // Pull down gesture (from anywhere on screen)
      if (deltaY > 120) {
        isDragging = false;
        setShowSpotlight(true);
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const handleMouseDown = (e) => {
      // Desktop: trigger from anywhere on the home screen
      if (e.target.closest('.app-detail-overlay, .stats-overlay, .facetime-overlay, .spotlight-search')) {
        return;
      }
      
      startY = e.clientY;
      startX = e.clientX;
      isDragging = true;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const deltaX = Math.abs(e.clientX - startX);

      // Only trigger if mostly vertical movement
      if (deltaX > 50) {
        isDragging = false;
        return;
      }

      // Pull down from anywhere
      if (deltaY > 100) {
        isDragging = false;
        setShowSpotlight(true);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Keyboard shortcut: Cmd+K or Ctrl+K
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSpotlight(true);
      }
      // ESC to close
      if (e.key === 'Escape' && showSpotlight) {
        setShowSpotlight(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSpotlight]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!/Mobi|Android/i.test(navigator.userAgent)) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setParallaxOffset({ x, y });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.7 && !/Mobi|Android/i.test(navigator.userAgent)) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tilt effect on mobile (accelerometer)
  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.beta && event.gamma) {
        const x = (event.gamma / 45) * 10; // gamma: left to right tilt (-90 to 90)
        const y = (event.beta / 90) * 10;  // beta: front to back tilt (-180 to 180)
        setParallaxOffset({ x, y });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  const handleThemeChange = () => {
    const nextTheme = (currentTheme + 1) % themes.length;
    setCurrentTheme(nextTheme);
    document.body.style.background = themes[nextTheme].gradient;
    document.body.style.backgroundSize = '400% 400%';
    
    // Update wallpaper overlay
    const wallpaperOverlay = document.querySelector('.wallpaper-overlay');
    if (wallpaperOverlay) {
      wallpaperOverlay.style.background = themes[nextTheme].wallpaper;
    }
  };

  const openApp = (app, event) => {
    // Get the clicked icon's exact bounding box
    const iconElement = event.currentTarget.querySelector('.icon-container');
    const rect = iconElement.getBoundingClientRect();
    
    setIconRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    });
    setSelectedApp(app);
    
    // Trigger animation after DOM update
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const closeApp = () => {
    if (!selectedApp) return;
    
    // Trigger closing animation
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedApp(null);
      setIconRect(null);
    }, 450); // Match animation duration
  };

  const renderAppContent = (app) => {
    switch (app.type) {
      case 'summary':
        return (
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Onur Karsli</div>
            <div style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>Senior Full-Stack Engineer</div>
            <div style={{ lineHeight: '1.8' }}>{cvData.summary}</div>
          </div>
        );
      
      case 'experience':
        return cvData.experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: idx < cvData.experience.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none' }}>
            <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '5px' }}>{exp.title}</div>
            <div style={{ fontSize: '16px', marginBottom: '3px', opacity: 0.9 }}>{exp.company}</div>
            <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '15px' }}>{exp.period}</div>
            <div style={{ lineHeight: '1.7' }}>{exp.description}</div>
          </div>
        ));
      
      case 'skills':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
            {[...cvData.skills.fullStack, ...cvData.skills.mobile, ...cvData.skills.tools, ...cvData.skills.leadership].map((skill, idx) => (
              <div key={idx} style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                {skill}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return cvData.education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: idx < cvData.education.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none' }}>
            <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '5px' }}>{edu.degree}</div>
            <div style={{ fontSize: '16px', marginBottom: '3px', opacity: 0.9 }}>{edu.institution}</div>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>{edu.year}</div>
          </div>
        ));
      
      case 'contact':
        const contactItems = [
          { icon: '📍', label: 'Location', value: cvData.contact.location, link: null },
          { icon: '📱', label: 'Phone', value: cvData.contact.phone, link: `tel:${cvData.contact.phone}` },
          { icon: '✉️', label: 'Email', value: cvData.contact.email, link: `mailto:${cvData.contact.email}` },
          { icon: '🔗', label: 'LinkedIn', value: cvData.contact.linkedin, link: `https://linkedin.com/in/${cvData.contact.linkedin}` }
        ];
        
        return (
          <div>
            {contactItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => item.link && window.open(item.link, '_blank')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px', 
                  marginBottom: '20px', 
                  padding: '15px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px',
                  cursor: item.link ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  if (item.link) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.link) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ fontSize: '28px' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '3px' }}>{item.label}</div>
                  <div style={{ fontSize: '16px' }}>{item.value}</div>
                </div>
                {item.link && <div style={{ fontSize: '20px', opacity: 0.5 }}>→</div>}
              </div>
            ))}
          </div>
        );
      
      case 'languages':
        return cvData.languages.map((lang, idx) => (
          <div key={idx} style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '16px' }}>
              <span>{lang.name}</span>
              <span style={{ opacity: 0.7 }}>{lang.level}</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${lang.percentage}%`, height: '100%', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))', borderRadius: '10px', transition: 'width 1s ease' }} />
            </div>
          </div>
        ));
      
      case 'interests':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
            {cvData.interests.map((interest, idx) => (
              <div key={idx} style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '15px' }}>
                {interest}
              </div>
            ))}
          </div>
        );
      
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <>
      <Particles />
      
      {/* Dynamic Wallpaper Layer */}
      <div 
        className="wallpaper-overlay" 
        style={{
          background: themes[currentTheme].wallpaper,
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      <div className="ios-home-screen">
        <div className="status-bar">
          <span>9:41</span>
          <span>📶 📶 📶 🔋</span>
        </div>

        <div className="app-grid-container">
          <div className="app-grid">
            {appIcons.map((app) => (
              <div key={app.id} className="app-icon" onClick={(e) => openApp(app, e)}>
                <div className="icon-container" style={{ background: app.gradient }}>
                  <SFIcon name={app.icon} size={48} color="white" />
                </div>
                <div className="app-name">{app.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dock">
          <div className="dock-icon" onClick={(e) => {
            const rect = e.currentTarget.querySelector('.dock-icon-inner').getBoundingClientRect();
            setStatsIconRect({
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height
            });
            setShowStats(true);
            setTimeout(() => setIsStatsAnimating(true), 10);
          }} title="Career Stats">
            <div className="dock-icon-inner" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <SFIcon name="circlebadge" size={36} color="white" />
            </div>
          </div>
          <div className="dock-icon" onClick={handleThemeChange} title="Change Theme">
            <div className="dock-icon-inner" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <SFIcon name="paintbrush" size={36} color="white" />
            </div>
          </div>
          <div className="dock-icon" onClick={() => window.open('https://github.com/YOUR_USERNAME', '_blank')} title="GitHub">
            <div className="dock-icon-inner" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
          </div>
          <div className="dock-icon" onClick={() => window.open('https://linkedin.com/in/onur-karsli', '_blank')} title="LinkedIn">
            <div className="dock-icon-inner" style={{ background: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </div>
          <div className="dock-icon" onClick={(e) => {
            // Close any open modals first
            if (selectedApp) {
              setIsAnimating(false);
              setTimeout(() => {
                setSelectedApp(null);
                setIconRect(null);
              }, 450);
            }
            if (showStats) {
              setIsStatsAnimating(false);
              setTimeout(() => {
                setShowStats(false);
                setStatsIconRect(null);
              }, 450);
            }
            
            const rect = e.currentTarget.querySelector('.dock-icon-inner').getBoundingClientRect();
            setFaceTimeIconRect({
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height
            });
            setShowFaceTime(true);
            setTimeout(() => setIsFaceTimeAnimating(true), 10);
          }} title="FaceTime">
            <div className="dock-icon-inner" style={{ background: 'linear-gradient(135deg, #00c853 0%, #64dd17 100%)' }}>
              <SFIcon name="camera" size={36} color="white" />
            </div>
          </div>
        </div>

        <div className="home-indicator" />
      </div>

      {/* App Detail Overlay */}
      {selectedApp && iconRect && (
        <div 
          className={`app-detail-overlay ${isAnimating ? 'show' : ''}`} 
          onClick={closeApp}
        >
          <div 
            className="app-detail-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              '--start-left': `${iconRect.left}px`,
              '--start-top': `${iconRect.top}px`,
              '--start-width': `${iconRect.width}px`,
              '--start-height': `${iconRect.height}px`
            }}
          >
            <div className="detail-header">
              <div className="detail-icon" style={{ background: selectedApp.gradient }}>
                <SFIcon name={selectedApp.icon} size={48} color="white" />
              </div>
              <div className="detail-title">{selectedApp.name}</div>
            </div>
            <div className="detail-body">
              {renderAppContent(selectedApp)}
            </div>
          </div>
        </div>
      )}

      <StatsOverlay 
        show={showStats} 
        iconRect={statsIconRect}
        isAnimating={isStatsAnimating}
        onClose={() => {
          setIsStatsAnimating(false);
          setTimeout(() => {
            setShowStats(false);
            setStatsIconRect(null);
          }, 450);
        }} 
      />

      <FaceTimeCall
        show={showFaceTime}
        iconRect={faceTimeIconRect}
        isAnimating={isFaceTimeAnimating}
        onClose={() => {
          setIsFaceTimeAnimating(false);
          setTimeout(() => {
            setShowFaceTime(false);
            setFaceTimeIconRect(null);
          }, 450);
        }}
      />

      <SpotlightSearch
        show={showSpotlight}
        onClose={() => setShowSpotlight(false)}
        cvData={cvData}
      />

      <SearchHint />
    </>
  );
}

export default App;
