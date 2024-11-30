import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Layout from "./components/layout/Layout";
import CreateProject from "./components/CreateProject/CreateProject";

function App() {
  return (
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
          <Route path="create-project/" element={
            <Layout PageTitle="Просмотр проектов">
              <CreateProject />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
