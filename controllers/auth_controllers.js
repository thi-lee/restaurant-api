const express = require('express');
const router = express.Router();

const auth_service = require('../services/AuthService')
router.post('/sign-up', auth_service.addUser);

module.exports = router;