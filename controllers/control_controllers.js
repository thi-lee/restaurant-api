const express = require('express');
const router = express.Router();

const feedback_controllers = require('./feedback_controllers.js');
router.use('/', feedback_controllers)

const menu_controllers = require('./menu_controllers');
router.use('/', menu_controllers)

module.exports = router;