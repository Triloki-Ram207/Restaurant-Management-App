import './App.css';
import ThanksForOrdering from './components/ThanksForOrdering.jsx';
import Home from './pages/Home.jsx';
import OrderSummary from './pages/OrderSummary.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/items' element={<Home />} />
        <Route path='/order-summary' element={<OrderSummary />} />
        <Route path='/thanks-for-ordering' element={<ThanksForOrdering />} />
      </Routes>
    </div>
  );
}

export default App;
