'use strict';
const express = require('express')
const Route = express.Router();

var reportController = require('../controllers/report')
const Auth = require('../helpers/auth')

Route
 // url pages and implementation routes
 .get('/', Auth.verifyToken, reportController.allReports)
 .get('/:rp_id', Auth.verifyToken, reportController.getReport)
 .post('/', Auth.verifyToken, reportController.insertReport)
 .delete('/:rp_id',Auth.verifyToken, reportController.deleteReport)
 .put('/:rp_id',Auth.verifyToken, reportController.updateReport)

 module.exports = Route