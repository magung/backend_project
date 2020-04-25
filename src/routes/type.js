'use strict';
const express = require('express')
const Route = express.Router();

var Controller = require('../controllers/type')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, Controller.allType)
 .get('/:type_id', Auth.verifyToken, Controller.getType)
 .post('/', Auth.verifyToken, Controller.insertType)
 .delete('/:type_id',Auth.verifyToken, Controller.deleteType)
 .put('/:type_id',Auth.verifyToken, Controller.updateType)
 module.exports = Route