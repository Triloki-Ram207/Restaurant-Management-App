import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../cssFiles/chefOrderTable.css';

const ChefOrderTable = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
const backendURL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/getChefs`);
        setChefs(res.data);
      } catch (error) {
        console.error('Failed to fetch chef data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="chef-order-table">
      <table>
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Orders Taken</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          ) : (
            chefs.map((chef) => (
              <tr key={chef.name}>
                <td>{chef.name}</td>
                <td>{chef.orders}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrderTable;
