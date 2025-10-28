import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateOrderType, clearCart } from '../dataManagement/userCartSlice';
import '../cssFiles/swipeToOrder.css';
import { toast } from 'react-toastify';

const SwipeToOrder = ({ orderType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartEmpty = Object.keys(cartItems).length === 0;

  const user = useSelector((state) => state.cart.user);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swiped, setSwiped] = useState(false);
const backendURL = import.meta.env.VITE_BACKEND_URL;


  const handlers = useSwipeable({
    onSwiping: (e) => {
      const progress = Math.min(Math.max(e.deltaX, 0), 250);
      setSwipeProgress(progress);
    },
    onSwipedRight: async () => {
      if (isCartEmpty) {
    toast.warn('Your cart is empty');
    return;
  }
      setSwiped(true);
      dispatch(updateOrderType(orderType));

      let assignedTable = null;

      if (orderType === 'Dine In' && user?.numberOfPersons) {
        try {
          const res = await axios.post(`${backendURL}/api/v1/tables/assign`, {
            numberOfPersons: parseInt(user.numberOfPersons),
          });
          assignedTable = res.data;
        } catch (error) {
          console.error('No table available:', error.message);
          toast.error('No available table for your group size');
          return; // prevent order if no table
        }
      }
      let orderedItems = Object.values(cartItems).map(item => ({
        ...item,
      }));
      orderedItems=[...orderedItems,{orderType},{assignedTable}]
try {
  const res = await axios.post(`${backendURL}/api/v1/assign-chef`);
} catch (error) {
  console.error('Chef assignment failed:', error.message);
  toast.error('Could not assign chef');
  return;
}

      try {
        await axios.post(`${backendURL}/api/v1/ordered-items`, orderedItems);
        localStorage.removeItem('cart');
        dispatch(clearCart());
        toast.success('Order placed successfully');
        navigate('/thanks-for-ordering');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        console.error('Failed to submit order:', error.message);
      }
    },
    onSwiped: () => {
      setTimeout(() => {
        setSwipeProgress(0);
        setSwiped(false);
      }, 500);
    },
    trackMouse: true,
  });

  return (
    <div {...handlers} className="swipe-button">
      <div
        className={`swipe-circle ${swiped ? 'swiped' : ''}`}
        style={{ transform: `translateX(${swipeProgress}px)` }}
      >
        {swiped ? '✔' : '→'}
      </div>
      <span className="swipe-text">Swipe to Order</span>
    </div>
  );
};

export default SwipeToOrder;
