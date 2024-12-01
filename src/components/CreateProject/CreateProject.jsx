import React, { useState } from "react";
import Input from "../shared/Input/Input";
import ProjectPlan from "./ProjectPlan";
import Groups from "./Groups";
import "./CreateProject.css";

function CreateProject() {
  const [plans, setPlans] = useState([{ id: 1, rowCount: 1 }]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedPlans, setSelectedPlans] = useState({});
  const [groups, setGroups] = useState([]);

  const addPlan = () => {
    const newPlanId = plans.length + 1;
    setPlans([...plans, { id: newPlanId, rowCount: 1 }]);
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
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
