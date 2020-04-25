'use strict';
var response = require('../res');
var modelLabel = require('../models/label');
const moment = require('moment');
module.exports = {
	
	insertLabel: async (req, res, next) => {
        try{
            let data = {
                label_name : req.body.label
            }
    
            await modelLabel.insertLabel(data)
            .then(result => {
                data.label_id = result.insertId
                return response.dataManipulation(res, 200, "Success create label", data)
            })
            .catch(err=>{
                return response.dataManipulation(res, 500, "Failed create label")
            })
        } catch(e) {
            next(e)
        }
    },

    allLabels: async (req, res, next) => {
        try{
            await modelLabel.allLabels()
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all label", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all label")
            })
        } catch(e) {
            next(e)
        }
    },

    getLabel: async (req, res, next) => {
        try{
            let label_id = req.params.label_id
            await modelLabel.getLabel(label_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get label", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get label")
            })
        } catch(e) {
            next(e)
        }
    },

    deleteLabel: async (req, res, next) => {
        try{
            let label_id = req.params.label_id
            await modelLabel.deleteLabel(label_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete label")
				}else{
					return response.dataManipulation(res, 201, "Failed delete label")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed delete label")
            })
        } catch(e) {
            next(e)
        }
    },

    updateLabel: async (req, res, next) => {
        try{
            let label_id = req.params.label_id
            let data = {
                label_name : req.body.label,
                updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await modelLabel.updateLabel(data, label_id)
            .then(result => {
                if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update label", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update label")
				}
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed update label")
            })
        } catch(e) {
            next(e)
        }
    }
    
}
