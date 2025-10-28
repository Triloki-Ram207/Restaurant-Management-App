import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cors from 'cors';
import reservationRoutes from './routes/route.js';
import http from 'http';
import { Server } from 'socket.io';
import { scheduleOrderCompletion } from './utils/orderScheduler.js';
import OrderedItem from './models/OrderedItem.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 🧠 Connect to DB
connectDB();

// 🛡️ Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://restaurant-management-app-mxlu.vercel.app',
  'https://restaurant-management-app-pi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 📊 API routes
app.use('/api/v1', reservationRoutes);

// 🔍 Health check
app.get('/', (req, res) => {
  console.log('/ endpoint hit');
  res.send('Hello World!');
});

const preloadScheduledOrders = async () => {
  const now = new Date();
  const pendingOrders = await OrderedItem.find({ status: 'ongoing', readyAt: { $gt: now } });
  pendingOrders.forEach(order => scheduleOrderCompletion(order, io));
};

preloadScheduledOrders();

// 🔌 Create HTTP server and WebSocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 🚀 Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
