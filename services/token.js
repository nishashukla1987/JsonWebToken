const jwt = require('jsonwebtoken');

module.exports = {
  createJWT: (data, expires) => {
    return jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: expires,
    });
  },
};
