import { user } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utilities/Email/emailSend.js";

const register = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const newUser = await user.insertOne(req.body);
    sendMail(req.body.email);
    newUser.password = undefined;
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    let { email } = req.params;
    const decode = jwt.decode(email);
    const foundEmail = await user.findOne({ email: decode.email });
    if (!foundEmail) return res.status(404).json({ message: "User not found" });
    await user.findOneAndUpdate({ email: decode.email }, { isConfirmed: true });
    res.status(404).json({ message: "Confirmed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.find().select("-password");

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      "finalprojectsecret",
      { expiresIn: "1d" }
    );

    foundUser.password = undefined;
    res
      .status(200)
      .json({ message: "Login successful", user: foundUser, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.decoded.role !== "admin" && req.decoded.id !== id)
      return res.status(403).json({ message: "Not authorized" });

    if (req.decoded.role !== "admin" && req.body.role === "admin")
      return res.status(403).json({ message: "Only admin can change role" });

    if (req.body.password)
      req.body.password = bcrypt.hashSync(req.body.password, 8);

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    updatedUser.password = undefined;

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.decoded.role !== "admin" && req.decoded.id !== id)
      return res.status(403).json({ message: "Not authorized" });
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { verifyEmail, updateUser, register, getUsers, deleteUser, login };
