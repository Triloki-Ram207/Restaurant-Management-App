// ChefBadge.jsx
import React from 'react';
import '../cssFiles/card.css'

const ChefBadge = ({ icon, value, title }) => {
  return (
    <div className="card">
        <img 
        className="card-icon" src={icon} alt={title} />
      
      <div className="card-content">
        <div className="card-value">{value}</div>
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
};

export default ChefBadge;
