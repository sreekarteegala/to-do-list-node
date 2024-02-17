const express = require('express');
const router = express.Router();

// middleware for verifying token in headers
const { verifyToken } = require('../utils/token');

const taskRoutes = require('./task.routes');
const userRoutes = require('./users.routes');
const Users = require('../controllers/users.controller');

router.post('/login', Users.login);

router.use('/tasks', verifyToken, taskRoutes);

router.use('/users', verifyToken, userRoutes);


module.exports = router;