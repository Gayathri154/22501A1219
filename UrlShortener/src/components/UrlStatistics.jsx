import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UrlStatistics.css";
import "../App.css";

const UrlStatistics = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [urls, setUrls] = useState(location.state?.urls || []);

  const handleClick = (index) => {
    const updated = [...urls];
    updated[index].clicks += 1;
    setUrls(updated);
  };

  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);

  return (
    <div className="stats-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Shortener
      </button>
      <h1 className="stats-title">🔗 URL Statistics</h1>

      <div className="summary-cards">
        <div className="card">🔗<br />{urls.length}<br /><span>Total URLs</span></div>
       
        <div className="card">⏰<br />{urls.length}<br /><span>Active URLs</span></div>
      </div>

      {urls.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No URLs generated yet.</p>
      ) : (
        urls.map((url, idx) => (
          <div className="url-box" key={idx}>
            <div className="url-header">
              <a
                href={url.original}
                className="shortcode"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(idx)}
              >
                {url.generatedUrl}
              </a>
              <div className="status">Active</div>
              <div className="clicks">{url.clicks} clicks</div>
            </div>
            <p><strong>Original URL:</strong></p>
            <input type="text" readOnly value={url.original} />
            <div className="datetime">
              <p>📅 Created: {new Date().toLocaleString()}</p>
              <p>🕒 Expires: in {url.duration || 30} minutes</p>
            </div>
            <p className="no-clicks">Click to test the short URL</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UrlStatistics;
