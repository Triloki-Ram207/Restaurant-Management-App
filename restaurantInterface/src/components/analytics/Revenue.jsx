import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../../cssFiles/revenue.css'

const OrderSummary = () => {
  const orderId = 'hijokplrngtop[gtgkoikokyhikoy[phokphnoy';

  const [filter, setFilter] = useState('Daily');

const [chartData, setChartData] = useState([]);
const backendURL = import.meta.env.VITE_BACKEND_URL;


useEffect(() => {
  const fetchRevenueData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/v1/stats/revenue?range=${filter.toLowerCase()}`);

      const formattedData = data.map((item) => {
        const date = new Date(item.day || item.week || item.month);
        let label;

        switch (filter) {
          case 'Weekly':
            label = `Week ${date.getWeek?.() || item.week?.split('-')[1] || 'N/A'}`;
            return { week: label, revenue: item.revenue };
          case 'Monthly':
            label = date.toLocaleString('default', { month: 'short' });
            return { month: label, revenue: item.revenue };
          default:
            label = date.toLocaleDateString('default', { weekday: 'short' });
            return { day: label, revenue: item.revenue };
        }
      });

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  fetchRevenueData();
}, [filter]);


  const getXAxisKey = () => {
    switch (filter) {
      case 'Weekly':
        return 'week';
      case 'Monthly':
        return 'month';
      default:
        return 'day';
    }
  };

  return (
   <div className="revenue-dashboard">
  <div className="revenue-title">Revenue</div>
  <div className="revenue-header">
    <div className="revenue-id">{orderId}</div>
    <select
      className="revenue-filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option>Daily</option>
      <option>Weekly</option>
      <option>Monthly</option>
    </select>
  </div>

  <div className="revenue-chart-container">
    <ResponsiveContainer width="100%" height={250}>
     <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={getXAxisKey()} />
  <YAxis />
  <Tooltip />
  <Line
    type="monotone"
    dataKey="revenue"
    className="revenue-line"
    dot={{ r: 4 }}
    activeDot={{ r: 6 }}
  />
</LineChart>

    </ResponsiveContainer>
  </div>
</div>

  );
};

export default OrderSummary;
