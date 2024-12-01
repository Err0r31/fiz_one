import React, { useState, useMemo } from "react";
import Table from "./Table";
import ResultSection from "./ResultSection";
import Input from "../shared/Input/Input";
import "./ProjectPlan.css";

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

function ProjectPlan({ plan = {}, onPlanChange }) {
  const [rowsData, setRowsData] = useState([
    {
      name: "",
      amount: 0,
      unitCost: 0,
      coefficient: 1,
      workCost: 0,
      laboriousness: 0,
    },
  ]);

  const addRow = () => {
    setRowsData([
      ...rowsData,
      {
        name: "",
        amount: 0,
        unitCost: 0,
        coefficient: 1,
        workCost: 0,
        laboriousness: 0,
      },
    ]);
  };

  const handelInputPlanChange = ( field, value) => { 
    if (plan) { 
      onPlanChange(plan.id, field, value);
    }
  }

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

  return (
    <div className="create-form__plan">
      <div className="create-form__plan-title-wrapper">
        <h3 className="create-form__plan-title">План {plan.id}</h3>
      </div>

      <div className="create-form__inputs">
        <Input
          label="Название плана"
          id={`plan-name-${plan.id}`}
          value={plan.planName || ""}
          onChange={(e) => handelInputPlanChange("planName", e.target.value)}
        />
        <Input
          label="Дата начала плана"
          id={`start-date-${plan.id}`}
          value={plan.startDate || ""}
          onChange={(e) => handelInputPlanChange("startDate", e.target.value)}
          type="date"
        />
        <Input
          label="Плановая дата окончания плана"
          id={`end-date-${plan.id}`}
          value={plan.plannedEndDate || ""}
          onChange={(e) => handelInputPlanChange("plannedEndDate", e.target.value)}
          type="date"
        />
        <Input
          label="Количество"
          id={`amount-${plan.id}`}
          type="number"
          value={plan.amount || ""}
          onChange={(e) => handelInputPlanChange("amount", e.target.value)}
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
