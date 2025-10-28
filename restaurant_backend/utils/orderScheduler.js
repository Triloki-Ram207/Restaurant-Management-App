import OrderedItem from '../models/OrderedItem.js';

export const scheduleOrderCompletion = (order, io) => {
  const delay = new Date(order.readyAt) - Date.now();
  if (delay <= 0) return; // already expired

  setTimeout(async () => {
    try {
      const updated = await OrderedItem.findByIdAndUpdate(
        order._id,
        { status: 'done' },
        { new: true }
      );
      io.emit('orderStatusUpdated', { orderId: updated._id, status: 'done' });
    } catch (err) {
      console.error(`Failed to auto-complete order ${order._id}:`, err.message);
    }
  }, delay);
};
