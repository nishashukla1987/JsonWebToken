const bcrypt = require('bcryptjs');

module.exports = {
  hashPass: async (password) => {
    const salt = await bcrypt.genSalt(12);
    const securePass = await bcrypt.hash(password, salt);
    return securePass;
  },

  comparePass: async (enteredPass, dbPass) => {
    const compared = await bcrypt.compare(enteredPass, dbPass);
    return compared;
  },
};
