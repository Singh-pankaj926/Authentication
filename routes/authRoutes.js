const express = require('express');
const router = express.Router();
const validators = require('../middlewares/validators');
const { registerNewUser, userLoginVerification, getAllUser, getSingleUser, updateUser, deleteUser } =  require('../controller/service/userCtrl');

// registering the new user
router.post(`/register`, (req, res) => registerNewUser(req, res));

// verifying credentials when user is trying to login
router.get('/login', (req, res) => userLoginVerification(req, res));

// get all user
router.get('/fetchAll', (req, res) => getAllUser(req, res));

// get single user
router.get('/fetchSingle', (req, res) => getSingleUser(req, res));

// update user details
router.get('/update', (req, res) => updateUser(req, res));

// deleting the user
router.delete(`/delete`, (req, res) => deleteUser(req, res));

module.exports = router;