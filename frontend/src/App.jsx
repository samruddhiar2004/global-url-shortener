// frontend/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // Logic to Shorten URL
  const handleShorten = async () => {
    if (!longUrl) return alert("Please enter a URL!");
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl: longUrl
      });
      setShortUrl(`http://localhost:5000/${response.data.shortId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to shorten URL. Is the backend running?");
    }
    
    setLoading(false);
  };

  // Logic to Clear
  const handleClear = () => {
    setLongUrl('');
    setShortUrl('');
    setCopySuccess('');
  };

  // Logic to Copy
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

        {/* INPUT SECTION */}
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

        {/* RESULT SECTION */}
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