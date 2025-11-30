// frontend/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // 👇 THIS IS THE IMPORTANT CHANGE
  // We now talk to the Cloud Backend, not Localhost
  const BACKEND_URL = 'https://global-url-shortener.onrender.com';

  const handleShorten = async () => {
    if (!longUrl) return alert("Please enter a URL!");
    setLoading(true);
    try {
      // connecting to the cloud...
      const response = await axios.post(`${BACKEND_URL}/api/shorten`, {
        originalUrl: longUrl
      });
      setShortUrl(`${BACKEND_URL}/${response.data.shortId}`);
    } catch (error) {
      console.error(error);
      alert("Backend is waking up! Wait 30s and try again.");
    }
    setLoading(false);
  };

  const handleClear = () => {
    setLongUrl('');
    setShortUrl('');
    setCopySuccess('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess('Copied! ✅');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="app-background">
      <div className="glass-container">
        <h1>✨ Global Shortener</h1>
        <p className="subtitle">Shorten your links. Expand your reach.</p>
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="Paste your long link here..." 
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          {longUrl && (
            <button className="clear-btn" onClick={handleClear}>✖</button>
          )}
        </div>
        <button 
          className="main-btn" 
          onClick={handleShorten} 
          disabled={loading || !longUrl}
        >
          {loading ? "✨ Shortening..." : "Shorten Now"}
        </button>
        {shortUrl && (
          <div className="result-card">
            <p>Here is your short link:</p>
            <div className="link-box">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
              <button className="copy-btn" onClick={handleCopy}>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;