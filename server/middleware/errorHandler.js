const errorHandler = (err, req, res, next) => {
 
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';


  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  
  if (err.code === 11000) {
    statusCode = 400;
    message = 'This information (e.g., Email/Username) is already in use!';
  }


  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }


  res.status(statusCode).json({
    success: false,
    message: message,
    
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;