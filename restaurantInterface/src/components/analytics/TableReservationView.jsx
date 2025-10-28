import React from 'react';
import '../../cssFiles/tableReservationView.css';

const TableReservation = ({ tablesData }) => {
  const tables = Array.from({ length: 30 }, (_, i) => {
    const number = i + 1;
    const tableInfo = tablesData.find((t) => t.number === number);
    const status = tableInfo?.reserved ? 'reserved' : 'available';
    return { number, status };
  });
  return (
    <div className="table-reservation">
      <div className="header">
        <h2>Tables</h2>
        <div className="legend">
          <span className="dot available" /> Available
          <span className="dot reserved" /> Reserved
        </div>
      </div>

      <div className="grid">
        {tables.map((table) => (
          <div
            key={table.number}
            className={`table-box-view ${table.status}`}
          >
            <div className="label">Table</div>
            <div className="number">{String(table.number).padStart(2, '0')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableReservation;
