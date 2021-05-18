const express = require('express');
const router = express.Router();
const auth_service = require('../services/AuthService');

router.post('/signup', auth_service.addUser);

router.post('/login', auth_service.verifyUser, auth_service.grantAccess);

router.post('/api/authenticateUser', auth_service.authenticateToken, (req, res) => {
    res.send('this is api/authenticateUser');
    res.cookie('user', req.user, { maxAge: 900000, httpOnly: true });
})

module.exports = router;