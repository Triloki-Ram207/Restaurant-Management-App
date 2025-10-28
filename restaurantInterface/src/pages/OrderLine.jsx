import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import '../cssFiles/orderLine.css';

export default function OrderLine() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
const backendURL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/v1/getAllOrders`);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className='order-line-wrapper'>
      <h2 className='order-line-title'>OrderLine</h2>
      <div className="order-line-container">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
