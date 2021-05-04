const express = require('express');
const router = express.Router();

const CollectionService = require('../services/CollectionService');
router.get('/getAll/:page', CollectionService.getAll);

router.get('/getById/(:id)', CollectionService.getById);

router.post('/insertDish', CollectionService.insertDish);

router.post('/removeDish', CollectionService.removeDish);

router.post('/editDish', CollectionService.changeDishInfo);

router.get('/searchDish', CollectionService.searchInfo);

module.exports = router;