const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
 
  const authHeader = req.headers.authorization;

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401); // 
    return next(new Error('You are not logged in! Please log in to access this process.'));
  }


  const token = authHeader.split(' ')[1];

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;

  
    next();
  } catch (err) {
    res.status(401);

   
    if (err.name === 'TokenExpiredError') {
      return next(new Error('Your session ha expired! please log in again'));
    }


    if (err.name === 'JsonWebTokenError') {
      return next(new Error('Invalid token! please log in again'));
    }

    return next(new Error('Authentication failed! please log in again'));
  }
};

module.exports = verifyToken;