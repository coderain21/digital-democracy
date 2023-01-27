const express = require('express');
const router = express.Router();
const googleLoginController = require('../controllers/googleLoginController')

router.post("/", googleLoginController.googleLogin);

module.exports = router;