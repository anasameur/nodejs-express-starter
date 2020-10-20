const express = require('express');
const registerToken = require('./registerToken');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * POST registering token
 */
router.post('/register-token', registerToken);
module.exports = router;
