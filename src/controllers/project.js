'use strict';
var response = require('../res');
var modelProject = require('../models/project');
var modelSprint = require('../models/sprint');
const moment = require('moment');
module.exports = {
	
	//CREATE
	insertProject: async (req, res) => {
		let data = {
			pr_name : req.body.project_name,
			pr_description : req.body.description,
			deadline: req.body.deadline,
			pr_owner : req.user_id
		}

		await modelProject.insertProject(data)
		.then(result => {
			data.pr_id = result.insertId
			return response.dataManipulation(res, 200, "Success create project", data)
		})
		.catch(err=>{
            return response.dataManipulation(res, 500, "Failed create project")
        })
	},
	
	insertMembersProject: async (req, res) => {
		let pr_id = req.params.pr_id
		if(pr_id <= 0) {
			return response.dataManipulation(res, 201, "Project Id is required")
		}
		let users_id = req.body.user_id
		users_id.push(req.user_id)
		let data_pr_user = []
		for (let key = 0; key <  users_id.length; key++)
		{
			let user_id = users_id[key]
			let data = {
				pr_id : parseInt(req.params.pr_id),
				user_id : parseInt(user_id)
			}

			await modelProject.insertMembersProject(data)
			.then(result => {
				data.pr_user_id = result.insertId
				data_pr_user.push(data)
			})
			.catch(err=>{
				return response.dataManipulation(res, 201, "Failed create project with user_id = " + user_id)
			})
			
		}
		if (data_pr_user.length > 0){
			return response.dataManipulation(res, 200, "Success create project", data_pr_user)
		}
	},

	updateMembersProject: async (req, res, next) => {
		try {
			let pr_id = req.params.pr_id
			if(pr_id <= 0) {
				return response.dataManipulation(res, 201, "Project Id is required")
			}
			let del = await modelProject.deleteMembersProject(pr_id)
			let users_id = req.body.user_id
			users_id.push(req.user_id)
			let data_pr_user = []
			for (let key = 0; key <  users_id.length; key++)
			{
				let user_id = users_id[key]
				let data = {
					pr_id : parseInt(req.params.pr_id),
					user_id : parseInt(user_id)
				}

				await modelProject.insertMembersProject(data)
				.then(result => {
					data.pr_user_id = result.insertId
					data_pr_user.push(data)
				})
				.catch(err=>{
					return response.dataManipulation(res, 201, "Failed update project with user_id = " + user_id)
				})
				
			}
			if (data_pr_user.length > 0){
				return response.dataManipulation(res, 200, "Success update project", data_pr_user)
			}
		} catch(e) {
			next(e)
		}
	},

	deleteMembersProject: async (req, res, next) => {
		try {
			let pr_id = req.params.pr_id
			if(pr_id <= 0) {
				return response.dataManipulation(res, 201, "Project Id is required")
			}
			await modelProject.deleteMembersProject(pr_id)
			.then(result => {
				if(result.affectedRows > 0){
					return response.dataManipulation(res, 200, "Success delete project")
				}else{
					return response.dataManipulation(res, 201, "Failed delete project")
				}
			})
			.catch(err=>{
				return response.dataManipulation(res, 500, "Failed delete project")
			})
		} catch(e) {
			next(e)
		}
	},

	allProjects: async (req, res) => {
		let user_id = req.user_id
		let where = ' AND pu.user_id = ? OR pr.pr_owner = ? GROUP BY pu.pr_id '
		let data = [user_id, user_id]
		await modelProject.getAllProject(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get all project", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get all project")
		})
	},

	getProject: async (req, res) => {
		let user_id = req.user_id
		let pr_id = parseInt(req.params.pr_id)
		let where = ' AND pu.user_id = ? AND pu.pr_id = ? '
		let data = [user_id, pr_id]
		await modelProject.getAllProject(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get project", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get project")
		})
	},

	updateProject: async (req, res) => {
		let user_id = req.user_id
		let pr_id = parseInt(req.params.pr_id)
		let data = {
			updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
		}
		if(req.body.pr_name) {
			data.pr_name = req.body.pr_name
		}
		if(req.body.description) {
			data.pr_description = req.body.description
		}
		if(req.body.deadline) {
			data.deadline = req.body.deadline
		}
		await modelProject.updateProject(data, pr_id, user_id)
		.then(result => {
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes updating project")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to update project")
			}
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed update project")
		})
	},

	deleteProject: async (req, res) => {
		let user_id = req.user_id
		let pr_id = parseInt(req.params.pr_id)
		await modelProject.deleteProject(pr_id, user_id)
		.then(result => {
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes delete project")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to delete project")
			}
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed delete project")
		})
	},

	getMembersProject: async (req, res) => {
		let pr_id = parseInt(req.params.pr_id)
		let where = ' AND pu.pr_id = ? GROUP BY pu.user_id'
		let data = [pr_id]
		await modelProject.getMembersProject(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get members project", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get members project")
		})
	},

	getProgressProject: async (req, res) => {
		let user_id = req.user_id
		
		let where = ' AND pu.user_id = ? '
		let data = [user_id]
		if(req.query.pr_id) {
			where += ' AND pu.pr_id = ? '
			data.push(req.query.pr_id)
		}
		where += ' GROUP BY pu.pr_id '
		await modelProject.getAllProject(where, data)
		.then( async result => {
			let projects = []
			for(let i =0; i<result.length; i++) {
				let whereSprint = ' AND sp.pr_id = ? AND pr.user_id = ? GROUP BY sp.sp_id '
				
				let pr_id = result[i].pr_id
				let dataSprint = [pr_id, user_id]
				await modelSprint.allProgressSprints(whereSprint, dataSprint)
				.then(results => {
					result[i].sprints = results
				})
				.catch(err => {
					console.log(err)
				})

				let whereMember = ' AND pu.pr_id = ? GROUP BY pu.user_id'
				let dataMember = [pr_id]
				await modelProject.getMembersProject(whereMember, dataMember)
				.then(results => {
					result[i].members = results
				})
				.catch(err => {
					console.log(err)
				})

				projects.push(result[i])
			}
			return response.dataManipulation(res, 200, "Success get progress project", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed progress project")
		})
		
	}
    
}
