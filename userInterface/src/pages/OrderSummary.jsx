import React, {useState } from 'react';
import '../cssFiles/orderSummary.css'
import InstructionModal from '../components/InstructionModal';
import SwipeToOrder from '../components/SwipeToOrder';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem,deleteItem } from '../dataManagement/userCartSlice';

const OrderSummary = () => {

   const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const items = Object.values(cartState?.items || {});
const user = cartState?.user || {};

 const [showModal, setShowModal] = useState(false);
 const [instructions,setInstructions]=useState('');

  const [orderType, setOrderType] = useState('Dine In');

  const delivery = 50;
  const tax = 5;

  
 const handleQtyChange = (itemName,delta) => {
  const item = items.find((item => item.name === itemName));
  if (!item) return;

  if ( delta===-1) {
    dispatch(removeItem(itemName));
  } else {
    dispatch(addItem(item));
  }
};

  const itemTotal = items.length > 0
  ? items.reduce((sum, item) => sum + item.price * item.qty, 0)
  : 0;

const grandTotal = items.length > 0
  ? itemTotal + (orderType === 'Take Away' ? delivery : 0) + tax
  : 0;


const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="order-summary-container">
    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} type={true} />

      <h2>Your Order</h2>
    
      {items.map((item) => (
  <div key={item.name} className="item-section">
    <img src={item.image} alt={item.name} className="item-image" />
    <div className="item-details">
      <div className="item-header">
        <h3>{item.name}</h3>
        <span className="item-price">₹{item.price}</span>
        <button onClick={() => dispatch(deleteItem(item.name))}className="remove-btn">✖</button>
      </div>

      <div className="qty-controls">
        {item.qty>=1 && <button onClick={() => handleQtyChange(item.name,-1)}>-</button> }
        <span>{item.qty}</span>
        <button onClick={() => handleQtyChange(item.name,1)}>+</button>
      </div>

      <button onClick={() => setShowModal(true)} className="open-modal-btn">
  Add Cooking Instructions
   </button>
    </div>
  </div>
))}


      <div className="order-type-buttons">
        <button
          className={orderType === 'Dine In' ? 'active' : ''}
          onClick={() => setOrderType('Dine In')}
        >
          Dine In
        </button>
        <button
          className={orderType === 'Take Away' ? 'active' : ''}
          onClick={() => setOrderType('Take Away')}
        >
          Take Away
        </button>
      </div>

      <div className="cost-breakdown">
  <div className="cost-row">
    <span>Item Total</span>
    <span>₹{itemTotal.toFixed(2)}</span>
  </div>
    {orderType==='Take Away' &&
  <div className="cost-row dotted">
    <span>Delivery Charge</span>
    <span>₹{delivery}</span>
  </div>}
  <div className="cost-row">
    <span>Taxes</span>
    <span>₹{tax.toFixed(2)}</span>
  </div>
  <div className="cost-row grand-total">
    <strong>Grand Total</strong>
    <strong>₹{grandTotal.toFixed(2)}</strong>
  </div>
</div>

      <div className="delivery-details">
  <h3>Your Details</h3>
  <p>{user?.name}, {user?.contactNumber}, ({user?.numberOfPersons} persons)</p>
  <hr />
  <div className="delivery-info">
    <div className="info-row">
      <span className="icon">📍</span>
      <span>Home Address - {user?.address}</span>
    </div>
   {
    orderType==='Take Away' &&
     <div className="info-row">
      <span className="icon">⏰</span>
      <span>Delivery in 42 mins</span>
    </div>
   }
  </div>
</div>

<SwipeToOrder orderType={orderType}/>
      {
        showModal && (
            <InstructionModal setShowModal={setShowModal} 
            instructions={instructions} setInstructions={setInstructions} />
        )
      }
    </div>
  );
};

export default OrderSummary;
