'use strict';
const express = require('express')
const Route = express.Router();

var sprintController = require('../controllers/sprint')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, sprintController.allSprints)
 .get('/:sp_id', Auth.verifyToken, sprintController.getSprint)
 .get('/members/:sp_id', Auth.verifyToken, sprintController.getMembersSprint)
 .get('/project/:pr_id', Auth.verifyToken, sprintController.getSprintProject)
 .post('/', Auth.verifyToken, sprintController.insertSprint)
 .post('/members/:sp_id', Auth.verifyToken, sprintController.insertMembersSprint)
 .delete('/:sp_id',Auth.verifyToken, sprintController.deleteSprint)
 .put('/:sp_id',Auth.verifyToken, sprintController.updateSprint)
 .put('/members/:sp_id', Auth.verifyToken, sprintController.updateMembersSprint)
 .delete('/members/:sp_id', Auth.verifyToken, sprintController.deleteMembersSprint)

 module.exports = Route