import React, { useState, useEffect } from 'react';
import './SearchHint.css';

const SearchHint = ({ onDismiss }) => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('hasSeenSearchHint');
    
    if (!hasSeenHint) {
      // Show hint after 3 seconds
      const timer = setTimeout(() => {
        setShow(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setDismissed(true);
    }

    // Hidden shortcut to reset hint: Shift + H
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'H') {
        localStorage.removeItem('hasSeenSearchHint');
        console.log('Search hint reset! Refresh the page to see it again.');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('hasSeenSearchHint', 'true');
    if (onDismiss) onDismiss();
  };

  const handleTryIt = () => {
    handleDismiss();
    // Trigger the search
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  if (dismissed || !show) return null;

  return (
    <div className={`search-hint-overlay ${show ? 'show' : ''}`}>
      <div className="search-hint-card">
        <div className="hint-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        
        <div className="hint-title">Quick Search Available</div>
        
        <div className="hint-description">
          Search through my entire CV instantly!
        </div>

        <div className="hint-methods">
          <div className="hint-method">
            <div className="method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <div className="method-text">
              <div className="method-title">Pull Down</div>
              <div className="method-desc">Drag down anywhere on screen</div>
            </div>
          </div>

          <div className="hint-method">
            <div className="method-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M6 8h.01M10 8h.01M14 8h.01"/>
              </svg>
            </div>
            <div className="method-text">
              <div className="method-title">Keyboard</div>
              <div className="method-desc">
                <span className="key-combo">⌘K</span> or <span className="key-combo">Ctrl+K</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hint-actions">
          <button className="hint-button secondary" onClick={handleDismiss}>
            Got it
          </button>
          <button className="hint-button primary" onClick={handleTryIt}>
            Try it now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHint;

