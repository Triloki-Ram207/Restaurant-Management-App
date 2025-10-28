
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TableManager from './pages/Tables.jsx';
import OrderLine from './pages/OrderLine.jsx';
import Analysis from './pages/Analysis.jsx';
import Items from './pages/Items.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [tables, setTables] = useState([]);

  useEffect(() => {
  const fetchTables = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/v1/tables`);
      setTables(res.data);
    } catch (error) {
      console.error('Failed to fetch tables:', error.message);
    }
  };

  fetchTables();
}, []);

  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route
          index
          element={
              <Analysis tables={tables} />
          }
        />
        <Route
          path='/tracker'
          element={
              <TableManager 
              tables={tables} 
              setTables={setTables}
              />

          }
        />
        <Route
          path='/analysis'
          element={
          <OrderLine  />
          }
              

        />
        <Route
          path='/configuration'
          element={
            <Items />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
