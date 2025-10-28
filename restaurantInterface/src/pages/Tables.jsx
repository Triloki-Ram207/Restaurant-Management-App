import React, { useState, useEffect } from 'react';
import '../cssFiles/tableManager.css';
import CreateTableModal from '../components/Modal';
import axios from 'axios';
import deleteIcon from '../assets/table/delete.png';
import chair from '../assets/table/chair.png';

const MAX_TABLES = 30;

const TableManager = ({ tables, setTables }) => {
  const [showModal, setShowModal] = useState(false);
  const [tableName, setTableName] = useState('');
  const [chairCount, setChairCount] = useState('4');
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/v1/tables`);
      setTables(res.data);
    } catch (error) {
      console.error('Failed to fetch tables:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleCreateTable = async () => {
    if (tables.length >= MAX_TABLES) return;

    const newTable = {
      number: tables.length + 1,
      name: tableName || `Table ${tables.length + 1}`,
      chairs: parseInt(chairCount),
    };

    try {
      await axios.post(`${backendURL}/api/v1/tables`, newTable);
      await fetchTables();
      setTableName('');
      setChairCount('4');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create table:', error.message);
    }
  };

  const handleDeleteTable = async (tableNumber) => {
    try {
      await axios.delete(`${backendURL}/api/v1/tables/${tableNumber}`);
      await fetchTables();
    } catch (error) {
      console.error('Failed to delete table:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">Loading tables...</div>
      </div>
    );
  }

  return (
    <div className="table-manager">
      <h2>Tables</h2>
      <div className="table-grid">
        {tables.map((table) => (
          <div key={table.number} className="table-box">
            <div className="table-label">
              <div>
                {table.name}
                <span
                  className="delete-icon"
                  onClick={() => {
                    if (table.reserved) return;
                    handleDeleteTable(table.number);
                  }}
                  style={{ cursor: table.reserved ? 'not-allowed' : 'pointer' }}
                >
                  <img src={deleteIcon} alt="Delete" />
                </span>
              </div>
              <p>{String(table.number).padStart(2, '0')}</p>
            </div>
            <div className="table-chairs">
              <img src={chair} alt="Chairs" />
              {table.chairs}
            </div>
          </div>
        ))}
        {tables.length < MAX_TABLES && (
          <div className="table-box add-button" onClick={() => setShowModal(true)}>
            +
          </div>
        )}
      </div>

      {showModal && (
        <CreateTableModal
          tableName={tableName}
          setTableName={setTableName}
          chairCount={chairCount}
          setChairCount={setChairCount}
          onCreate={handleCreateTable}
          onClose={() => setShowModal(false)}
          nextTableNumber={tables.length + 1}
        />
      )}
    </div>
  );
};

export default TableManager;
