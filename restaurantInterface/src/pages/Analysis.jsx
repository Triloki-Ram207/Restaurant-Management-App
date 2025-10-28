import '../cssFiles/analysis.css';
import Card from '../components/Card';
import OrderSummary from '../components/analytics/OrderSummary';
import Revenue from '../components/analytics/Revenue';
import TableReservationView from '../components/analytics/TableReservationView';
import ChefOrderTable from '../components/analytics/ChefOrderTable';
import LetterSearchFilter from '../components/analytics/LetterSearchFilter';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import totalChef from '../assets/statsIcons/totalChef.png';
import revenue from '../assets/statsIcons/revenue.png';
import orders from '../assets/statsIcons/totalOrders.png';
import clients from '../assets/statsIcons/clients.png';

function Analysis({tables}) {
  const [searchQuery, setSearchQuery] = useState('');
const [loading, setLoading] = useState(true);

  const [orderStats, setOrderStats] = useState({
  totalRevenue: 0,
  totalOrders: 0,
  totalClients: 0
});
const backendURL = import.meta.env.VITE_BACKEND_URL;


 const data = [
  { icon: totalChef, value: " 04", title: "Total Chef" },
  { icon: revenue, value: `${orderStats.totalRevenue}`, title: "Total Revenue" },
  { icon: orders, value: orderStats.totalOrders, title: "Total Orders" },
  { icon: clients, value: orderStats.totalClients, title: "Total Clients" },
];


  const matchesSearch = (label) =>
    label.toLowerCase().startsWith(searchQuery.toLowerCase());

 useEffect(() => {
  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/v1/stats`);
      setOrderStats(data);
    } catch (error) {
      console.error('Failed to fetch order stats:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

if (loading) {
  return (
    <div className="loader-container">
      <div className="loader">Loading analytics...</div>
    </div>
  );
}


  return (
   <>
      <LetterSearchFilter setSearchQuery={setSearchQuery} readType={false}/>
       <div className='analysis-container'>
      <h2 className='header'>Analytics</h2>
      <div className='restro-data'>
        {data.map((item, index) => {
          const label = item.title;
          return (
            <div className={matchesSearch(label) ? '' : 'dimmed'} key={index}>
              <Card icon={item.icon} value={item.value} title={item.title} />
            </div>
          );
        })}
      </div>

      <div className='visual-data'>
        <div className={matchesSearch('Order Summary') ? '' : 'dimmed'}>
          <OrderSummary />
        </div>
        <div className={matchesSearch('Revenue') ? '' : 'dimmed'}>
          <Revenue />
        </div>
        <div className={matchesSearch('Tables') ? '' : 'dimmed'}>
          <TableReservationView tablesData={tables} />
        </div>
      </div>

      <div>
        <ChefOrderTable />
      </div>
    </div>
   </>
    
  );
}

export default Analysis;
