import React from "react";
import "../../css/ModalProjectsPage.css";

function ModalProjectsPage({ project, onClose }) {
  return (
    <div className="modal-projects-page">
      <div className="modal-projects-page__overlay" onClick={onClose}></div>
      <div className="modal-projects-page__content">
        <h2 className="modal-projects-page__title">{project.name || "Без названия"}</h2>
        <p className="modal-projects-page__info">
          <strong>Начало проекта:</strong> {project.startDate || "Не указано"}
        </p>
        <p className="modal-projects-page__info">
          <strong>Предполагаемый конец:</strong>{" "}
          {project.plannedEndDate || "Не указано"}
        </p>
        <p className="modal-projects-page__info">
          <strong>Фактический конец:</strong>{" "}
          {project.endDate ? project.endDate : "Ещё не завершён"}
        </p>

        <h3 className="modal-projects-page__subtitle">Планы:</h3>
        {project.projectPlans && project.projectPlans.length > 0 ? (
          project.projectPlans.map((plan, index) => (
            <div key={index} className="modal-projects-page__plan">
              <h4>{plan.name || `План ${index + 1}`}</h4>
              <p>
                <strong>Начало:</strong> {plan.startDate || "Не указано"}
              </p>
              <p>
                <strong>Планируемый конец:</strong>{" "}
                {plan.plannedEndDate || "Не указано"}
              </p>
              <p>
                <strong>Итоговая себестоимость (материалы):</strong>{" "}
                {plan.totalCostPriceMaterial || 0}
              </p>
              <p>
                <strong>Итоговая себестоимость (работы):</strong>{" "}
                {plan.totalCostPriceWork || 0}
              </p>
              <p>
                <strong>Итоговая себестоимость:</strong>{" "}
                {plan.totalCostPrice || 0}
              </p>
              <p>
                <strong>Суммарная трудоемкость:</strong> {plan.totalLabor || 0}
              </p>
            </div>
          ))
        ) : (
          <p>Планы отсутствуют</p>
        )}

        <h3 className="modal-projects-page__subtitle">Ресурсы:</h3>
        {project.resorces && project.resorces.length > 0 ? (
          <table className="modal-projects-page__table">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена за единицу (материалы)</th>
                <th>Цена за единицу (работы)</th>
                <th>Итоговая стоимость</th>
                <th>Трудоемкость</th>
              </tr>
            </thead>
            <tbody>
              {project.resorces.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.name || "Не указано"}</td>
                  <td>{resource.quantity || 0}</td>
                  <td>{resource.costPricePerUnitMaterial || 0}</td>
                  <td>{resource.costPricePerUnitWork || 0}</td>
                  <td>{resource.totalCostPrice || 0}</td>
                  <td>{resource.laborPerUnit || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Ресурсы отсутствуют</p>
        )}

        <button
          className="modal-projects-page__button"
          onClick={() => console.log("Редактирование плана")}
        >
          Редактировать
        </button>
        <button
          className="modal-projects-page__button modal-projects-page__button--close"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ModalProjectsPage;
