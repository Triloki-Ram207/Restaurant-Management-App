import '../cssFiles/foodItems.css'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../dataManagement/userCartSlice';
import { storeItem } from '../dataManagement/userCartSlice';

const FoodGrid = ({ items}) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
     <div className="food-grid">
      {items.map((item, index) => {
        const qty = cart.items[item.name]?.qty || 0;
        return (
          <div key={index} className="food-card">
  <div className="food-image">
    {item.image ? (
      <img src={item.image} alt={item.name} />
    ) : (
      item.icon
    )}
  </div>
  <div className="food-info">
    <h4>{item.name}</h4>
    <p>₹ {item.price}</p>
  </div>
  {qty > 0 ? (
    <div className="qty-controls">
      <button className="remove-btn" onClick={() => dispatch(removeItem(item.name))}>−</button>
      <span>{qty}</span>
      <button className="add-btn" onClick={() => dispatch(addItem(item))}>+</button>
    </div>
  ) : (
    <button className="add-btn1" onClick={() => dispatch(storeItem(item))}>+</button>
  )}
</div>
        );
      })}
    </div>
  );
};

export default FoodGrid;

