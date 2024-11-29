import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import './css/style.css';
function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
        <Routes>
            <Route path="/" element={<ProjectsPage />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
