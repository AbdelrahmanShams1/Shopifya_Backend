import { Router } from "express";
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateUser,
  verifyEmail,
} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { isAdmin } from "../../middleware/checkAdmin.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const userRoutes = Router();

userRoutes.post("/user/register", checkEmail, register);
userRoutes.get("/user/verify/:email", verifyEmail);
userRoutes.post("/user/login", login);
userRoutes.get("/admin/user", verifyToken, isAdmin, getUsers);
userRoutes.put("/user/:id", verifyToken, updateUser);
userRoutes.delete("/user/:id", verifyToken, deleteUser);
userRoutes.put("/admin/user/:id", verifyToken, isAdmin, updateUser);
userRoutes.delete("/admin/user/:id", verifyToken, isAdmin, deleteUser);
