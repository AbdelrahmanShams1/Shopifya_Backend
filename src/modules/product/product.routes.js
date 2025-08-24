import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { isAdmin } from "../../middleware/checkAdmin.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.controller.js";

export const postRoutes = Router();

postRoutes.get("/posts", getProducts);
postRoutes.get("/getPosts/:id", getProductById);
postRoutes.post("/admin/posts", verifyToken, isAdmin, createProduct);
postRoutes.put("/admin/posts/:id", verifyToken, isAdmin, updateProduct);
postRoutes.delete("/admin/posts/:id", verifyToken, isAdmin, deleteProduct);
