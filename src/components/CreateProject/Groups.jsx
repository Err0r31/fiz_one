import React, { useState } from "react";
import Input from "../shared/Input/Input";
import "./Groups.css";

function Groups({
  plans,
  selectedPlans,
  onGroupNameChange,
  onPlanCheckboxChange,
  onPlanNumberChange,
  onSaveGroup,
  groups,
  onSaveSubgroup,
}) {
  const [groupName, setGroupName] = useState("");
  const [subgroupName, setSubgroupName] = useState(""); 
  const [selectedGroup, setSelectedGroup] = useState(""); 
  const [subgroupPlans, setSubgroupPlans] = useState({});
  const [subgroups, setSubgroups] = useState([]); 

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    onGroupNameChange(e.target.value);
  };

  const handleSaveGroup = () => {
    onSaveGroup({ name: groupName, plans: selectedPlans });
    setGroupName(""); 
  };

  const handleGroupSelectChange = (e) => {
    setSelectedGroup(e.target.value);
    setSubgroupPlans({}); 
  };

  const handleSubgroupNameChange = (e) => {
    setSubgroupName(e.target.value);
  };

  const handleSubgroupPlanCheckboxChange = (planId) => {
    setSubgroupPlans((prevPlans) => ({
      ...prevPlans,
      [planId]: {
        ...prevPlans[planId],
        selected: !prevPlans[planId]?.selected,
      },
    }));
  };

  const handleSubgroupPlanNumberChange = (planId, value) => {
    setSubgroupPlans((prevPlans) => ({
      ...prevPlans,
      [planId]: {
        ...prevPlans[planId],
        value: value,
      },
    }));
  };

  const handleSaveSubgroup = () => {
    const newSubgroup = {
      name: subgroupName,
      parentGroup: selectedGroup, 
      plans: subgroupPlans,
    };

    onSaveSubgroup(newSubgroup);

    setSubgroups([...subgroups, newSubgroup]);
    setSubgroupName(""); 
    setSubgroupPlans({}); 
  };

  const getPlansForGroup = (groupName) => {
    const group = groups.find((g) => g.name === groupName);
    if (group) {
      return group.plans;
    } else {
      const subgroup = subgroups.find((sg) => sg.name === groupName);
      return subgroup ? subgroup.plans : {};
    }
  };

  return (
    <div className="create-form__content">
      <div className="create-form__section">
        <h3 className="create-form__subtitle">Создание группы</h3>
        <div className="create-form__inputs">
          <Input
            label="Название группы"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className="create-form__checkboxes">
          <h4 className="create-form__text">Выберите планы:</h4>
          <div className="create-form__plans">
            {plans.map((plan) => (
              <div key={plan.id} className="create-form__plan-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPlans[plan.id]?.selected || false}
                    onChange={() => onPlanCheckboxChange(plan.id)}
                  />
                  План {plan.id}
                </label>
                {selectedPlans[plan.id]?.selected && (
                  <Input
                    type="number"
                    value={selectedPlans[plan.id]?.value || 0}
                    onChange={(e) =>
                      onPlanNumberChange(plan.id, e.target.value)
                    }
                    placeholder="Введите число"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="create-form__button"
          onClick={handleSaveGroup}
        >
          Сохранить группу
        </button>
      </div>

      <div className="create-form__subgroup create-form__section">
        <h3 className="create-form__subtitle">Создание подгруппы</h3>
        <div className="create-form__select-wrapper">
          <label className="create-form__text">Выберите группу:</label>
          <select
            value={selectedGroup}
            onChange={handleGroupSelectChange}
            className="create-form__select"
          >
            <option value="">-- Выберите группу --</option>
            {groups.map((group, index) => (
              <option key={index} value={group.name}>
                {group.name}
              </option>
            ))}
            {subgroups.map((subgroup, index) => (
              <option key={index} value={subgroup.name}>
                {subgroup.name} (подгруппа)
              </option>
            ))}
          </select>
        </div>

        {selectedGroup && (
          <>
            <div className="create-form__inputs">
              <Input
                label="Название подгруппы"
                id="subgroupName"
                name="subgroupName"
                value={subgroupName}
                onChange={handleSubgroupNameChange}
              />
            </div>

            <div className="create-form__checkboxes">
              <h4 className="create-form__text">Планы для подгруппы:</h4>
              <div className="create-form__plans">
                {getPlansForGroup(selectedGroup) ? (
                  Object.keys(getPlansForGroup(selectedGroup)).map((planId) => {
                    const plan = getPlansForGroup(selectedGroup)[planId];
                    return (
                      <div key={planId} className="create-form__plan-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            checked={subgroupPlans[planId]?.selected || false}
                            onChange={() =>
                              handleSubgroupPlanCheckboxChange(planId)
                            }
                          />
                          План {planId}
                        </label>
                        {subgroupPlans[planId]?.selected && (
                          <Input
                            type="number"
                            value={subgroupPlans[planId]?.value || 0}
                            onChange={(e) =>
                              handleSubgroupPlanNumberChange(
                                planId,
                                e.target.value
                              )
                            }
                            placeholder="Введите число"
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>В выбранной группе нет доступных планов.</p>
                )}
              </div>
            </div>

            <button
              type="button"
              className="create-form__button"
              onClick={handleSaveSubgroup}
            >
              Сохранить подгруппу
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Groups;
