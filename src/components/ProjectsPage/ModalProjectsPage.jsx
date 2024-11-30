import React from 'react';
import '../../css/ModalProjectsPage.css';

function ModalProjectsPage({ project, onClose }) {
  return (
    <div className="modal-projects-page">
      <div className="modal-projects-page__overlay" onClick={onClose}></div>
      <div className="modal-projects-page__content">
        <h2 className="modal-projects-page__title">{project.name}</h2>
        <p className="modal-projects-page__info">
          Начало проекта: {project.startDate}
        </p>
        <p className="modal-projects-page__info">
          Предполагаемый конец: {project.plannedEndDate}
        </p>
        <p className="modal-projects-page__info">
          Фактический конец: {project.endDate ? project.endDate : "Ещё не завершён"}
        </p>
        <button className="modal-projects-page__button">Редактировать</button>
        <button className="modal-projects-page__button modal-projects-page__button--close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ModalProjectsPage;
