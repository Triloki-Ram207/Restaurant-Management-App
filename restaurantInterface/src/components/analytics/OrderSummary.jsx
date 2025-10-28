import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import '../../cssFiles/orderSummary.css';

const COLORS = ['#43aa8b', '#577590', '#ac1214'];
const orderId = 'hijokplrngtop[gtgkoikokyhikoy[phokphnoy';
const backendURL = import.meta.env.VITE_BACKEND_URL;


const OrderSummary = () => {
  const [summary, setSummary] = useState({ served: 0, dineIn: 0, takeAway: 0 });
  const [filter, setFilter] = useState('daily');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/v1/orders/summary?filter=${filter}`);
        console.log("data:", data);
        setSummary({
          served: data.served || 0,
          dineIn: data.dineIn || 0,
          takeAway: data.takeAway || 0,
        });
      } catch (error) {
        console.error('Failed to fetch order summary:', error);
      }
    };

    fetchSummary();
  }, [filter]);

  const total = summary.served + summary.dineIn + summary.takeAway;

  const data = [
    { name: 'Served', value: summary.served },
    { name: 'Dine In', value: summary.dineIn },
    { name: 'Take Away', value: summary.takeAway },
  ];

  return (
    <div className="order-summary">
      <div className="title">Order Summary</div>
      <div className="order-header">
        <div className="order-id">{orderId}</div>
        <select
          className="order-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="order-stat">
        <div className="stat-box">👨‍🍳 {summary.served}<br />Served</div>
        <div className="stat-box">🍽️ {summary.dineIn}<br />Dine In</div>
        <div className="stat-box">🥡 {summary.takeAway}<br />Take Away</div>
      </div>

      <div className="visual-stats">
        <div className="donut-chart">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="order-stats">
          {data.map((item, index) => {
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div className="stat-line" key={item.name}>
                <div className="label">{item.name}</div>
                <div className="percent">{percent}%</div>
                <div className="bar">
                  <div
                    className="fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: COLORS[index],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
