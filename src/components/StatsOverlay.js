import React from 'react';
import './StatsOverlay.css';

const StatsOverlay = ({ show, iconRect, isAnimating, onClose }) => {
  if (!show || !iconRect) return null;

  return (
    <div className={`stats-overlay ${isAnimating ? 'show' : ''}`} onClick={onClose}>
      <div 
        className="stats-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          '--start-left': `${iconRect.left}px`,
          '--start-top': `${iconRect.top}px`,
          '--start-width': `${iconRect.width}px`,
          '--start-height': `${iconRect.height}px`
        }}
      >
        <div className="stats-title">📊 Career Stats</div>
        <div className="stat-item">
          <span className="stat-label">Years of Experience</span>
          <span className="stat-value">15+</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Companies Worked</span>
          <span className="stat-value">7</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Team Size Managed</span>
          <span className="stat-value">8</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Apps Built</span>
          <span className="stat-value">20+</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Technologies Mastered</span>
          <span className="stat-value">12+</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverlay;
