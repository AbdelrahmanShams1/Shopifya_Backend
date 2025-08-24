import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  jwt.verify(req.headers.token, "finalprojectsecret", (err, decoded) => {
    if (err) return res.json({ message: "invalid token", err });
    req.decoded = decoded;
    next();
  });
};
