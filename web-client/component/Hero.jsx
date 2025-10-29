import React, { useState } from 'react';
import Header from './Header.jsx';
import Popup from './Popup.jsx';
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
      const response = await axios.post("https://shrinkerr.onrender.com/shorturls", {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header />
      
      <div className="px-6 py-16 mt-[50px] max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12 space-y-6">
          {/* <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-cyan-400 text-sm font-semibold">Fast & Reliable</span>
          </div> */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              URL Shortener
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Transform long URLs into short, shareable links with custom options
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-cyan-500/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <label htmlFor="url" className="flex items-center justify-between text-sm font-semibold text-slate-300">
                    <span>URL</span>
                    <span className="text-cyan-400">*</span>
                  </label>
                  <textarea 
                    id="url"
                    name="url" 
                    value={data.url} 
                    onChange={handleChange} 
                    rows={3}
                    placeholder="Enter your long URL here (e.g., https://example.com/very-long-url)"
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.url ? 'border-red-500/50' : 'border-slate-700/50'
                    } rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none`}
                  />
                  {errors.url && (
                    <span className="text-red-400 text-sm flex items-center gap-1">
                      <span>⚠️</span> {errors.url}
                    </span>
                  )}
                </div>

                {/* Optional Fields Row */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  {/* Validity Input */}
                  <div className="space-y-2">
                    <label htmlFor="validity" className="flex items-center justify-between text-sm font-semibold text-slate-300">
                      <span>Validity (minutes)</span>
                      <span className="text-slate-500 text-xs">Optional</span>
                    </label>
                    <input 
                      id="validity"
                      name="validity" 
                      value={data.validity} 
                      onChange={handleChange} 
                      type="number" 
                      placeholder="e.g., 60"
                      min="1"
                      className={`w-full px-4 py-3 bg-slate-900/50 border ${
                        errors.validity ? 'border-red-500/50' : 'border-slate-700/50'
                      } rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                    />
                    {errors.validity && (
                      <span className="text-red-400 text-sm flex items-center gap-1">
                        <span>⚠️</span> {errors.validity}
                      </span>
                    )}
                  </div>

                  {/* Shortcode Input */}
                  <div className="space-y-2">
                    <label htmlFor="shortcode" className="flex items-center justify-between text-sm font-semibold text-slate-300">
                      <span>Custom Short Code</span>
                      <span className="text-slate-500 text-xs">Optional</span>
                    </label>
                    <input 
                      id="shortcode"
                      name="shortcode" 
                      value={data.shortcode} 
                      onChange={handleChange} 
                      type="text" 
                      placeholder="e.g., mylink"
                      minLength="3"
                      className={`w-full px-4 py-3 bg-slate-900/50 border ${
                        errors.shortcode ? 'border-red-500/50' : 'border-slate-700/50'
                      } rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                    />
                    {errors.shortcode && (
                      <span className="text-red-400 text-sm flex items-center gap-1">
                        <span>⚠️</span> {errors.shortcode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={handleClear}
                    disabled={loading}
                    className="flex-1 px-8 py-3 border-2 border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Shortening...</span>
                      </>
                    ) : (
                      'Shorten URL'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { icon: '🔗', title: 'Easy to Use', description: 'Simply paste your URL and get a shortened link instantly' },
            { icon: '⏰', title: 'Custom Expiry', description: 'Set custom expiration times for your links' },
            { icon: '🎯', title: 'Custom Codes', description: 'Create memorable short codes for your links' }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showMessage && (
        <Popup onClose={handleClose}>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center">
              {shortened ? (
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ✅ Success!
                </span>
              ) : (
                <span className="text-red-400">❌ Error</span>
              )}
            </h3>
            <p className="text-slate-300 text-center text-lg">{content}</p>
            {shortened && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <label className="text-sm text-slate-400 mb-2 block">Short URL:</label>
                  <div className="flex items-center gap-2">
                    <a 
                      href={shortened.shortLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-cyan-400 hover:text-cyan-300 font-mono text-sm break-all transition-colors"
                    >
                      {shortened.shortLink}
                    </a>
                    <button 
                      onClick={() => navigator.clipboard.writeText(shortened.shortLink)}
                      className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all duration-300"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                </div>
                {shortened.expiry && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <label className="text-sm text-slate-400 mb-2 block">Expires:</label>
                    <span className="text-slate-300 font-mono text-sm">
                      {new Date(shortened.expiry).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}