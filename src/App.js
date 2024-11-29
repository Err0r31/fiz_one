import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Layout from "./components/layout/Layout";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
