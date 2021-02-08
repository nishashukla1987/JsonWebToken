const express = require('express');
const { register, login, logout, unregister } = require('../controllers/auth');
const { verified } = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/unregister', verified, unregister);

module.exports = router;
