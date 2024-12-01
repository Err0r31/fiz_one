import React from "react";

function ResultSection({ title, materialCost, workCost, totalCost }) {
  return (
    <div className="create-form__price">
      <h4 className="create-form__subtitle">{title}</h4>
      <div className="create-form__results">
        <p className="create-form__result">
          Итоговая цена по материалам: <span>{materialCost}</span>
        </p>
        <p className="create-form__result">
          Итоговая цена по работе: <span>{workCost}</span>
        </p>
        <p className="create-form__result">
          Итоговая цена: <span>{totalCost}</span>
        </p>
      </div>
    </div>
  );
}

export default ResultSection;
