import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "./order.controller.js";
import { isAdmin } from "../../middleware/checkAdmin.js";

export const orderRoutes = Router();

orderRoutes.get("/order/:id", verifyToken, getOrderById);
orderRoutes.post("/order", verifyToken, createOrder);
orderRoutes.put("/admin/order/:id", verifyToken, isAdmin, updateOrder);
orderRoutes.delete("/admin/order/:id", verifyToken, isAdmin, deleteOrder);
orderRoutes.get("/admin/order", verifyToken, isAdmin, getAllOrders);
