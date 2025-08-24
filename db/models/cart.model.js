import { model, Schema } from "mongoose";

const cartModel = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const cart = model("Cart", cartModel);
