'use strict';
var response = require('../res');
var modelType = require('../models/type');
const moment = require('moment');
module.exports = {
	
	insertType: async (req, res, next) => {
        try{
            let data = {
                type : req.body.type
            }
    
            await modelType.insertType(data)
            .then(result => {
                data.type_id = result.insertId
                return response.dataManipulation(res, 200, "Success create type", data)
            })
            .catch(err=>{
                return response.dataManipulation(res, 500, "Failed create type")
            })
        } catch(e) {
            next(e)
        }
    },

    allType: async (req, res, next) => {
        try{
            await modelType.allType()
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all type", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all type")
            })
        } catch(e) {
            next(e)
        }
    },

    getType: async (req, res, next) => {
        try{
            let type_id = req.params.type_id
            await modelType.getType(type_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get type", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get type")
            })
        } catch(e) {
            next(e)
        }
    },

    deleteType: async (req, res, next) => {
        try{
            let type_id = req.params.type_id
            await modelType.deleteType(type_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete type")
				}else{
					return response.dataManipulation(res, 201, "Failed delete type")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed delete type")
            })
        } catch(e) {
            next(e)
        }
    },

    updateType: async (req, res, next) => {
        try{
            let type_id = req.params.type_id
            let data = {
                type : req.body.type,
                updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await modelType.updateType(data, type_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update type", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update type")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed update type")
            })
        } catch(e) {
            next(e)
        }
    }
    
}
