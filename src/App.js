import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Layout from "./components/layout/Layout";
import CreateProject from "./components/CreateProject/CreateProject";
import AnimatedRoute from "./AnimatedRoute";
import "./css/style.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout PageTitle="Просмотр проектов"><AnimatedRoute><ProjectsPage /></AnimatedRoute></Layout>} />
            <Route path="/create-project" element={<Layout PageTitle="Создание проекта"><AnimatedRoute><CreateProject /></AnimatedRoute></Layout>} />
          </Routes>
        </div>
        </div>

    </Router>
  );
}

export default App;
