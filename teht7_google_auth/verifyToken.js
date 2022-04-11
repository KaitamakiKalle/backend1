const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token',
    });
  } else {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Token is not valid or it is expired',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

module.exports = verifyToken;
