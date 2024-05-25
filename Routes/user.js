const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User')
// route to User fetch the details by ID
router.get('/details/:id', UserController.getUserDetailsById)

// route to fetch the user list
router.get('/list', UserController.getUserList)

// route to edit the user details
router.put('/edit', UserController.editUserDetails)

// route to fetch dashboard data
router.post('/dashboard', UserController.getDashboardData)

module.exports = router