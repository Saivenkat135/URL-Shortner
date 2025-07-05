import React, { useEffect } from 'react';
import '../style/Popup.css';

const Popup = ({ children, onClose, title, showCloseButton = true }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleBackdropClick}>
      <div className="popup-container">
        <div className="popup-header">
          {title && <h2 className="popup-title">{title}</h2>}
          {showCloseButton && (
            <button 
              className="popup-close-btn" 
              onClick={onClose}
              aria-label="Close popup"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <div className="popup-content">
          {children}
        </div>
        <div className="popup-footer">
          <button className="popup-action-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;