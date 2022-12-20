const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

// Get all users
router.get('/all/', userController.getAllUsers)

// update one user
router.put('/', userController.updateUser)

router.get('/', verifyJWT, userController.getUser)

module.exports = router;
  