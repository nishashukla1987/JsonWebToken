const Joi = require('joi');

module.exports = {
  registerValidator: (data) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email({ tlds: true }).required(),
      password: Joi.string().min(4).required(),
    });

    return schema.validate(data);
  },

  loginValidator: (data) => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: true }).required(),
      password: Joi.string().min(4).required(),
    });

    return schema.validate(data);
  },
};
