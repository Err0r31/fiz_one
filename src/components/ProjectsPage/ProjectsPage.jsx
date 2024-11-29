import React from 'react';
import '../../css/ProjectsPage.css';

const projects = [
  {
    id: "c01f6da0-994b-4527-8800-f39632b148c0",
    name: "Постройка дома",
    startDate: "2020-03-04",
    plannedEndDate: "2025-02-02",
    endDate: null,
    projectPlans: [
    ],
  },
  {
    id: "d81c6da0-994b-4527-8800-f39632b148c1",
    name: "Ремонт офиса",
    startDate: "2021-05-10",
    plannedEndDate: "2022-10-01",
    endDate: "2022-09-15",
    projectPlans: [
    ],
  },
];

function ProjectsPage() {
  return (
    <div className="projects-page-wrapper">
      {projects.map((project) => (
        <div key={project.id} className="project__block">
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
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
