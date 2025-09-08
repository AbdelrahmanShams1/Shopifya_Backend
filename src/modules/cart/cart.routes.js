import { Router } from "express";
import {
  createCart,
  deleteCart,
  getCartById,
  getCarts,
  deleteProductFromCart,
} from "./cart.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const cartRoutes = Router();

cartRoutes.get("/cart", verifyToken, getCarts);
cartRoutes.get("/cart/:id", verifyToken, getCartById);
cartRoutes.post("/cart", verifyToken, createCart);
cartRoutes.delete("/cart/:id", verifyToken, deleteCart);
cartRoutes.delete(
  "/cart/:cartId/product/:productId",
  verifyToken,
  deleteProductFromCart
);
