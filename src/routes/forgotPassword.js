const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

router.post("/", forgotPasswordController.forgotpassword);

module.exports = router;