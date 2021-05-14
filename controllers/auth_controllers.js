const express = require('express');
const router = express.Router();
const auth_service = require('../services/AuthService');

router.post('/signup', auth_service.addUser);

router.post('/login', auth_service.authenticateUser);

module.exports = router;