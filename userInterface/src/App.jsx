import './App.css';
import ThanksForOrdering from './components/ThanksForOrdering.jsx';
import Home from './pages/Home.jsx';
import OrderSummary from './pages/OrderSummary.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from './dataManagement/userCartSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(clearCart());
      localStorage.removeItem('cart'); // optional: clear persisted cart
    }
  }, [location.pathname, dispatch]);

  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Home value={true} />} />
        <Route path='/items' element={<Home value={false} />} />
        <Route path='/order-summary' element={<OrderSummary />} />
        <Route path='/thanks-for-ordering' element={<ThanksForOrdering />} />
      </Routes>
    </div>
  );
}

export default App;
