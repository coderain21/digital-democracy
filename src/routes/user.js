const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/all/', userController.getAllUsers)

// update one user
router.put('/', userController.updateUser)

router.get('/', userController.getUser)

module.exports = router;
  