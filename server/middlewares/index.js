const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_TOKEN_KEY;

const Auth = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'No token provided'
    });
  }

 // logic
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        messsage: 'Invalid token provided'
      });
    }
    req.roleId = decoded.roleId;
    return next();
  });
};

const isAdmin = (req, res, next) => {
  const admin = 2;
  if (req.roleId === admin) {
    return next();
  }
  res.status(403).send('you are not an admin');
};
module.exports = { isAdmin, Auth };
