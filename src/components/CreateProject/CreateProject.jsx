import React, { useState } from "react";
import Input from "../shared/Input/Input";
import ProjectPlan from "./ProjectPlan";
import Groups from "./Groups";
import "./CreateProject.css";

function CreateProject() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      rowCount: 1,
      planName: "",
      startDate: "",
      plannedEndDate: "",
      amount: 0,
    },
  ]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedPlans, setSelectedPlans] = useState({});
  const [groups, setGroups] = useState([]);

  // !Данные для формы
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [plannedEndDate, setPlannedEndDate] = useState("");

  const handlePlanChange = (planId, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  const collectProjectData = () => {
    const projectData = {
      name: projectName,
      startDate: startDate,
      plannedEndDate: plannedEndDate,
      endDate: plannedEndDate,
      projectsPlan: plans.map((plan) => ({
        name: plan.planName,
        quantity: plan.amount,
        startDate: plan.startDate,
        plannedEndDate: plan.plannedEndDate,
        endDate: plan.plannedEndDate,
        resources: plan.rowsData.map((row) => ({
          unitTypeId: row.unitTypeId || "",
          name: row.name || "",
          quantity: row.amount || 0,
          surcharge: row.coefficient || 1,
          costPricePerUnitMaterial: row.unitCost || 0,
          costPricePerUnitWork: row.workCost || 0,
          laborPerUnit: row.laboriousness || 0,
        })),
      })),
    };
    return projectData;
  };

  const handleSubmit = async () => {
    const projectData = collectProjectData();

    try {
      const response = await fetch("http://localhost:5119/CreateProject", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();
      console.log("Ответ от сервера:", result);

      if (response.ok) {
        alert("Проект успешно создан!");
      } else {
        alert("Произошла ошибка при создании проекта :(");
        console.error(
          "Произошла ошибка при создании проекта :(",
          response.json()
        );
      }
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
      alert("Произошла ошибка при отправке данных.");
    }
  };

  const addPlan = () => {
    const newPlanId = plans.length + 1;
    setPlans([
      ...plans,
      {
        id: newPlanId,
        rowCount: 1,
        planName: "",
        startDate: "",
        plannedEndDate: "",
        amount: 0,
        rowsData: [],
      },
    ]);
  };

  const handleGroupNameChange = (name) => {
    setGroupName(name);
  };

  const handleSaveGroup = (groupData) => {
    const newGroup = {
      ...groupData,
      plans: groupData.plans || [],
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setSelectedPlans({});
  };

  const handleSaveSubgroup = (subgroupData) => {
    console.log("Подгруппа сохранена:", subgroupData);
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) => {
        if (group.name === subgroupData.groupName) {
          return {
            ...group,
            subgroups: [...(group.subgroups || []), subgroupData],
          };
        }
        return group;
      });
      return updatedGroups;
    });
  };

  const handlePlanCheckboxChange = (planId) => {
    setSelectedPlans((prevSelectedPlans) => ({
      ...prevSelectedPlans,
      [planId]: {
        selected: !prevSelectedPlans[planId]?.selected,
        value: prevSelectedPlans[planId]?.value || 0,
      },
    }));
  };

  const handlePlanNumberChange = (planId, value) => {
    setSelectedPlans((prevSelectedPlans) => ({
      ...prevSelectedPlans,
      [planId]: {
        ...prevSelectedPlans[planId],
        value: parseFloat(value) || 0,
      },
    }));
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
  };

  return (
    <div className="create-project">
      <div className="create-project__wrapper">
        <form className="create-form">
          <div className="create-form__content">
            {!isNextClicked ? (
              <>
                <div className="create-form__inputs">
                  <Input
                    label="Название проекта"
                    id="name"
                    name="name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <Input
                    label="Дата начала проекта"
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Input
                    label="Плановая дата окончания проекта"
                    type="date"
                    id="plannedEndDate"
                    name="plannedEndDate"
                    value={plannedEndDate}
                    onChange={(e) => setPlannedEndDate(e.target.value)}
                  />
                </div>

                {plans.map((plan) => (
                  <ProjectPlan
                    key={plan.id}
                    plan={plan}
                    onPlanChange={handlePlanChange}
                  />
                ))}
              </>
            ) : (
              <Groups
                plans={plans}
                selectedPlans={selectedPlans}
                onGroupNameChange={handleGroupNameChange}
                onPlanCheckboxChange={handlePlanCheckboxChange}
                onPlanNumberChange={handlePlanNumberChange}
                onSaveGroup={handleSaveGroup}
                groups={groups}
                onSaveSubgroup={handleSaveSubgroup}
                onSubgroupChange={() => {}}
              />
            )}
          </div>

          {!isNextClicked ? (
            <div className="create-form__buttons">
              <button
                type="button"
                className="create-form__button"
                onClick={addPlan}
              >
                Добавить план
              </button>

              <div className="create-form__buttons-right">
                <button
                  type="button"
                  className="create-form__button"
                  onClick={handleNextClick}
                >
                  Далее
                </button>
              </div>
            </div>
          ) : (
            <div className="create-form__buttons">
              <div className="create-form__buttons-right">
                <button
                  type="button"
                  className="create-form__button"
                  onClick={handleSubmit}
                >
                  Создать
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
