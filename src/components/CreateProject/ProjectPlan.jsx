import React, { useState, useMemo } from "react";
import "./ProjectPlan.css";
import Input from "../shared/Input/Input";

const calculateCost = (
  rowsData,
  amountField,
  coefficientField,
  unitCostField,
  laboriousnessField,
  workCostField
) => {
  return rowsData.reduce(
    (total, row) => {
      const amount = row[amountField];
      const unitCost = row[unitCostField];
      const coefficient = row[coefficientField] || 1;
      const workCost = row[workCostField];

      const materialCost = amount * unitCost;
      const materialCostWithCoefficient = materialCost * coefficient;

      const workCostWithoutCoefficient = amount * workCost;
      const workCostWithCoefficient = workCostWithoutCoefficient * coefficient;

      const laboriousness = amount * row[laboriousnessField];

      return {
        materialCostWithoutCoefficient:
          total.materialCostWithoutCoefficient + materialCost,
        materialCostWithCoefficient:
          total.materialCostWithCoefficient + materialCostWithCoefficient,
        workCostWithoutCoefficient:
          total.workCostWithoutCoefficient + workCostWithoutCoefficient,
        workCostWithCoefficient:
          total.workCostWithCoefficient + workCostWithCoefficient,
        totalLaboriousness: total.totalLaboriousness + laboriousness,
      };
    },
    {
      materialCostWithoutCoefficient: 0,
      materialCostWithCoefficient: 0,
      workCostWithoutCoefficient: 0,
      workCostWithCoefficient: 0,
      totalLaboriousness: 0,
    }
  );
};

function ProjectPlan({ planId }) {
  const [rowsData, setRowsData] = useState([
    { amount: 0, unitCost: 0, coefficient: 1, workCost: 0, laboriousness: 0 },
  ]);

  const addRow = () => {
    setRowsData([
      ...rowsData,
      { amount: 0, unitCost: 0, coefficient: 1, workCost: 0, laboriousness: 0 },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setRowsData((prevRowsData) => {
      const updatedRowsData = [...prevRowsData];
      updatedRowsData[index][field] = parseFloat(value) || 0;
      return updatedRowsData;
    });
  };

  const {
    materialCostWithoutCoefficient,
    materialCostWithCoefficient,
    workCostWithoutCoefficient,
    workCostWithCoefficient,
    totalLaboriousness,
  } = useMemo(
    () =>
      calculateCost(
        rowsData,
        "amount",
        "coefficient",
        "unitCost",
        "laboriousness",
        "workCost"
      ),
    [rowsData]
  );

  const totalCostWithoutCoefficient =
    materialCostWithoutCoefficient + workCostWithoutCoefficient;
  const totalCostWithCoefficient =
    materialCostWithCoefficient + workCostWithCoefficient;

  const renderRowInput = (value, index, field) => (
    <input
      type={field === "name" ? "text" : "number"}
      className="create-form__input"
      value={value}
      placeholder={`Введите ${field}`}
      onChange={(e) => handleInputChange(index, field, e.target.value)}
    />
  );

  const renderRows = () => {
    return rowsData.map((row, index) => (
      <tr key={index}>
        <td>
          <span>{index + 1}</span>
        </td>
        <td>{renderRowInput(row.name, index, "name")}</td>
        <td>{renderRowInput(row.amount, index, "amount")}</td>
        <td>{renderRowInput(row.unitCost, index, "unitCost")}</td>
        <td>{renderRowInput(row.coefficient, index, "coefficient")}</td>
        <td>{renderRowInput(row.workCost, index, "workCost")}</td>
        <td>{renderRowInput(row.laboriousness, index, "laboriousness")}</td>
      </tr>
    ));
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
        <tbody>{renderRows()}</tbody>
      </table>
      <div className="create-form__result-wrapper">
        <div className="create-form__price">
          <h4 className="create-form__subtitle">
            Итоги по себестоимости (без коэффициента)
          </h4>
          <div className="create-form__results">
            <p className="create-form__result">
              Итоговая цена по материалам:{" "}
              <span>{materialCostWithoutCoefficient}</span>
            </p>
            <p className="create-form__result">
              Итоговая цена по работе: <span>{workCostWithoutCoefficient}</span>
            </p>
            <p className="create-form__result">
              Итоговая цена: <span>{totalCostWithoutCoefficient}</span>
            </p>
          </div>
        </div>
        <div className="create-form__price">
          <h4 className="create-form__subtitle">
            Итоги по себестоимости (с коэффициентом)
          </h4>
          <div className="create-form__results">
            <p className="create-form__result">
              Итоговая цена по материалам:{" "}
              <span>{materialCostWithCoefficient}</span>
            </p>
            <p className="create-form__result">
              Итоговая цена по работе: <span>{workCostWithCoefficient}</span>
            </p>
            <p className="create-form__result">
              Итоговая цена: <span>{totalCostWithCoefficient}</span>
            </p>
          </div>
        </div>
        <div className="create-form__price">
          <p className="create-form__result">
            Суммарная трудоемкость: <span>{totalLaboriousness}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectPlan;
