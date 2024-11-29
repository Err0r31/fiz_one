import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Layout from "./components/layout/Layout";
import AnimatedRoute from "./AnimatedRoute";
import "./css/style.css";

function App() {
  return (
    <div className="container">
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Layout PageTitle="Просмотр проектов">
                <ProjectsPage />
              </Layout>
            }
          />
            <Route path="/" element={<AnimatedRoute><ProjectsPage /></AnimatedRoute>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
