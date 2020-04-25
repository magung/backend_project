'use strict';
const express = require('express')
const Route = express.Router();

var Controller = require('../controllers/user_level')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Controller.allLevel)
 .get('/:usr_level_id', Controller.getLevel)
 .post('/', Controller.insertLevel)
 .delete('/:usr_level_id', Controller.deleteLevel)
 .put('/:usr_level_id', Controller.updateLevel)
 module.exports = Route