const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next({ status: 403, message: "Admin access required" });
  }
  next();
};

export default adminMiddleware;