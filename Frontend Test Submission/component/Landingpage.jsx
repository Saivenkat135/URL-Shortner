import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../style/Landingpage.css';
import axios from 'axios';

export default function Landingpage() {
  const [myurls, setMyUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/links/getall");
        setMyUrls(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
        setError("Failed to load URLs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleClick = () => {
    window.location.href = '/hero';
  };

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDeleteUrl = async (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`http://localhost:5000/links/${id}`);
        setMyUrls(myurls.filter(url => url.id !== id));
      } catch (error) {
        console.error("Failed to delete URL:", error);
      }
    }
  };

  const getStatusColor = (expiry) => {
    if (!expiry) return 'active';
    const now = new Date();
    const expiryDate = new Date(expiry);
    const timeDiff = expiryDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (timeDiff <= 0) return 'expired';
    if (hoursDiff <= 24) return 'expiring';
    return 'active';
  };

  const filteredUrls = myurls.filter(url => {
    const matchesSearch = url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.shortcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && getStatusColor(url.expiry) === 'active';
    if (filter === 'expired') return matchesSearch && getStatusColor(url.expiry) === 'expired';
    if (filter === 'expiring') return matchesSearch && getStatusColor(url.expiry) === 'expiring';
    
    return matchesSearch;
  });

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    switch (sortBy) {
      case 'clicks':
        return b.clickCount - a.clickCount;
      case 'expiry':
        return new Date(a.expiry) - new Date(b.expiry);
      case 'created':
      default:
        return new Date(b.createdAt || b.created) - new Date(a.createdAt || a.created);
    }
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className='land-main'>
          <div className='land-background'></div>
          <div className='land-container'>
            <div className='loading-container'>
              <div className='loading-spinner-large'></div>
              <p className='loading-text'>Loading your URLs...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='land-main'>
        <div className='land-background'></div>
        <div className='land-container'>
          <div className='land-header'>
            <h1 className='land-title'>My Shortened URLs</h1>
            <p className='land-subtitle'>Manage and track all your shortened links</p>
          </div>

          <div className='land-controls'>
            <div className='search-container'>
              <input
                type='text'
                placeholder='Search URLs or shortcodes...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
              />
              <span className='search-icon'>🔍</span>
            </div>

            <div className='filter-container'>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className='filter-select'
              >
                <option value='created'>Sort by Created</option>
                <option value='clicks'>Sort by Clicks</option>
                <option value='expiry'>Sort by Expiry</option>
              </select>

              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className='filter-select'
              >
                <option value='all'>All URLs</option>
                <option value='active'>Active</option>
                <option value='expiring'>Expiring Soon</option>
                <option value='expired'>Expired</option>
              </select>
            </div>
          </div>

          <div className='land-stats'>
            <div className='stat-card'>
              <div className='stat-icon'>📊</div>
              <div className='stat-info'>
                <h3>{myurls.length}</h3>
                <p>Total URLs</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon'>👆</div>
              <div className='stat-info'>
                <h3>{myurls.reduce((sum, url) => sum + url.clickCount, 0)}</h3>
                <p>Total Clicks</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon'>✅</div>
              <div className='stat-info'>
                <h3>{myurls.filter(url => getStatusColor(url.expiry) === 'active').length}</h3>
                <p>Active URLs</p>
              </div>
            </div>
          </div>

          {error && (
            <div className='error-message'>
              <span className='error-icon'>⚠️</span>
              {error}
            </div>
          )}

          <div className='land-content'>
            {sortedUrls.length === 0 ? (
              <div className='empty-state'>
                <div className='empty-icon'>🔗</div>
                <h3>No URLs found</h3>
                <p>
                  {searchTerm || filter !== 'all' 
                    ? 'No URLs match your search criteria.' 
                    : 'You haven\'t created any shortened URLs yet.'}
                </p>
                <button className='btn btn-primary' onClick={handleClick}>
                  Create Your First URL
                </button>
              </div>
            ) : (
              <div className='url-grid'>
                {sortedUrls.map((item, index) => (
                  <div className={`url-card ${getStatusColor(item.expiry)}`} key={index}>
                    <div className='url-header'>
                      <div className={`status-badge ${getStatusColor(item.expiry)}`}>
                        {getStatusColor(item.expiry) === 'active' && '✅ Active'}
                        {getStatusColor(item.expiry) === 'expiring' && '⏰ Expiring Soon'}
                        {getStatusColor(item.expiry) === 'expired' && '❌ Expired'}
                      </div>
                      <div className='url-actions'>
                        <button 
                          className='action-btn copy-btn'
                          onClick={() => handleCopyUrl(`${window.location.origin}/${item.shortcode}`)}
                          title='Copy URL'
                        >
                          📋
                        </button>
                        <button 
                          className='action-btn delete-btn'
                          onClick={() => handleDeleteUrl(item.id)}
                          title='Delete URL'
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className='url-info'>
                      <div className='info-row'>
                        <label>Original URL:</label>
                        <a 
                          href={item.originalUrl} 
                          target='_blank' 
                          rel='noopener noreferrer'
                          className='original-url'
                        >
                          {item.originalUrl.length > 50 
                            ? `${item.originalUrl.substring(0, 50)}...` 
                            : item.originalUrl}
                        </a>
                      </div>

                      <div className='info-row'>
                        <label>Short URL:</label>
                        <div className='short-url-container'>
                          <a 
                            href={`${window.location.origin}/${item.shortcode}`}
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='short-url'
                          >
                            {window.location.origin}/{item.shortcode}
                          </a>
                        </div>
                      </div>

                      <div className='info-row'>
                        <label>Expiry:</label>
                        <span className='expiry-date'>
                          {item.expiry ? new Date(item.expiry).toLocaleString() : 'Never'}
                        </span>
                      </div>

                      <div className='info-row'>
                        <label>Clicks:</label>
                        <span className='click-count'>{item.clickCount}</span>
                      </div>
                    </div>

                    <div className='url-footer'>
                      <small className='created-date'>
                        Created: {new Date(item.createdAt || item.created || Date.now()).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='land-actions'>
            <button className='btn btn-primary btn-large' onClick={handleClick}>
              <span className='btn-icon'>➕</span>
              Create New Short URL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}