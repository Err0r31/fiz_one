import React from "react";

function RowInput({ value, index, field, onChange }) {
  return (
    <td>
      <input
        type={field === "name" ? "text" : "number"}
        className="create-form__input"
        value={value}
        placeholder={`Введите ${field}`}
        onChange={(e) => onChange(index, field, e.target.value)}
      />
    </td>
  );
}

export default RowInput;