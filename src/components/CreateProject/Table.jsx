import React from "react";
import RowInput from "./RowInput";

function Table({ rowsData, handleInputChange }) {
  return (
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
        {rowsData.map((row, index) => (
          <tr key={index}>
            <td><span>{index + 1}</span></td>
            <RowInput value={row.name} index={index} field="name" onChange={handleInputChange} />
            <RowInput value={row.amount} index={index} field="amount" onChange={handleInputChange} />
            <RowInput value={row.unitCost} index={index} field="unitCost" onChange={handleInputChange} />
            <RowInput value={row.coefficient} index={index} field="coefficient" onChange={handleInputChange} />
            <RowInput value={row.workCost} index={index} field="workCost" onChange={handleInputChange} />
            <RowInput value={row.laboriousness} index={index} field="laboriousness" onChange={handleInputChange} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;