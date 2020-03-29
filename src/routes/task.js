'use strict';
const express = require('express')
const Route = express.Router();

var taskController = require('../controllers/task')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .post('/', Auth.verifyToken, taskController.insertTask)

 module.exports = Route