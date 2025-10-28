import React, { useState, useEffect } from 'react';
import './SpotlightSearch.css';

const SpotlightSearch = ({ show, onClose, cvData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search in experience
    cvData.experience.forEach(exp => {
      const matchScore = {
        title: exp.title.toLowerCase().includes(query),
        company: exp.company.toLowerCase().includes(query),
        description: Array.isArray(exp.description) 
          ? exp.description.some(desc => desc.toLowerCase().includes(query))
          : exp.description.toLowerCase().includes(query),
        highlights: exp.highlights?.some(h => h.toLowerCase().includes(query))
      };

      if (Object.values(matchScore).some(v => v)) {
        const matchingDesc = Array.isArray(exp.description)
          ? exp.description.find(desc => desc.toLowerCase().includes(query)) || exp.description[0]
          : exp.description;
        
        results.push({
          type: 'Experience',
          icon: 'briefcase',
          title: exp.title,
          subtitle: `${exp.company} • ${exp.period}`,
          content: matchingDesc,
          matchType: matchScore.title ? 'title' : matchScore.company ? 'company' : 'content'
        });
      }
    });

    // Search in skills
    if (cvData.skills) {
      Object.entries(cvData.skills).forEach(([category, skillsList]) => {
        if (category?.toLowerCase().includes(query)) {
          results.push({
            type: 'Skills',
            icon: 'gear',
            title: category,
            subtitle: 'Skill Category',
            content: Array.isArray(skillsList) ? skillsList.join(', ') : '',
            matchType: 'category'
          });
        } else if (Array.isArray(skillsList)) {
          skillsList.forEach(skill => {
            if (skill?.toLowerCase().includes(query)) {
              results.push({
                type: 'Skills',
                icon: 'gear',
                title: skill,
                subtitle: category,
                content: `Expert in ${skill}`,
                matchType: 'skill'
              });
            }
          });
        }
      });
    }

    // Search in education
    cvData.education?.forEach(edu => {
      const degreeMatch = edu.degree?.toLowerCase().includes(query);
      const schoolMatch = edu.school?.toLowerCase().includes(query);
      const fieldMatch = edu.field?.toLowerCase().includes(query);
      
      if (degreeMatch || schoolMatch || fieldMatch) {
        results.push({
          type: 'Education',
          icon: 'graduationcap',
          title: edu.degree || 'Education',
          subtitle: `${edu.school || 'School'} • ${edu.period || ''}`,
          content: edu.field || '',
          matchType: 'education'
        });
      }
    });

    // Search in languages
    cvData.languages?.forEach(lang => {
      if (
        lang.language?.toLowerCase().includes(query) ||
        lang.level?.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Languages',
          icon: 'globe',
          title: lang.language || 'Language',
          subtitle: 'Language',
          content: `${lang.level || 'Unknown'} proficiency`,
          matchType: 'language'
        });
      }
    });

    // Search in interests
    cvData.interests?.forEach(interest => {
      if (interest?.toLowerCase().includes(query)) {
        results.push({
          type: 'Interests',
          icon: 'music',
          title: interest,
          subtitle: 'Personal Interest',
          content: `Passionate about ${interest}`,
          matchType: 'interest'
        });
      }
    });

    // Search in contact
    if (cvData.contact) {
      Object.entries(cvData.contact).forEach(([key, value]) => {
        if (
          key?.toLowerCase().includes(query) ||
          value?.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'Contact',
            icon: 'person',
            title: key.charAt(0).toUpperCase() + key.slice(1),
            subtitle: 'Contact Information',
            content: value,
            matchType: 'contact'
          });
        }
      });
    }

    setSearchResults(results.slice(0, 10)); // Limit to top 10 results
  }, [searchQuery, cvData]);

  const getIconSVG = (iconName) => {
    const icons = {
      briefcase: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        </svg>
      ),
      gear: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      ),
      graduationcap: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
          <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/>
        </svg>
      ),
      globe: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      music: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      ),
      person: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="7" r="4"/>
          <path d="M5.5 21c0-3.5 2.5-6 6.5-6s6.5 2.5 6.5 6"/>
        </svg>
      )
    };
    return icons[iconName] || icons.person;
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="highlight">{part}</span> : 
        part
    );
  };

  if (!show) return null;

  return (
    <div className={`spotlight-search ${show ? 'show' : ''}`}>
      <div className="spotlight-container">
        <div className="search-bar">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search CV..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button className="clear-button" onClick={() => setSearchQuery('')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" opacity="0.3"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="search-result-item">
                  <div className="result-icon">
                    {getIconSVG(result.icon)}
                  </div>
                  <div className="result-content">
                    <div className="result-title">
                      {highlightText(result.title, searchQuery)}
                    </div>
                    <div className="result-subtitle">{result.subtitle}</div>
                    <div className="result-description">
                      {highlightText(result.content, searchQuery)}
                    </div>
                  </div>
                  <div className="result-type">{result.type}</div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <div className="no-results-text">No results found</div>
                <div className="no-results-subtext">Try a different search term</div>
              </div>
            )}
          </div>
        )}

        <div className="search-hint">
          <span>Try searching for: </span>
          <button className="hint-chip" onClick={() => setSearchQuery('React')}>React</button>
          <button className="hint-chip" onClick={() => setSearchQuery('Nike')}>Nike</button>
          <button className="hint-chip" onClick={() => setSearchQuery('Mobile')}>Mobile</button>
          <button className="hint-chip" onClick={() => setSearchQuery('TypeScript')}>TypeScript</button>
        </div>
      </div>

      <div className="spotlight-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default SpotlightSearch;

