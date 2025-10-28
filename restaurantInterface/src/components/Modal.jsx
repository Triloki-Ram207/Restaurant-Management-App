import React from 'react';
import '../cssFiles/modal.css';

const CreateTableModal = ({
  tableName,
  setTableName,
  chairCount,
  setChairCount,
  onCreate,
  onClose,
  nextTableNumber
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="modal-close" onClick={onClose}>✕</span>

        <label>Table name (optional)</label>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder={`Table ${nextTableNumber}`}
        />

        <label>Chair</label>
        <select value={chairCount} onChange={(e) => setChairCount(e.target.value)}>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>

        <button onClick={onCreate}>Create</button>
      </div>
    </div>
  );
};

export default CreateTableModal;
