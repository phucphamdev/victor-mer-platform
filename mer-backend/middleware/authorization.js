
module.exports = (...role) => {

  return (req, res, next) => {
    const userRole = req.user.role;
    // Case-insensitive role comparison
    const normalizedUserRole = userRole?.toLowerCase();
    const normalizedRoles = role.map(r => r.toLowerCase());
    
    // Super Admin has access to everything
    if (normalizedUserRole === 'super admin') {
      return next();
    }
    
    if(!normalizedRoles.includes(normalizedUserRole)){
      return res.status(403).json({
        status: "fail",
        error: "You are not authorized to access this"
      });
    }

    next();
  };
};