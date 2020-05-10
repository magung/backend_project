'use strict';
var response = require('../res');
var modelTask = require('../models/task');
const moment = require('moment');
module.exports = {
	
	//CREATE
	insertTask: async (req, res) => {
		let data = {
            sp_id : parseInt(req.body.sp_id),
			pr_id : parseInt(req.body.pr_id),
			title : req.body.title,
            task_desc : req.body.task_desc,
            req_by : parseInt(req.body.req_by),
            owned_by : parseInt(req.body.owned_by),
            label_id : parseInt(req.body.label_id),
            type_id : parseInt(req.body.type_id),
			priority_id : parseInt(req.body.priority_id),
			status_id : parseInt(req.body.status_id),
            deadline :req.body.deadline,
			created_by : parseInt(req.user_id),
			created_date : moment().format('YYYY-MM-DD HH:mm:ss')
		}

		await modelTask.insertTask(data)
		.then(result => {
			data.task_id = result.insertId
			return response.dataManipulation(res, 200, "Success create task", data)
		})
		.catch(err=>{
			console.log(err)
            return response.dataManipulation(res, 500, "Failed create task")
        })
	},

	getAllTasks: async (req, res) => {
		let where = ""
		let data = []

		await modelTask.getTask(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get all task", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get all task")
		})
	},

	getTaskById: async (req, res) => {
		let ts_id = req.params.ts_id
		let where = " AND ts.task_id = ? "
		let data = [ts_id]

		modelTask.getTask(where, data)
		.then(result => {
			return response.dataManipulation(res, 200, "Success get task", result)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500, "Failed get task")
		})
	},

	updateTask: async (req, res, next) => {
		try {
			let ts_id = req.params.ts_id
			let user_id = req.user_id

			let data = {
				updated_by : user_id,
				updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
			}
			if(req.body.title) {
				data.title = req.body.title
			}
			if(req.body.task_desc) {
				data.task_desc = req.body.task_desc
			}
			if(req.body.req_by) {
				data.req_by = parseInt(req.body.req_by)
			}
			if(req.body.owned_by) {
				data.owned_by = parseInt(req.body.owned_by)
			}
			if(req.body.label_id) {
				data.label_id = parseInt(req.body.label_id)
			}
			if(req.body.type_id) {
				data.type_id = parseInt(req.body.type_id)
			}
			if(req.body.priority_id) {
				data.priority_id = parseInt(req.body.priority_id)
			}
			if(req.body.status_id) {
				data.status_id = parseInt(req.body.status_id)
			}
			if(req.body.deadline) {
				data.deadline = parseInt(req.body.deadline)
			}

			let result = await modelTask.updateTask(data, ts_id)
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes updating task")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to update task")
			}

		} catch (e) {
			console.log(e)
			next(e)
		}
	},

	deleteTask: async (req, res, next) => {
		try {
			let task_id = parseInt(req.params.task_id)
			let result = await modelTask.deleteTask(task_id)
			if(result.affectedRows !== 0) {
				return response.dataManipulation(res, 200, "Succes delete task")
			}
			else {
				return response.dataManipulation(res, 201, "Failed to delete task")
			}

		} catch (e) {
			console.log(e)
			next(e)
		}
	},

	getSprintTask: async (req, res, next) => {
		try {
			let sp_id = parseInt(req.params.sp_id)
			let title = req.query.title
			let owned_by = req.query.owned_by
			let where = " AND ts.sp_id = ?"
			if(title){
				title = title.toLowerCase()
				where += ` AND ts.title LIKE "%` + title + `%" `
			}
			if(owned_by){
				owned_by = owned_by.toLowerCase()
				where += ` AND ts.owned_by = ` + parseInt(owned_by)
			}
			where += " GROUP BY task_id "
			let data = [sp_id]
			let order = " ORDER by ts.created_date DESC"
			let result = await modelTask.getTask(where, data, order)
			if(result) {
				return response.dataManipulation(res, 200, "Success get tasks on sprint = " + sp_id, result)
			} else {
				return response.dataManipulation(res, 200, "Failed get tasks on sprint = " + sp_id)
			}

		} catch (e) {
			console.log(e)
			next(e)
		}
	}
    
}
