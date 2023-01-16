const express = require('express');
const router = express.Router();
const politicianController = require('../../controllers/politicianController');

//Get ALL politicians from database
router.get('/', politicianController.getAllPoliticians)

//Get ONE politician from database based on full_name 
router.get('/:name', politicianController.getPolitician)

module.exports = router;
