const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

router.post("/", resetPasswordController.resetpassword);

module.exports = router;