import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortener from "./components/UrlShortner";
import UrlStatistics from "./components/UrlStatistics";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/statistics" element={<UrlStatistics />} />
      </Routes>
    </Router>
  );
}

export default App;
