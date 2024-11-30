import React, { useState } from "react";
import "../../css/ProjectsPage.css";
import ModalProjectsPage from "./ModalProjectsPage";

const projects = [
  {
    id: "c01f6da0-994b-4527-8800-f39632b148c0",
    name: "Постройка дома",
    startDate: "2020-03-04",
    plannedEndDate: "2025-02-02",
    endDate: null,
    projectPlans: [],
    progress: 75,
  },
  {
    id: "d81c6da0-994b-4527-8800-f39632b148c1",
    name: "Ремонт офиса",
    startDate: "2021-05-10",
    plannedEndDate: "2022-10-01",
    endDate: "2022-09-15",
    projectPlans: [],
    progress: 100,
  },
  {
    id: "d81c6da0-994b-4527-8800-f39632b148c2",
    name: "Реконструкция моей дачи",
    startDate: "2022-05-10",
    plannedEndDate: "2023-10-01",
    endDate: null,
    projectPlans: [],
    progress: 40,
  },
];

function ProjectsPage() {
  const [modalProjectsPageOpen, setModalProjectsPageOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClickProject = (project) => {
    setSelectedProject(project);
    setModalProjectsPageOpen(true);
  };

  const handleCloseModal = () => {
    setModalProjectsPageOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="projects-page-wrapper">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project__block"
          onClick={() => handleClickProject(project)}
        >
          <h2 className="project__block-title">{project.name}</h2>
          <p className="project__block-date">
            Начало проекта: {project.startDate}
          </p>
          <p className="project__block-date">
            Предполагаемый конец: {project.plannedEndDate}
          </p>
          <p className="project__block-date">
            Фактический конец: {project.endDate ? project.endDate : "Ещё не завершён"}
          </p>
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <p className="progress-bar__label pbl-left">0</p>
          <p className="progress-bar__label pbl-right">100%</p>
        </div>
      ))}
      {modalProjectsPageOpen && selectedProject && (
        <ModalProjectsPage
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default ProjectsPage;
