const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      result: 'warning',
      msg: 'Nieprawidłowy token - brak dostępu',
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decodedUser;
    req.user.id = decodedUser.userId;
    req.user.userType = decodedUser.userType;
    next();
  } catch (error) {
    return res.status(403).json({
      result: 'failed',
      orginalMessage: error.message,
      message:"Brak dostępu."
    });
  }
};

module.exports = { requireAuth };
