import OrderedItem from "../models/OrderedItem.js";
import User from "../models/User.js";
import dayjs from "dayjs";

export const getOrderStats = async (req, res) => {
  try {
    const [totalOrders, totalRevenueResult, totalClients] = await Promise.all([
      OrderedItem.countDocuments(),
      OrderedItem.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
      User.countDocuments(),
    ]);

    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalClients,
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    res.status(500).json({ message: "Failed to fetch order statistics" });
  }
};

export const getRevenueStats = async (req, res) => {
  const { range } = req.query; // 'daily', 'weekly', 'monthly'

  let groupStage;
  let labelKey;

  switch (range) {
    case "weekly":
      groupStage = {
        $dateToString: { format: "%Y-%U", date: "$createdAt" },
      };
      labelKey = "week";
      break;
    case "monthly":
      groupStage = {
        $dateToString: { format: "%Y-%m", date: "$createdAt" },
      };
      labelKey = "month";
      break;
    default:
      groupStage = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
      labelKey = "day";
  }

  try {
    const revenueData = await OrderedItem.aggregate([
      {
        $group: {
          _id: groupStage,
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          [labelKey]: "$_id",
          revenue: 1,
        },
      },
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    res.status(500).json({ message: "Failed to fetch revenue statistics" });
  }
};

export const getAllOrderedItems = async (req, res) => {
  try {
    const orders = await OrderedItem.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching ordered items:", error);
    res.status(500).json({ message: "Failed to fetch ordered items" });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const { filter = "daily" } = req.query;

    // Calculate start date based on filter
    let startDate;
    const now = dayjs();

    if (filter === "weekly") {
      startDate = now.subtract(7, "day").startOf("day");
    } else if (filter === "monthly") {
      startDate = now.subtract(30, "day").startOf("day");
    } else {
      startDate = now.startOf("day"); // daily
    }

    const dateFilter = { createdAt: { $gte: startDate.toDate() } };

    const [servedCount, dineInCount, takeAwayCount] = await Promise.all([
      OrderedItem.countDocuments({
        status: "done",
        orderType: "Dine In",
        ...dateFilter,
      }),
      OrderedItem.countDocuments({
        orderType: "Dine In",
        status: { $in: ["done", "ongoing"] },
        ...dateFilter,
      }),
      OrderedItem.countDocuments({ orderType: "Take Away", ...dateFilter }),
    ]);

    console.log(filter, servedCount, dineInCount, takeAwayCount);

    res.status(200).json({
      filter,
      served: servedCount,
      dineIn: dineInCount,
      takeAway: takeAwayCount,
    });
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching order summary" });
  }
};
