const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token') || req.query.token || req.cookies.token;
  // Get the token from the request headers, query parameters, or cookies

  const secretKey ="ok"// 256 bits
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    // Verify the token using your secret key (change this to your actual secret)

    const decoded = jwt.verify(token, "ok",(err,decode)=>{
      if(!err)
      {
        console.log("added succesfully")
      }
      else
      {
        console.log("added failed");
      }
    })


    next();
  } catch (err) {
    // next();
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
