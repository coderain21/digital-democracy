const express = require('express');
const router = express.Router();
const recaptchaController = require('../controllers/recaptchaController');

router.post("/", recaptchaController.recaptcha);

module.exports = router;
