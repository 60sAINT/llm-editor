import React, { useState } from "react";
import "./index.css";

interface TableSizeSelectorProps {
  onSelect: (rows: number, cols: number) => void;
}

export const TableSizeSelector: React.FC<TableSizeSelectorProps> = ({
  onSelect,
}) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [lockedRows, setLockedRows] = useState(0);
  const [lockedCols, setLockedCols] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleMouseOver = (row: number, col: number) => {
    if (!isLocked) {
      setRows(row);
      setCols(col);
    }
  };

  const handleClick = () => {
    onSelect(rows, cols);
    setLockedRows(rows);
    setLockedCols(cols);
    setIsLocked(true);
  };

  const handleMouseLeave = () => {
    setIsLocked(false);
    setRows(0);
    setCols(0);
    setLockedRows(0);
    setLockedCols(0);
  };

  return (
    <div onMouseLeave={handleMouseLeave}>
      <div className="table-selector">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(6)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  rowIndex < rows && colIndex < cols ? "selected" : ""
                } ${
                  isLocked && rowIndex < lockedRows && colIndex < lockedCols
                    ? "locked"
                    : ""
                }`}
                onMouseOver={() => handleMouseOver(rowIndex + 1, colIndex + 1)}
                onClick={handleClick}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {rows} x {cols}
      </div>
    </div>
  );
};
