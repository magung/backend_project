'use strict';
const express = require('express')
const Route = express.Router();

var projectController = require('../controllers/project')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, projectController.allProjects)
 .get('/:pr_id', Auth.verifyToken, projectController.getProject)
 .get('/members/:pr_id', Auth.verifyToken, projectController.getMembersProject)
 .post('/', Auth.verifyToken, projectController.insertProject)
 .post('/members/:pr_id', Auth.verifyToken, projectController.insertMembersProject)
 .delete('/:pr_id',Auth.verifyToken, projectController.deleteProject)
 .put('/:pr_id',Auth.verifyToken, projectController.updateProject)

 module.exports = Route