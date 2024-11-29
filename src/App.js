import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import AnimatedRoute from "./AnimatedRoute";
import "./css/style.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<AnimatedRoute><ProjectsPage /></AnimatedRoute>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
