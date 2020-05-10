'use strict';
var response = require('../res');
var modelSprint = require('../models/sprint');
const moment = require('moment');
module.exports = {
	
	//CREATE
	insertSprint: async (req, res) => {
		let data = {
			pr_id : parseInt(req.body.pr_id),
			sp_name : req.body.sprint_name,
			sp_description : req.body.description,
			sp_owner : req.user_id
		}

		await modelSprint.insertSprint(data)
		.then(result => {
			data.sp_id = result.insertId
			return response.dataManipulation(res, 200, "Success create sprint", data)
		})
		.catch(err=>{
			console.log(err)
            return response.dataManipulation(res, 500, "Failed create sprint")
        })
	},
	
	insertMembersSprint: async (req, res) => {
		let sp_id = req.params.sp_id
		if(sp_id <= 0) {
			return response.dataManipulation(res, 201, "Sprint Id is required")
		}
		let users_id = req.body.user_id
		users_id.push(req.user_id)
		let data_sp_user = []
		for (let key = 0; key <  users_id.length; key++)
		{
			let user_id = users_id[key]
			let data = {
				sp_id : parseInt(req.params.sp_id),
				user_id : parseInt(user_id)
			}

			await modelSprint.insertMembersSprint(data)
			.then(result => {
				data.sp_user_id = result.insertId
				data_sp_user.push(data)
			})
			.catch(err=>{
				return response.dataManipulation(res, 201, "Failed create sprint with user_id = " + user_id)
			})
			
		}
		if (data_sp_user.length > 0){
			return response.dataManipulation(res, 200, "Success create sprint", data_sp_user)
		}
	},

	updateMembersSprint: async (req, res, next) => {
		try {
			let sp_id = req.params.sp_id
			if(sp_id <= 0) {
				return response.dataManipulation(res, 201, "Sprint Id is required")
			}
			let del = await modelSprint.deleteMembersSprint(sp_id)
			let users_id = req.body.user_id
			users_id.push(req.user_id)
			let data_sp_user = []
			for (let key = 0; key <  users_id.length; key++)
			{
				let user_id = users_id[key]
				let data = {
					sp_id : parseInt(req.params.sp_id),
					user_id : parseInt(user_id)
				}

				await modelSprint.insertMembersSprint(data)
				.then(result => {
					data.sp_user_id = result.insertId
					data_sp_user.push(data)
				})
				.catch(err=>{
					return response.dataManipulation(res, 201, "Failed update sprint with user_id = " + user_id)
				})
				
			}
			if (data_sp_user.length > 0){
				return response.dataManipulation(res, 200, "Success update sprint", data_sp_user)
			}
		} catch(e) {
			next(e)
		}
	},

	deleteMembersSprint: async (req, res, next) => {
		try {
			let sp_id = req.params.sp_id
			if(sp_id <= 0) {
				return response.dataManipulation(res, 201, "Sprint Id is required")
			}
			await modelSprint.deleteMembersSprint(sp_id)
			.then(result => {
				console.log(result)
				if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete sprint")
				}else{
					return response.dataManipulation(res, 201, "Failed delete sprint")
				}
			})
			.catch(err=>{
				return response.dataManipulation(res, 500, "Failed delete sprint")
			})
		} catch(e) {
			next(e)
		}
	},

	allSprints: async (req, res) => {
		let user_id = req.user_id
		let where = ' AND su.user_id = ? GROUP BY su.sp_id '
		let data = [user_id]
		await modelSprint.getAllSprint(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get all sprint", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get all sprint")
		})
	},

	getSprintProject: async (req, res) => {
		let user_id = req.user_id
		let where = ' AND sp.pr_id = ? AND pr.user_id = ? GROUP BY sp.sp_id '
		let pr_id = req.params.pr_id
		let data = [pr_id, user_id]
		await modelSprint.getSprint(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get sprint on project id = " + pr_id, result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get all sprint")
		})
	},

	getSprint: async (req, res) => {
		let sp_id = parseInt(req.params.sp_id)
		let where = ' AND sp_id = ? LIMIT 1 '
		let data = [sp_id]
		await modelSprint.getSprint(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get sprint", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get sprint")
		})
	},

	updateSprint: async (req, res) => {
		let user_id = req.user_id
		let sp_id = parseInt(req.params.sp_id)
		let data = {
			updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
		}
		if(req.body.sp_name) {
			data.sp_name = req.body.sp_name
		}
		if(req.body.description) {
			data.sp_description = req.body.description
		}
		await modelSprint.updateSprint(data, sp_id, user_id)
		.then(result => {
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes updating sprint")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to update sprint")
			}
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed update sprint")
		})
	},

	deleteSprint: async (req, res) => {
		let user_id = req.user_id
		let sp_id = parseInt(req.params.sp_id)
		await modelSprint.deleteSprint(sp_id, user_id)
		.then(result => {
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes delete sprint")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to delete sprint")
			}
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed delete sprint")
		})
	},

	getMembersSprint: async (req, res) => {
		let sp_id = parseInt(req.params.sp_id)
		let where = ' AND su.sp_id = ? GROUP BY su.user_id'
		let data = [sp_id]
		await modelSprint.getMembersSprint(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get members sprint", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get members sprint")
		})
	}
    
}
