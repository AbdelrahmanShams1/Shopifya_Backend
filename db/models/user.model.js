import { model, Schema } from "mongoose";

const userModel = Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const user = model("User", userModel);
