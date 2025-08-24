import { model, Schema } from "mongoose";

const orderModel = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

export const order = model("Order", orderModel);
