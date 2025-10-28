import React from 'react';
import './Header.css';

const Header = ({ onThemeChange, onShake, onShowStats }) => {
  return (
    <div className="header">
      <div className="theme-switcher" onClick={onThemeChange} title="Change theme">
        🎨
      </div>
      <div className="shake-hint" onClick={onShake}>
        📱 Shake to reorder
      </div>
      <div className="profile-photo" onClick={onShowStats} title="Click for stats"></div>
      <div className="name">Onur Karsli</div>
      <div className="title">Senior Full-Stack Engineer</div>
    </div>
  );
};

export default Header;

