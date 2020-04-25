'use strict';
var response = require('../res');
var modelStatus = require('../models/status');
const moment = require('moment');
module.exports = {
	
	insertStatus: async (req, res, next) => {
        try{
            let data = {
                status : req.body.status
            }
    
            await modelStatus.insertStatus(data)
            .then(result => {
                data.status_id = result.insertId
                return response.dataManipulation(res, 200, "Success create status", data)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed create status")
            })
        } catch(e) {
            next(e)
        }
    },

    allStatus: async (req, res, next) => {
        try{
            await modelStatus.allStatus()
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all status", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all status")
            })
        } catch(e) {
            next(e)
        }
    },

    getStatus: async (req, res, next) => {
        try{
            let status_id = req.params.status_id
            await modelStatus.getStatus(status_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get status", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get status")
            })
        } catch(e) {
            next(e)
        }
    },

    deleteStatus: async (req, res, next) => {
        try{
            let status_id = req.params.status_id
            await modelStatus.deleteStatus(status_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete status")
				}else{
					return response.dataManipulation(res, 201, "Failed delete status")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed delete status")
            })
        } catch(e) {
            next(e)
        }
    },

    updateStatus: async (req, res, next) => {
        try{
            let status_id = req.params.status_id
            let data = {
                status : req.body.status,
                updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await modelStatus.updateStatus(data, status_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update status", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update status")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed update status")
            })
        } catch(e) {
            next(e)
        }
    }
    
}
