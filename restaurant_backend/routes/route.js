import express from "express";
import { createReservation } from "../controllers/RegisterUser.js";
import {
  getGroupedMenuItems,
  getCategoryItems,
} from "../controllers/getCategoryData.js";
import { createOrderedItem } from "../controllers/StoreOrderedItems.js";
import {
  createTable,
  deleteTable,
  getAllTables,
  assignTable,
} from "../controllers/Table.js";
import {
  getOrderStats,
  getRevenueStats,
  getAllOrderedItems,
  getOrderSummary,
} from "../controllers/GetOrdersStats.js";
import { assignChef, getAllChefs } from "../controllers/ChefOrder.js";

const router = express.Router();

router.post("/createUser", createReservation);
router.get("/menu", getGroupedMenuItems);
router.post("/ordered-items", createOrderedItem);
router.post("/tables", createTable);
router.delete("/tables/:number", deleteTable);
router.get("/tables", getAllTables);
router.post("/tables/assign", assignTable);
router.get("/stats", getOrderStats);
router.get("/stats/revenue", getRevenueStats);
router.get("/getAllOrders", getAllOrderedItems);
router.get("/orders/summary", getOrderSummary);
router.post("/assign-chef", assignChef);
router.get("/getChefs", getAllChefs);
router.get("/menu/:category", getCategoryItems);
router.get("/menuData", getGroupedMenuItems);

export default router;
