import { product } from "../../../db/models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const productFound = await product.findById(req.params.id);

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      product: productFound,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const existingProduct = await product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const { _id, ...cleanBody } = req.body;

    const newProduct = await product.create(cleanBody);

    res.status(201).json({
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
