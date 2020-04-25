'use strict';
var response = require('../res');
var modelLevel = require('../models/user_level');
const moment = require('moment');
module.exports = {
	
	insertLevel: async (req, res, next) => {
        try{
            let data = {
                level : req.body.level
            }
    
            await modelLevel.insertLevel(data)
            .then(result => {
                data.usr_level_id = result.insertId
                return response.dataManipulation(res, 200, "Success create level", data)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed create level")
            })
        } catch(e) {
            next(e)
        }
    },

    allLevel: async (req, res, next) => {
        try{
            await modelLevel.allLevel()
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all level", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all level")
            })
        } catch(e) {
            next(e)
        }
    },

    getLevel: async (req, res, next) => {
        try{
            let usr_level_id = req.params.usr_level_id
            await modelLevel.getLevel(usr_level_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get level", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get level")
            })
        } catch(e) {
            next(e)
        }
    },

    deleteLevel: async (req, res, next) => {
        try{
            let usr_level_id = req.params.usr_level_id
            await modelLevel.deleteLevel(usr_level_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete level")
				}else{
					return response.dataManipulation(res, 201, "Failed delete level")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed delete level")
            })
        } catch(e) {
            next(e)
        }
    },

    updateLevel: async (req, res, next) => {
        try{
            let usr_level_id = req.params.usr_level_id
            let data = {
                level : req.body.level,
                updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await modelLevel.updateLevel(data, usr_level_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update level", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update level")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed update level")
            })
        } catch(e) {
            next(e)
        }
    }
    
}
