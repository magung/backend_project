'use strict';
const express = require('express')
const Route = express.Router();

var Controller = require('../controllers/status')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, Controller.allStatus)
 .get('/:status_id', Auth.verifyToken, Controller.getStatus)
 .post('/', Auth.verifyToken, Controller.insertStatus)
 .delete('/:status_id',Auth.verifyToken, Controller.deleteStatus)
 .put('/:status_id',Auth.verifyToken, Controller.updateStatus)
 module.exports = Route