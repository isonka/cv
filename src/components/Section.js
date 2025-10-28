import React from 'react';
import './Section.css';

const Section = ({ title, icon, children, isShaking }) => {
  return (
    <div className={`section ${isShaking ? 'shaking' : ''}`}>
      <div className="section-title">
        <span className="section-icon">{icon}</span>
        {title}
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default Section;

