function checkRole(role) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ msg: "Access denied. Only companies can post jobs." });
    }
    next();
  };
}

export default checkRole;
