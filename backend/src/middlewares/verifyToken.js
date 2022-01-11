const jwt = require('jsonwebtoken');

verify_token = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).end();
  jwt.verify(token, 'appanotai', (err, decoded) => {
      if (err)  return res.status(401).end();
      req.user = {id: decoded.id, email: decoded.email};
      next();
  });
}

module.exports = verify_token