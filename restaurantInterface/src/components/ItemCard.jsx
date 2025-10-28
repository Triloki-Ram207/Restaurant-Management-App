import React from 'react';
import '../cssFiles/itemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="image-placeholder">
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="info">
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Price:</strong> ₹{item.price}</p>
        <p><strong>Prep Time:</strong> {item.averagePreparationTime}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>In Stock:</strong> {item.stock > 0 ? 'Yes' : 'No'}</p>
        {item.rating && <p><strong>Rating:</strong> {item.rating} ⭐</p>}
      </div>
    </div>
  );
};

export default ItemCard;
