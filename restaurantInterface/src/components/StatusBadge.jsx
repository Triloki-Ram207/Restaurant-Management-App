import React from 'react';
import { FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import processing from '../assets/orderLine/processing.png'
import served from '../assets/orderLine/served.png'
import notPickedUp from '../assets/orderLine/takeAway.png'


function StatusBadge({ status, orderType }) {
  const label = status === 'done' ? 'Order Done' : 'Processing';

  const getBadgeColor = () => {
    if (status === 'done' && orderType === 'Dine In') return '#31FF65';     // light green
    if (status === 'done' && orderType === 'Take Away') return '#9BAEB3';   // light blue
    if (status === 'ongoing') return '#FDC474';                             // light orange
    return '#F0F0F0';                                                       // default gray
  };

  const getLabelColor = () => {
    if (status === 'done' && orderType === 'Dine In') return '#0B8B2D';     // dark green
    if (status === 'done' && orderType === 'Take Away') return '#2C3E50';   // dark blue-gray
    if (status === 'ongoing') return '#B85C00';                             // darker orange
    return '#555';                                                          // default dark gray
  };

   const getIcon = () => {
    if (status === 'done' && orderType === 'Dine In') return served;
    if (status === 'done' && orderType === 'Take Away') return notPickedUp;
    return processing;
  };

  return (
    <span
      className="status-badge"
      style={{ backgroundColor: getBadgeColor(), padding: '6px 12px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
       <img src={getIcon()} alt="status icon" style={{ width: '20px', height: '20px' }} />
      <span style={{ color: getLabelColor(), fontWeight: 'bold' }}>{label}</span>
    </span>
  );
}

export default StatusBadge;
