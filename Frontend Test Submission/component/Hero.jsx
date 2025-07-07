import React, { useState } from 'react';
import '../style/Hero.css';
import Header from './Header';
import Popup from './Popup';
import axios from 'axios';

export default function Hero() {
  const [data, setData] = useState({ url: "", validity: "", shortcode: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [content, setContent] = useState("Please try another URL");
  const [shortened, setShortened] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShowMessage(false);
    setShortened(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(data.url)) {
      newErrors.url = 'Please enter a valid URL (include http:// or https://)';
    }
    
    if (data.validity && (isNaN(data.validity) || parseInt(data.validity) <= 0)) {
      newErrors.validity = 'Validity must be a positive number';
    }
    
    if (data.shortcode && data.shortcode.length < 3) {
      newErrors.shortcode = 'Short code must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // const response = await axios.post("https://url-shortner-backend-chi.vercel.app/shorturls", {
      const response = await axios.post("http://localhost:5000/shorturls", {
        url: data.url,
        validity: data.validity ? parseInt(data.validity) : undefined,
        shortcode: data.shortcode || undefined
      });

      if (response.status === 201) {
        setShortened({
          shortLink: response.data.shortLink,
          expiry: response.data.expiry
        });
        setContent("Shortened URL Created Successfully!");
        // Reset form after success
        setData({ url: "", validity: "", shortcode: "" });
      } else {
        setContent("Unexpected response");
      }
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to shorten URL";
      setContent(msg);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleClear = () => {
    setData({ url: "", validity: "", shortcode: "" });
    setErrors({});
  };

  return (
    <>
      <Header />
      <div className='hero-main'>
        <div className='hero-background'></div>
        <div className='hero-container'>
          <div className='hero-content'>
            <div className='hero-header'>
              <h1 className='hero-title'>URL Shortener</h1>
              <p className='hero-subtitle'>Transform long URLs into short, shareable links with custom options</p>
            </div>

            <form className='hero-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label className='form-label' htmlFor='url'>
                  <span className='label-text'>URL</span>
                  <span className='label-required'>*</span>
                </label>
                <textarea 
                  id='url'
                  className={`form-textarea ${errors.url ? 'error' : ''}`}
                  name="url" 
                  value={data.url} 
                  onChange={handleChange} 
                  rows={3}
                  placeholder='Enter your long URL here (e.g., https://example.com/very-long-url)'
                />
                {errors.url && <span className='error-message'>{errors.url}</span>}
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label className='form-label' htmlFor='validity'>
                    <span className='label-text'>Validity (minutes)</span>
                    <span className='label-optional'>Optional</span>
                  </label>
                  <input 
                    id='validity'
                    className={`form-input ${errors.validity ? 'error' : ''}`}
                    name="validity" 
                    value={data.validity} 
                    onChange={handleChange} 
                    type='number' 
                    placeholder='e.g., 60'
                    min='1'
                  />
                  {errors.validity && <span className='error-message'>{errors.validity}</span>}
                </div>

                <div className='form-group'>
                  <label className='form-label' htmlFor='shortcode'>
                    <span className='label-text'>Custom Short Code</span>
                    <span className='label-optional'>Optional</span>
                  </label>
                  <input 
                    id='shortcode'
                    className={`form-input ${errors.shortcode ? 'error' : ''}`}
                    name='shortcode' 
                    value={data.shortcode} 
                    onChange={handleChange} 
                    type='text' 
                    placeholder='e.g., mylink'
                    minLength='3'
                  />
                  {errors.shortcode && <span className='error-message'>{errors.shortcode}</span>}
                </div>
              </div>

              <div className='form-actions'>
                <button 
                  type='button' 
                  className='btn btn-outline' 
                  onClick={handleClear}
                  disabled={loading}
                >
                  Clear
                </button>
                <button 
                  type='submit' 
                  className='btn btn-primary' 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className='loading-spinner'></span>
                      Shortening...
                    </>
                  ) : (
                    'Shorten URL'
                  )}
                </button>
              </div>
            </form>

            <div className='hero-features'>
              <div className='feature-item'>
                <div className='feature-icon'>🔗</div>
                <h3>Easy to Use</h3>
                <p>Simply paste your URL and get a shortened link instantly</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>⏰</div>
                <h3>Custom Expiry</h3>
                <p>Set custom expiration times for your links</p>
              </div>
              <div className='feature-item'>
                <div className='feature-icon'>🎯</div>
                <h3>Custom Codes</h3>
                <p>Create memorable short codes for your links</p>
              </div>
            </div>
          </div>
        </div>

        {showMessage && (
          <Popup onClose={handleClose}>
            <div className='popup-content'>
              <h3 className='popup-title'>
                {shortened ? '✅ Success!' : '❌ Error'}
              </h3>
              <p className='popup-message'>{content}</p>
              {shortened && (
                <div className='popup-result'>
                  <div className='result-item'>
                    <label>Short URL:</label>
                    <div className='url-container'>
                      <a 
                        href={shortened.shortLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='short-link'
                      >
                        {shortened.shortLink}
                      </a>
                      <button 
                        className='copy-btn'
                        onClick={() => navigator.clipboard.writeText(shortened.shortLink)}
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  {shortened.expiry && (
                    <div className='result-item'>
                      <label>Expires:</label>
                      <span className='expiry-time'>{new Date(shortened.expiry).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Popup>
        )}
      </div>
    </>
  );
}