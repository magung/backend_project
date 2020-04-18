'use strict';
const express = require('express')
const Route = express.Router();

var taskController = require('../controllers/task')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', taskController.getAllTasks)
 .get('/:ts_id', taskController.getTaskById)
 .get('/sprint/:sp_id', taskController.getSprintTask)
 .post('/', Auth.verifyToken, taskController.insertTask)
 .put('/:ts_id', Auth.verifyToken, taskController.updateTask)
 .delete('/:task_id', Auth.verifyToken, taskController.deleteTask)


 module.exports = Route