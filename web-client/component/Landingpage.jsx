import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'
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
        const response = await axios.get("https://shrinkerr.onrender.com/links/getall");
        // const response = await axios.get("http://localhost:5000/links/getall");
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
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDeleteUrl = async (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`https://shrinkerr.onrender.com/links/${id}`);
        // await axios.delete(`http://localhost:5000/links/${id}`);
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#0f1e3a] pt-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center py-16 bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-white/70">Loading your URLs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#0f1e3a] pt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 188, 212, 0.3) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0, 229, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 25px 25px'
        }}></div>
      </div>

    <div className="max-w mx-auto ml-[10px] mr-[10px] mt-[20px] relative z-10">


        {/* Header */}
        <Header/>
        <div className="text-center mb-12 bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-cyan-500/30">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            My Shortened URLs
          </h1>
          <p className="text-xl text-white/80">Manage and track all your shortened links</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div className="relative flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search URLs or shortcodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-[#162544]/60 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          <div className="flex gap-4">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-[#162544]/60 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl text-white cursor-pointer focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all"
            >
              <option value="created">Sort by Created</option>
              <option value="clicks">Sort by Clicks</option>
              <option value="expiry">Sort by Expiry</option>
            </select>

            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-[#162544]/60 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl text-white cursor-pointer focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all"
            >
              <option value="all">All URLs</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4 shadow-xl border border-cyan-500/30 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
            <div className="text-4xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-3 rounded-xl">📊</div>
            <div>
              <h3 className="text-3xl font-bold text-white">{myurls.length}</h3>
              <p className="text-white/70">Total URLs</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4 shadow-xl border border-cyan-500/30 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
            <div className="text-4xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-3 rounded-xl">👆</div>
            <div>
              <h3 className="text-3xl font-bold text-white">{myurls.reduce((sum, url) => sum + url.clickCount, 0)}</h3>
              <p className="text-white/70">Total Clicks</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4 shadow-xl border border-cyan-500/30 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
            <div className="text-4xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-3 rounded-xl">✅</div>
            <div>
              <h3 className="text-3xl font-bold text-white">{myurls.filter(url => getStatusColor(url.expiry) === 'active').length}</h3>
              <p className="text-white/70">Active URLs</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-8 flex items-center gap-2 backdrop-blur-lg">
            <span className="text-xl">⚠️</span>
            {error}
          </div>
        )}

        {/* Content */}
        <div className="mb-12">
          {sortedUrls.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30">
              <div className="text-6xl mb-4 opacity-50">🔗</div>
              <h3 className="text-2xl font-bold text-white mb-2">No URLs found</h3>
              <p className="text-white/70 mb-8">
                {searchTerm || filter !== 'all' 
                  ? 'No URLs match your search criteria.' 
                  : 'You haven\'t created any shortened URLs yet.'}
              </p>
              <button 
                onClick={handleClick}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
              >
                Create Your First URL
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedUrls.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-cyan-500/30 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all relative overflow-hidden"
                >
                  {/* Status Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    getStatusColor(item.expiry) === 'active' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    getStatusColor(item.expiry) === 'expiring' ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                    'bg-gradient-to-r from-red-400 to-red-600'
                  }`}></div>

                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      getStatusColor(item.expiry) === 'active' ? 'bg-green-500/20 text-green-400' :
                      getStatusColor(item.expiry) === 'expiring' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {getStatusColor(item.expiry) === 'active' && '✅ Active'}
                      {getStatusColor(item.expiry) === 'expiring' && '⏰ Expiring Soon'}
                      {getStatusColor(item.expiry) === 'expired' && '❌ Expired'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleCopyUrl(`${window.location.origin}/${item.shortcode}`)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all text-xl"
                        title="Copy URL"
                      >
                        📋
                      </button>
                      <button 
                        onClick={() => handleDeleteUrl(item.id)}
                        className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all text-xl"
                        title="Delete URL"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* URL Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-white">Original URL:</label>
                      <a 
                        href={item.originalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                      >
                        {item.originalUrl.length > 50 
                          ? `${item.originalUrl.substring(0, 50)}...` 
                          : item.originalUrl}
                      </a>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-white">Short URL:</label>
                      <div className="bg-black/20 px-3 py-2 rounded-lg border border-cyan-500/20">
                        <a 
                          href={`${window.location.origin}/${item.shortcode}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                        >
                          {window.location.origin}/{item.shortcode}
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-white">Expiry:</label>
                      <span className="text-white/70 font-mono text-sm">
                        {item.expiry ? new Date(item.expiry).toLocaleString() : 'Never'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-white">Clicks:</label>
                      <span className="text-white/70 font-mono text-sm">{item.clickCount}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-3 mt-4">
                    <small className="text-white/50 text-xs">
                      Created: {new Date(item.createdAt || item.created || Date.now()).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="text-center py-8 bg-gradient-to-br from-[#162544]/80 to-[#1a2d52]/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30">
          <button 
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-xl hover:from-cyan-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
          >
            <span className="text-xl">➕</span>
            Create New Short URL
          </button>
        </div>
      </div>
    </div>
  );
}