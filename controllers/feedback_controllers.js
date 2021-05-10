const express = requires('express');
const router = express.Router();
const FeedbackService = require('../services/FeedbackService')

router.get('/feedback/getAll/:page', FeedbackService.getAll)

module.exports = router;