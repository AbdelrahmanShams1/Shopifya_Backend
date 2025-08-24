import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/user/user.routes.js";
import { postRoutes } from "./src/modules/product/product.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";
import { orderRoutes } from "./src/modules/order/order.routes.js";

dbConnection;

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

app.listen(3000, () => {
  console.log("Server is running ");
});
