import { user } from "../../db/models/user.model.js";

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const foundUser = await user.findOne({ email: email });
  if (foundUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  next();
};
