import React, { useState } from "react";
import Input from "../shared/Input/Input";
import ProjectPlan from "./ProjectPlan";
import "./CreateProject.css";

function CreateProject() {
  const [plans, setPlans] = useState([{ id: 1, rowCount: 1 }]);

  const addPlan = () => {
    const newPlanId = plans.length + 1;
    setPlans([...plans, { id: newPlanId, rowCount: 1 }]);
  };

  return (
    <div className="create-project">
      <div className="create-project__wrapper">
        <form className="create-form">
          <div className="create-form__content">
              <div className="create-form__inputs">
                <Input label="Название проекта" id="name" name="name" />
                <Input
                  label="Дата начала проекта"
                  id="startDate"
                  name="startDate"
                />
                <Input
                  label="Плановая дата окончания проекта"
                  id="plannedEndDate"
                  name="plannedEndDate"
                />
              </div>
              {plans.map((plan) => (
                <ProjectPlan key={plan.id} planId={plan.id} />
              ))}
          </div>

          <div className="create-form__buttons">
            <button
              type="button"
              className="create-form__button"
              onClick={addPlan}
            >
              Добавить план
            </button>
            <div className="create-form__buttons-right">
                <button type="button" className="create-form__button">
                  Скачать шаблон
                </button>
                <button type="button" className="create-form__button">
                  Загрузить по шаблону
                </button>
                <button type="submit" className="create-form__button">
                  Создать
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
