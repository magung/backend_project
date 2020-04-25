'use strict';
const express = require('express')
const Route = express.Router();

var Controller = require('../controllers/priority')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, Controller.allPriorities)
 .get('/:priority_id', Auth.verifyToken, Controller.getPriority)
 .post('/', Auth.verifyToken, Controller.insertPriority)
 .delete('/:priority_id',Auth.verifyToken, Controller.deletePriority)
 .put('/:priority_id',Auth.verifyToken, Controller.updatePriority)
 module.exports = Route