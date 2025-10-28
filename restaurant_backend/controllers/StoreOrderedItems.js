import OrderedItem from "../models/OrderedItem.js";
import { scheduleOrderCompletion } from "../utils/orderScheduler.js";

export const createOrderedItem = async (req, res) => {
  try {
    const payload = req.body;

    const menuItems = payload.filter((item) => item._id && item.qty);
    const orderType =
      payload.find((item) => item.orderType)?.orderType || "Dine In";
    const tableNumber =
      payload.find((item) => item.assignedTable)?.assignedTable?.number || null;

    const totalPrice = menuItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const totalItems = menuItems.reduce((sum, item) => sum + item.qty, 0);

    const prepTimes = menuItems.map((item) => {
      const match = item.averagePreparationTime.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    });
    const totalPrepTime = prepTimes.reduce((sum, time) => sum + time, 0);
    const totalAveragePreparationTime = `${totalPrepTime} mins`;
    const readyAt = new Date(Date.now() + totalPrepTime * 60 * 1000);

    const formattedItems = menuItems.map((item) => ({
      name: item.name,
      quantity: item.qty,
    }));

    const newOrder = new OrderedItem({
      totalAveragePreparationTime,
      orderType,
      tableNumber,
      status: "ongoing",
      totalItems,
      items: formattedItems,
      totalPrice,
      readyAt,
      cookingInstructions: "",
    });

    await newOrder.save();

    // Schedule status update
    scheduleOrderCompletion(newOrder, req.io);

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};
