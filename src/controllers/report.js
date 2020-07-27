'use strict';
var response = require('../res');
var modelReport = require('../models/report');
const moment = require('moment');
module.exports = {
	
	//CREATE
	insertReport: async (req, res, next) => {
        try{
            let data = {
                pr_id : req.body.pr_id,
                sp_id : req.body.sp_id,
                user_id : req.user_id,
                report: req.body.report
            }
    
            await modelReport.insertReport(data)
            .then(result => {
                data.rp_id = result.insertId
                return response.dataManipulation(res, 200, "Success create report", data)
            })
            .catch(err=>{
                return response.dataManipulation(res, 500, "Failed create report")
            })
        } catch(e) {
            next(e)
        }
    },
    
    allReports : async (req, res, next) => {
        try{
            const sortBy = req.query.sort_by || ' rp.created_date ';
            const sort = req.query.sort || ' DESC ';
            const limit = parseInt(req.query.limit) || 10;
            const page = req.query.page || 1;
            const skip = (parseInt(page)-1)* limit;
            const search = req.query.search;
            const pr_id = req.query.pr_id;
            let total

            modelReport.totalData(search)
            .then(result => {
                total = result[0].total
            })
            .catch(err => console.log(err) );
            let where = ""
            if (search) {
                where += ` AND report LIKE "%${search}%" ` 
            }
            if(pr_id){
                where += ` AND rp.pr_id = '${pr_id}'`
            }

            where += " ORDER BY " + sortBy + sort + " LIMIT " + skip + ", " + limit
            await modelReport.getReport(where)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get all report", result)
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get all report")
            })
        }catch(e){
            next(e)
        }
    },

    getReport: async (req, res, next) => {
        try {
            let rp_id = req.params.rp_id
            await modelReport.getReportById(rp_id)
            .then(result => {
                return response.dataManipulation(res, 200, "Success get report", result)
            }).catch(err=> {
                console.log(err)
                return response.dataManipulation(res, 500, "Failed get report")
            })
        }catch(e){
            next(e)
        }
    },

    deleteReport: async (req, res, next) => {
		try {
			let rp_id = req.params.rp_id
			if(rp_id <= 0) {
				return response.dataManipulation(res, 201, "Report Id is required")
			}
			await modelReport.deleteReport(rp_id)
			.then(result => {
				if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete report")
				}else{
					return response.dataManipulation(res, 201, "Failed delete report")
				}
			})
			.catch(err=>{
                console.log(err)
				return response.dataManipulation(res, 500, "Failed delete report")
			})
		} catch(e) {
			next(e)
		}
    },
    
    updateReport: async (req, res, next) => {
        try{
            let rp_id = req.params.rp_id
            if(rp_id <= 0) {
				return response.dataManipulation(res, 201, "Report Id is required")
            }
            let data = {}
            if(req.body.pr_id) {
                data.pr_id = req.body.pr_id
            }
            if(req.body.sp_id) {
                data.sp_id = req.body.sp_id
            }
            if(req.body.report) {
                data.report = req.body.report
            }
            await modelReport.updateReport(data, rp_id)
			.then(result => {
				if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success update report", data)
				}else{
					return response.dataManipulation(res, 201, "Failed update report")
				}
			})
			.catch(err=>{
                console.log(err)
				return response.dataManipulation(res, 500, "Failed update report")
			})
        }catch(e) {
            next(e)
        }
    }

    
    
}
