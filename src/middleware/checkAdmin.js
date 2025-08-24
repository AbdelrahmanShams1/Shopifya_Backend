export const isAdmin = (req, res, next) => {
  if (req.decoded && req.decoded.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied, admin only" });
};
