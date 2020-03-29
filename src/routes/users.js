'use strict';
const express = require('express')
const Route = express.Router();

var usersController = require('../controllers/users')
var Auth = require('../helpers/auth')

Route
.post('/register', usersController.regUser)
// .post('/register/admin', Auth.verifyToken, Auth.verifyAdmin, usersController.regAdmin)
.post('/login', usersController.loginUser)
.get('/', Auth.verifyToken, usersController.allUsers)
.get('/profile', Auth.verifyToken, usersController.getUser)
.put('/', Auth.verifyToken, usersController.updateUser)
.delete('/:id', Auth.verifyToken, usersController.deleteUser)
 module.exports = Route