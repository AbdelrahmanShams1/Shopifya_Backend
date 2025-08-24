import { cart } from "../../../db/models/cart.model.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cart.find().populate("products.product");
    res.status(200).json({ message: "Carts retrieved successfully", carts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCartById = async (req, res) => {
  try {
    const carts = await cart
      .findById(req.params.id)
      .populate("products.product");
    if (!carts) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart retrieved successfully", carts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createCart = async (req, res) => {
  try {
    const { user, products } = req.body;
    const { product, quantity } = products[0];

    let userCart = await cart.findOne({ user });

    if (!userCart) {
      userCart = await cart.create({
        user,
        products: [{ product, quantity }],
      });
      return res.status(201).json({
        message: "Cart created successfully",
        cart: userCart,
      });
    } else {
      const productIndex = userCart.products.findIndex(
        (p) => p.product.toString() === product
      );

      if (productIndex > -1) {
        userCart.products[productIndex].quantity += quantity;
      } else {
        userCart.products.push({ product, quantity });
      }

      await userCart.save();

      return res.status(200).json({
        message: "Product updated in cart",
        cart: userCart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedCarts = await cart.findByIdAndDelete(req.params.id);

    if (!deletedCarts) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res
      .status(200)
      .json({ message: "Cart deleted successfully", cart: deletedCarts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { getCarts, getCartById, createCart, deleteCart };
