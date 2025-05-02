function checkRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: `Access denied. Only ${role}s can perform this action.` });
      
    }
    next();
  };
}


export default checkRole;
