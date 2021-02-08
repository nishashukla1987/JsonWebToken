const jwt = require('jsonwebtoken');

module.exports = {
  verified: (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) res.status(401).send('Access denied');

      const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = verifiedUser.user;
      console.log(req.user);
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
