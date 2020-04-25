'use strict';
const express = require('express')
const Route = express.Router();

var labelController = require('../controllers/label')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, labelController.allLabels)
 .get('/:label_id', Auth.verifyToken, labelController.getLabel)
 .post('/', Auth.verifyToken, labelController.insertLabel)
 .delete('/:label_id',Auth.verifyToken, labelController.deleteLabel)
 .put('/:label_id',Auth.verifyToken, labelController.updateLabel)
 module.exports = Route