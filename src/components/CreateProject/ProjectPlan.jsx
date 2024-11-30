import React, { useState } from "react";
import "./ProjectPlan.css";

function ProjectPlan({ planId }) {
  const [rowCount, setRowCount] = useState(1);

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 1; i <= rowCount; i++) {
      rows.push(
        <tr key={i}>
          <td>
            <input
              className="create-form__input"
              type="text"
              id={`planItemName${planId}${i}`}
              name={`planItemName${planId}${i}`}
              placeholder="Введите название"
            />
          </td>
          <td>
            <input
              className="create-form__input"
              type="text"
              id={`planItemValue${planId}${i}`}
              name={`planItemValue${planId}${i}`}
              placeholder="Введите описание"
            />
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="create-form__plan">
      <div className="create-form__plan-title-wrapper">
          <h3 className="create-form__plan-title">План {planId}</h3>
          <button type="button" className="create-form__button" onClick={addRow}>
            Добавить строку
          </button>
      </div>
      <table className="create-form__table">
        <thead>
          <tr>
            <th>Название плана</th>
            <th>
              <input
                className="create-form__input"
                type="text"
                id={`planName${planId}`}
                name={`planName${planId}`}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Дата начала плана</td>
            <td>
              <input
                className="create-form__input"
                type="text"
                id={`planStartDate${planId}`}
                name={`planStartDate${planId}`}
              />
            </td>
          </tr>
          <tr>
            <td>Плановая дата окончания плана</td>
            <td>
              <input
                className="create-form__input"
                type="text"
                id={`planPlannedEndDate${planId}`}
                name={`planPlannedEndDate${planId}`}
              />
            </td>
          </tr>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectPlan;
