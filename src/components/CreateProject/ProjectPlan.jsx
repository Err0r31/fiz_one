import React, { useState, useMemo } from "react";
import Table from "./Table";
import ResultSection from "./ResultSection";
import Input from "../shared/Input/Input"; 
import "./ProjectPlan.css";

const calculateCost = (rowsData, amountField, coefficientField, unitCostField, laboriousnessField, workCostField) => {
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
        materialCostWithoutCoefficient: total.materialCostWithoutCoefficient + materialCost,
        materialCostWithCoefficient: total.materialCostWithCoefficient + materialCostWithCoefficient,
        workCostWithoutCoefficient: total.workCostWithoutCoefficient + workCostWithoutCoefficient,
        workCostWithCoefficient: total.workCostWithCoefficient + workCostWithCoefficient,
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
    { name: "", amount: 0, unitCost: 0, coefficient: 1, workCost: 0, laboriousness: 0 },
  ]);
  const [planName, setPlanName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState(0);

  const addRow = () => {
    setRowsData([
      ...rowsData,
      { name: "", amount: 0, unitCost: 0, coefficient: 1, workCost: 0, laboriousness: 0 },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setRowsData((prevRowsData) => {
      const updatedRowsData = [...prevRowsData];
      if (field === "name") {
        updatedRowsData[index][field] = value;
      } else {
        updatedRowsData[index][field] = parseFloat(value) || 0;
      }
      return updatedRowsData;
    });
  };

  const { materialCostWithoutCoefficient, materialCostWithCoefficient, workCostWithoutCoefficient, workCostWithCoefficient, totalLaboriousness } = useMemo(
    () => calculateCost(rowsData, "amount", "coefficient", "unitCost", "laboriousness", "workCost"),
    [rowsData]
  );

  const totalCostWithoutCoefficient = materialCostWithoutCoefficient + workCostWithoutCoefficient;
  const totalCostWithCoefficient = materialCostWithCoefficient + workCostWithCoefficient;

  return (
    <div className="create-form__plan">
      <div className="create-form__plan-title-wrapper">
        <h3 className="create-form__plan-title">План {planId}</h3>
      </div>

      <div className="create-form__inputs">
        <Input
          label="Название плана"
          id={`plan-name-${planId}`}
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <Input
          label="Дата начала плана"
          id={`start-date-${planId}`}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          label="Плановая дата окончания плана"
          id={`end-date-${planId}`}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Input
          label="Количество"
          id={`amount-${planId}`}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Table rowsData={rowsData} handleInputChange={handleInputChange} />

      <div className="create-form__result-wrapper">
        <ResultSection
          title="Итоги по себестоимости (без коэффициента)"
          materialCost={materialCostWithoutCoefficient}
          workCost={workCostWithoutCoefficient}
          totalCost={totalCostWithoutCoefficient}
        />
        <ResultSection
          title="Итоги по себестоимости (с коэффициентом)"
          materialCost={materialCostWithCoefficient}
          workCost={workCostWithCoefficient}
          totalCost={totalCostWithCoefficient}
        />
        <div className="create-form__price">
          <p className="create-form__result">
            Суммарная трудоемкость: <span>{totalLaboriousness}</span>
          </p>
        </div>
      </div>

      <div className="create-form__plan-actions">
        <button type="button" className="create-form__button" onClick={addRow}>
          Добавить строку
        </button>
      </div>
    </div>
  );
}

export default ProjectPlan;
