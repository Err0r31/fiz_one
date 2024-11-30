import React, { useState } from "react";
import "./ProjectPlan.css";
import Input from "../shared/Input/Input";

function ProjectPlan({ planId }) {
  const [rowCount, setRowCount] = useState(1); // Начальное количество строк - 1

  const addRow = () => {
    setRowCount(rowCount + 1); // Добавляем строку
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 2; i <= rowCount; i++) {
      // Начинаем с 2, так как первая строка уже есть
      rows.push(
        <tr key={i}>
          <td>
            <span id={`planMaterialId${planId}${i}`}>{i}</span>
          </td>
          <td>
            <input
              type="text"
              className="create-form__input"
              id={`planItemName${planId}${i}`}
              name={`planItemName${planId}${i}`}
              placeholder="Введите наименование"
            />
          </td>
          <td>
            <input
              type="number"
              className="create-form__input"
              id={`planMaterialAmount${planId}${i}`}
              name={`planMaterialAmount${planId}${i}`}
              placeholder="Введите количество"
            />
          </td>
          <td>
            <input
              type="number"
              className="create-form__input"
              id={`planMaterialAmountCost${planId}${i}`}
              name={`planMaterialAmountCost${planId}${i}`}
              placeholder="Цена за единицу"
            />
          </td>
          <td>
            <input
              type="text"
              className="create-form__input"
              id={`planMaterialCoefficient${planId}${i}`}
              name={`planMaterialCoefficient${planId}${i}`}
              placeholder="Введите коэффициент"
            />
          </td>
          <td>
            <input
              type="number"
              className="create-form__input"
              id={`planWorkCost${planId}${i}`}
              name={`planWorkCost${planId}${i}`}
              placeholder="Цена за единицу работы"
            />
          </td>
          <td>
            {/* Новый столбец для трудоемкости единичной */}
            <input
              type="number"
              className="create-form__input"
              id={`planLaboriousness${planId}${i}`}
              name={`planLaboriousness${planId}${i}`}
              placeholder="Трудоемкость"
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
      <div className="create-form__main-inputs">
        <Input
          label="Название плана"
          id={`planName${planId}`}
          name={`planName${planId}`}
        />
        <Input
          label="Дата начала плана"
          id={`planStartDate${planId}`}
          name={`planStartDate${planId}`}
        />
        <Input
          label="Плановая дата окончания плана"
          id={`planPlannedEndDate${planId}`}
          name={`planPlannedEndDate${planId}`}
        />
      </div>
      <table className="create-form__table">
        <thead>
          <tr>
            <th>Материалы (себестоимость)</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена за единицу</th>
            <th>Коэффициент</th>
            <th>Цена за единицу работы</th>
            <th>Трудоемкость единичная</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span id={`planMaterialNumber${planId}1`}>1</span>
            </td>
            <td>
              <input
                type="text"
                className="create-form__input"
                id={`planMaterialName${planId}1`}
                name={`planMaterialName${planId}1`}
                placeholder="Введите наименование"
              />
            </td>
            <td>
              <input
                type="number"
                className="create-form__input"
                id={`planMaterialAmount${planId}1`}
                name={`planMaterialAmount${planId}1`}
                placeholder="Введите количество"
              />
            </td>
            <td>
              <input
                type="number"
                className="create-form__input"
                id={`planMaterialAmountCost${planId}1`}
                name={`planMaterialAmountCost${planId}1`}
                placeholder="Цена за единицу"
              />
            </td>
            <td>
              <input
                className="create-form__input"
                type="text"
                id={`planMaterialCoefficient${planId}1`}
                name={`planMaterialCoefficient${planId}1`}
                placeholder="Введите коэффициент"
              />
            </td>
            <td>
              <input
                className="create-form__input"
                type="number"
                id={`planWorkCost${planId}1`}
                name={`planWorkCost${planId}1`}
                placeholder="Цена за единицу"
              />
            </td>
            <td>
              <input
                className="create-form__input"
                type="number"
                id={`planLaboriousness${planId}1`}
                name={`planLaboriousness${planId}1`}
                placeholder="Трудоемкость"
              />
            </td>
          </tr>
          {renderRows()}
        </tbody>
      </table>
      <div className="create-form__result-wrapper">
        <div className="create-form__price">
          <h4 className="create-form__subtitle">Итоги по себестоимости</h4>
          <div className="create-form__results">
            <p className="create-form__result">
              Итоговая цена по материалам:
              <span id={`MaterialResultCostPrice${planId}`}></span>
            </p>
            <p className="create-form__result">
              Итоговая цена по работе:
              <span id={`WorkResultCostPrice${planId}`}></span>
            </p>
            <p className="create-form__result">
              Итоговая цена:
              <span id={`ResultCostPrice${planId}`}></span>
            </p>
          </div>
        </div>
        <div className="create-form__price">
          <h4 className="create-form__subtitle">
            Итоги по финальной стоимости
          </h4>
          <div className="create-form__results">
            <p className="create-form__result">
              Итоговая цена по материалам:
              <span id={`MaterialResultPrice${planId}`}></span>
            </p>
            <p className="create-form__result">
              Итоговая цена по работе:
              <span id={`WorkResultPrice${planId}`}></span>
            </p>
            <p className="create-form__result">
              Итоговая цена:
              <span id={`ResultPrice${planId}`}></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPlan;
