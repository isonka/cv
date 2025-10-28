import React, { useEffect, useRef, useState } from 'react';
import './FaceTimeCall.css';

const FaceTimeCall = ({ show, iconRect, isAnimating, onClose }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [showCallPrompt, setShowCallPrompt] = useState(false);

  useEffect(() => {
    if (show && isAnimating) {
      // Reset states when opening
      setShowCallPrompt(false);
      setCameraError(false);
      
      // Request camera permission
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          // Show call prompt after 5 seconds
          setTimeout(() => {
            if (show) { // Only show if still open
              setShowCallPrompt(true);
            }
          }, 5000);
        })
        .catch((err) => {
          console.log('Camera access denied:', err);
          setCameraError(true);
          // Still show prompt even without camera, after 3 seconds
          setTimeout(() => {
            if (show) {
              setShowCallPrompt(true);
            }
          }, 3000);
        });
    }

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setShowCallPrompt(false);
    };
  }, [show, isAnimating]);

  const handleCall = () => {
    // Open phone dialer
    window.location.href = 'tel:+31612345678'; // Replace with your actual number
  };

  if (!show || !iconRect) return null;

  return (
    <div className={`facetime-overlay ${isAnimating ? 'show' : ''}`} onClick={onClose}>
      <div 
        className="facetime-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          '--start-left': `${iconRect.left}px`,
          '--start-top': `${iconRect.top}px`,
          '--start-width': `${iconRect.width}px`,
          '--start-height': `${iconRect.height}px`
        }}
      >
        {/* Video Container */}
        <div className="facetime-video">
          {/* User's camera feed */}
          {!cameraError && (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="facetime-user-video"
            />
          )}
          
          {/* Fallback background if no camera */}
          {cameraError && (
            <div className="camera-fallback">
              <div className="fallback-icon">📹</div>
              <div className="fallback-text">Camera not available</div>
            </div>
          )}
          
          {/* Picture-in-picture: Onur's image */}
          <div className="facetime-pip">
            <img src="/onur.jpeg" alt="Onur Karsli" className="facetime-pip-image" />
            <div className="pip-name">Onur</div>
          </div>

          {/* Status bar overlay */}
          <div className="facetime-status-bar">
            <div className="status-left">
              <div className="status-time">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="status-center">
              <div className="connection-indicator">
                <div className="signal-dot"></div>
                <span>FaceTime</span>
              </div>
            </div>
            <div className="status-right">
              <div className="battery-indicator">
                <div className="battery-level"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call Prompt */}
        {showCallPrompt && (
          <div className="call-prompt">
            <div className="prompt-message">
              <div className="prompt-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="prompt-text">
                Let's have a real conversation! <br/>
                <span className="prompt-subtext">
                  (Coffee chats are way better than CV browsing 😄)
                </span>
              </div>
            </div>
            <div className="prompt-buttons">
              <button className="prompt-button call-button" onClick={handleCall}>
                Yes, call Onur!
              </button>
              <button className="prompt-button cancel-button" onClick={onClose}>
                Maybe later...
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="facetime-controls">
          <div className="control-button mute">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            </svg>
          </div>
          <div className="control-button end" onClick={onClose}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="rotate(135 12 12)"/>
            </svg>
          </div>
          <div className="control-button video">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceTimeCall;

