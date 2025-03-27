import React from "react";
import "./App.css";
import initialData from "./assets/dummy/table-data.json";
import useTableSelection from "./hooks/use-table-selection";

interface TableRow {
  id: number;
  name: string;
  age: number;
}

function App() {
  const { data, isSelected, handleCheckboxClick, handleRowClick } =
    useTableSelection<TableRow>(initialData);

  return (
    <div className="App">
      <h1>테이블 선택 예제</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>선택</th>
              <th>이름</th>
              <th>나이</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(index)}
                className={isSelected(row.id) ? "selected" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(row.id)}
                    onChange={() => {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckboxClick(
                        index,
                        e.nativeEvent as unknown as React.MouseEvent
                      );
                    }}
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
