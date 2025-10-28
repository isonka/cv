import React from 'react';

// SF Symbol-style icons as React components
const SFIcon = ({ name, size = 24, color = 'white' }) => {
  const icons = {
    person: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    briefcase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="11" rx="2" stroke={color} strokeWidth="1.5"/>
        <path d="M8 8V7a2 2 0 012-2h4a2 2 0 012 2v1M3 13h18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gear: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    graduationcap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 9l10-5 10 5-10 5-10-5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 11v6c0 1.5 2.5 3 6 3s6-1.5 6-3v-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 9v7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    message: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="10" r="1" fill={color}/>
        <circle cx="12" cy="10" r="1" fill={color}/>
        <circle cx="15" cy="10" r="1" fill={color}/>
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    music: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5"/>
        <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="1.5"/>
        <path d="M9 18V6l12-3v13M9 9l12-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    paintbrush: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2v7m0 0l3-3m-3 3l-3-3M3 13a9 9 0 0018 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="19" r="2" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    circlebadge: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill={color}/>
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="13" r="3" stroke={color} strokeWidth="1.5"/>
        <path d="M7 6V5a2 2 0 012-2h6a2 2 0 012 2v1" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[name] || icons.gear;
};

export default SFIcon;

