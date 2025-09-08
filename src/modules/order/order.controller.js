import { order } from "../../../db/models/order.model.js";
import { product } from "../../../db/models/product.model.js";

const getOrderById = async (req, res) => {
  try {
    if (req.decoded.role !== "admin" && req.decoded.id !== req.params.id)
      return res.status(401).json({ message: "Unauthorized access" });

    const orders = await order
      .find({ user: req.params.id }) // هنا التعديل
      .populate("products.product");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createOrder = async (req, res) => {
  try {
    const user = req.body.user;
    const products = req.body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid products data" });
    }
    if (!user) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let foundOrder = await order.findOne({ user }).populate("products.product");
    if (foundOrder) {
      for (const item of products) {
        const { product, quantity } = item;

        const orderIndex = foundOrder.products.findIndex(
          (p) =>
            (p.product._id
              ? p.product._id.toString()
              : p.product.toString()) === product.toString()
        );

        if (orderIndex > -1) {
          foundOrder.products[orderIndex].quantity += quantity;
        } else {
          foundOrder.products.push({ product, quantity });
        }
      }

      const productIds = foundOrder.products.map((p) => p.product);
      const dbProducts = await product.find({ _id: { $in: productIds } });

      const productMap = {};
      dbProducts.forEach((p) => {
        productMap[p._id] = p.price;
      });

      foundOrder.totalAmount = foundOrder.products.reduce((acc, item) => {
        const price = productMap[item.product._id] || 0;

        let c = acc + price * item.quantity;
        return acc + price * item.quantity;
      }, 0);

      await foundOrder.save();

      return res.status(200).json({
        message: "Order updated successfully",
        order: foundOrder,
      });
    }

    const productIds = products.map((p) => p.product);
    const dbProducts = await product.find({ _id: { $in: productIds } });

    const productMap = {};
    dbProducts.forEach((p) => {
      productMap[p._id] = p.price;
    });

    const totalAmount = products.reduce((acc, item) => {
      const price = productMap[item.product] || 0;
      return acc + price * item.quantity;
    }, 0);

    const newOrder = await order.insertOne({
      user,
      products,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await order.find().populate("products.product");
    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const isAdmin = req.decoded.role === "admin";
    if (!isAdmin && req.decoded.id !== req.params.id)
      return res.status(403).json({ message: "Only admin can update orders" });

    if (!isAdmin && req.body.status)
      return res
        .status(403)
        .json({ message: "Only admin can change order status" });

    const updatedOrder = await order.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedOrder = await order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { getOrderById, createOrder, updateOrder, deleteOrder, getAllOrders };
