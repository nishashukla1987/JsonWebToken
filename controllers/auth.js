const User = require('../models/User');
const { createJWT } = require('../services/token');
const { hashPass, comparePass } = require('../services/hash');
const { registerValidator, loginValidator } = require('../services/validator');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const { error } = registerValidator(req.body);
      if (error) res.status(400).send(error.details[0].message);

      const emailExist = await User.findOne({ email });
      if (emailExist) res.status(400).send('Email already in use.');

      const securePass = await hashPass(password);

      const user = new User({
        name,
        email,
        password: securePass,
      });

      if (user) await user.save();

      const token = createJWT({ user }, '30d');

      res
        .header('token', token)
        .status(201)
        .send({ message: 'User registerd', token: token, data: user });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const { error } = loginValidator(req.body);
      if (error) res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email });
      if (!user) res.status(400).send('Invalid email');

      const checkPass = await comparePass(password, user.password);
      if (!checkPass) res.status(400).send('Incorrect password');

      const token = createJWT({ user }, '30d');

      res
        .header('token', token)
        .status(200)
        .send({ message: 'Logged in', token: token, data: user });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  logout: (req, res) => {
    const token = createJWT({ data: 'hello' }, 1);
    res
      .header('token', token)
      .status(200)
      .send({ message: 'Logged out', token: token });
  },

  unregister: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.user._id });
      if (user) res.status(200).send({ message: 'Tschuss' });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
