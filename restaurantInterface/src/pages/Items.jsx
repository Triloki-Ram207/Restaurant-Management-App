import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssFiles/configuration.css';
import LetterSearchFilter from '../components/analytics/LetterSearchFilter';
import ItemCard from '../components/ItemCard';

function Configuration() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
const backendURL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/v1/menuData`);
        const flattened = Object.values(data).flat();
        setItems(flattened);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const matchesSearch = (label) =>
    label.toLowerCase().startsWith(searchQuery.toLowerCase());

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">Loading menu items...</div>
      </div>
    );
  }

  return (
    <>
      <LetterSearchFilter setSearchQuery={setSearchQuery} readType={false} />
      <div className="configuration-container">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {items.map((item) => {
            const label = item.name;
            return (
              <div className={matchesSearch(label) ? '' : 'dimmed'} key={item._id}>
                <ItemCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Configuration;
