import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
