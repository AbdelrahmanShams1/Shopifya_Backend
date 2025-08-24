import { model, Schema } from "mongoose";

const productModel = Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: {
      type: String,
      enum: ["electronics", "clothing", "food"],
      default: "electronics",
    },
    stock: { type: Number, default: 0 },
    url: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

export const product = model("Product", productModel);
