'use strict';
var response = require('../res');
var modelPriority = require('../models/priority');
const moment = require('moment');
module.exports = {
	
	insertPriority: async (req, res, next) => {
        try{
            let data = {
                priority_name : req.body.priority
            }
    
            await modelPriority.insertPriority(data)
            .then(result => {
                data.priority_id = result.insertId
                return response.dataManipulation(res, 200, "Success create priority", data)
            })
            .catch(err=>{
                return response.dataManipulation(res, 500, "Failed create priority")
            })
        } catch(e) {
            next(e)
        }
    },

    allPriorities: async (req, res, next) => {
        try{
            await modelPriority.allPriorities()
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all priorities", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all priorities")
            })
        } catch(e) {
            next(e)
        }
    },

    getPriority: async (req, res, next) => {
        try{
            let priority_id = req.params.priority_id
            await modelPriority.getPriority(priority_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get priority", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get priority")
            })
        } catch(e) {
            next(e)
        }
    },

    deletePriority: async (req, res, next) => {
        try{
            let priority_id = req.params.priority_id
            await modelPriority.deletePriority(priority_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete priority")
				}else{
					return response.dataManipulation(res, 201, "Failed delete priority")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed delete priority")
            })
        } catch(e) {
            next(e)
        }
    },

    updatePriority: async (req, res, next) => {
        try{
            let priority_id = req.params.priority_id
            let data = {
                priority_name : req.body.priority,
                updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await modelPriority.updatePriority(data, priority_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update priority", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update priority")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed update priority")
            })
        } catch(e) {
            next(e)
        }
    }
    
}
