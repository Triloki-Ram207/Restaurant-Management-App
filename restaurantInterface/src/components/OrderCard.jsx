import React, { useEffect, useState } from 'react';
import '../cssFiles/orderCard.css';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { MdOutlineRestaurant } from "react-icons/md";
import StatusBadge from './StatusBadge';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

export default function OrderCard({ order }) {
  const [status, setStatus] = useState(order.status);
  const [statusLabel, setStatusLabel] = useState(
    order.status === 'done'
      ? order.orderType === 'Dine In'
        ? 'Served'
        : 'Not Picked Up'
      : 'Ongoing'
  );
  const [timeLeft, setTimeLeft] = useState(() => {
    const remaining = new Date(order.readyAt) - Date.now();
    return Math.max(0, Math.floor(remaining / 1000));
  });

 useEffect(() => {
  const remaining = new Date(order.readyAt) - Date.now();
  setTimeLeft(Math.max(0, Math.floor(remaining / 1000)));
}, [order.readyAt]);


  useEffect(() => {
    socket.on('orderStatusUpdated', ({ orderId, status: newStatus }) => {
      if (orderId === order._id) {
        setStatus(newStatus);
        setStatusLabel(
          newStatus === 'done'
            ? order.orderType === 'Dine In'
              ? 'Served'
              : 'Not Picked Up'
            : 'Ongoing'
        );
        setTimeLeft(0);
        toast.success(`Order #${orderId} is now marked as done!`);
      }
    });

    return () => socket.off('orderStatusUpdated');
  }, [order._id, order.orderType]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const getCardColor = () => {
    if (status === 'ongoing') return 'orange';
    if (status === 'done' && order.orderType === 'Dine In') return 'green';
    if (status === 'done' && order.orderType === 'Take Away') return 'blue';
    return 'gray';
  };

  const bgColor = getCardColor();

  const getOrderTypeClass = () => {
  if (status === 'done' && order.orderType === 'Dine In') return 'dine-done';
  if (status === 'done' && order.orderType === 'Take Away') return 'takeaway-done';
  if (status === 'ongoing') return 'ongoing';
  return 'default';
};

  return (
    <div className={`order-card ${bgColor}`}>

      <div className="order-meta">
      <div className='order-info'>
        <div className="order-header">
        <h3> <MdOutlineRestaurant size={20} color='#4d46afff' /> #{order._id.slice(-4)}</h3>
      </div>
        <div>
          <p>Table: {order.tableNumber || '—'}</p>
          <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
          <p className='total-items'>{order.totalItems} Item</p>
        </div>
      </div>
        <div className={`time-and-type ${bgColor}`}>
          <p className={`sub-status ${getOrderTypeClass()}`}>
  {order.orderType}
</p>
          <p className="sub-status">
            {status === 'ongoing' ? `Ongoing - ${formattedTime}` : statusLabel}
          </p>
        </div>
      </div>

      <div className="order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="item-block">
            <ul>
              <li>{item.quantity} x {item.name}</li>
            </ul>
          </div>
        ))}
      </div>

      <StatusBadge status={status} orderType={order.orderType} />
    </div>
  );
}
