import { useRef, useState } from "react";

export default function useTableSelection<T extends { id: number }>(
  initialData: T[]
) {
  const [data, setData] = useState<T[]>(initialData);
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

  return {
    data,
    setData,
    isSelected: (id: number) => selectedRows.has(id),
    handleCheckboxClick,
    handleRowClick,
  };
}
