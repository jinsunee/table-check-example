import React, { useState, useRef, MouseEvent } from "react";
import "./App.css";

interface TableRow {
  id: number;
  name: string;
  age: number;
}

const initialData: TableRow[] = [
  { id: 1, name: "김철수", age: 25 },
  { id: 2, name: "이영희", age: 30 },
  { id: 3, name: "박민수", age: 28 },
  { id: 4, name: "최지우", age: 35 },
  { id: 5, name: "정유진", age: 27 },
  { id: 6, name: "이서연", age: 29 },
  { id: 7, name: "박준호", age: 32 },
  { id: 8, name: "김지민", age: 26 },
  { id: 9, name: "최현우", age: 31 },
  { id: 10, name: "정다은", age: 28 },
  { id: 11, name: "이준영", age: 33 },
  { id: 12, name: "박서윤", age: 24 },
  { id: 13, name: "김민준", age: 29 },
  { id: 14, name: "최예진", age: 27 },
  { id: 15, name: "정승민", age: 34 },
  { id: 16, name: "이하은", age: 26 },
  { id: 17, name: "박지호", age: 30 },
  { id: 18, name: "김서연", age: 28 },
  { id: 19, name: "최준호", age: 32 },
  { id: 20, name: "정지민", age: 25 },
  { id: 21, name: "이현우", age: 31 },
  { id: 22, name: "박다은", age: 29 },
  { id: 23, name: "김준영", age: 33 },
  { id: 24, name: "최서윤", age: 24 },
  { id: 25, name: "정민준", age: 28 },
  { id: 26, name: "이예진", age: 27 },
  { id: 27, name: "박승민", age: 34 },
  { id: 28, name: "김하은", age: 26 },
  { id: 29, name: "최지호", age: 30 },
  { id: 30, name: "정서연", age: 28 },
  { id: 31, name: "이준호", age: 32 },
  { id: 32, name: "박지민", age: 25 },
  { id: 33, name: "김현우", age: 31 },
  { id: 34, name: "최다은", age: 29 },
  { id: 35, name: "정준영", age: 33 },
  { id: 36, name: "이서윤", age: 24 },
  { id: 37, name: "박민준", age: 28 },
  { id: 38, name: "김예진", age: 27 },
  { id: 39, name: "최승민", age: 34 },
  { id: 40, name: "정하은", age: 26 },
];

function App() {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const lastInteractedIndex = useRef<number | null>(null);

  const handleCheckboxClick = (index: number, event: React.MouseEvent) => {
    const newSelectedRows = new Set(selectedRows);
    const rowId = data[index].id;

    if (event.shiftKey && lastInteractedIndex.current !== null) {
      // Shift 키를 누른 상태로 클릭한 경우
      const start = Math.min(lastInteractedIndex.current, index);
      const end = Math.max(lastInteractedIndex.current, index);

      // 현재 클릭한 항목이 선택 상태인지 확인
      const isCurrentlySelected = selectedRows.has(rowId);

      // 범위 내의 모든 항목을 현재 클릭한 항목의 상태와 동일하게 설정
      for (let i = start; i <= end; i++) {
        const currentId = data[i].id;
        if (isCurrentlySelected) {
          newSelectedRows.delete(currentId);
        } else {
          newSelectedRows.add(currentId);
        }
      }
    } else {
      // 일반 클릭의 경우
      if (selectedRows.has(rowId)) {
        newSelectedRows.delete(rowId);
      } else {
        newSelectedRows.add(rowId);
      }
    }

    lastInteractedIndex.current = index;
    setSelectedRows(newSelectedRows);
  };

  const handleRowClick = (index: number) => {
    const rowId = data[index].id;
    const newSelectedRows = new Set(selectedRows);

    if (selectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.clear();
      newSelectedRows.add(rowId);
    }

    setSelectedRows(newSelectedRows);
    lastInteractedIndex.current = index;
  };

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
                className={selectedRows.has(row.id) ? "selected" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
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
