import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const UrlShortner = () => {
  const navigate = useNavigate();

  const [urls, setUrls] = useState([
    { original: "", duration: "", custom: "", generatedUrl: "" },
    { original: "", duration: "", custom: "", generatedUrl: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleGenerate = (index) => {
    const { custom, original } = urls[index];
    if (!original || !custom) {
      alert("Please enter both Original URL and Custom Shortcode");
      return;
    }

    const shortUrl = `${window.location.origin}/${custom}`;
    const updated = [...urls];
    updated[index] = {
  ...updated[index],
  generatedUrl: shortUrl,
  clicks: 0, // 🔽 Add this line
};
    setUrls(updated);
  };

  const handleViewStatistics = () => {
    const generated = urls.filter((url) => url.generatedUrl);
    navigate("/statistics", { state: { urls: generated } });
  };

  return (
    <div className="url-shortener-container">
      <h1 className="title">🔗 URL Shortener</h1>
      <p className="subtitle">Transform your long URLs into short, manageable links</p>
      <button className="stats-btn" onClick={handleViewStatistics}>📊 View Statistics</button>

      <div className="form-section">
        <h2 className="form-heading">Shorten Your URLs</h2>

        {urls.map((entry, index) => (
          <div className="url-form" key={index}>
            <label>Original URL {index + 1}</label>
            <div className="input-row">
              <input
                type="text"
                placeholder="https://example.com"
                value={entry.original}
                onChange={(e) => handleChange(index, "original", e.target.value)}
              />
              <input
                type="number"
                placeholder="30"
                min="1"
                value={entry.duration}
                onChange={(e) => handleChange(index, "duration", e.target.value)}
              />
            </div>

            <label>Custom Shortcode (optional)</label>
            <input
              type="text"
              placeholder="mylink123"
              value={entry.custom}
              onChange={(e) => handleChange(index, "custom", e.target.value)}
            />

            <button className="stats-btn" onClick={() => handleGenerate(index)}>🔗 Generate</button>

            {entry.generatedUrl && (
              <p>
                Short URL:{" "}
                <a href={entry.original} target="_blank" rel="noopener noreferrer">
                  {entry.generatedUrl}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlShortner;
