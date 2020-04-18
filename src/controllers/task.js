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
            req_by : req.body.req_by,
            owned_by : req.body.owned_by,
            label_id : req.body.label_id,
            type_id : req.body.type_id,
            priority : req.body.priority,
            duration : req.body.duration,
			created_by : req.user_id
		}

		await modelTask.insertTask(data)
		.then(result => {
			data.sp_id = result.insertId
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

		modelTask.getTask(where, data)
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
		let where = " AND ts.task_id = ?"
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
				data.req_by = req.body.req_by
			}
			if(req.body.owned_by) {
				data.owned_by = req.body.owned_by
			}
			if(req.body.label_id) {
				data.label_id = req.body.label_id
			}
			if(req.body.type_id) {
				data.type_id = req.body.type_id
			}
			if(req.body.priority) {
				data.priority = req.body.priority
			}
			if(req.body.duration) {
				data.duration = req.body.duration
			}
			let result = await modelTask.updateTask(data, ts_id)
			console.log(result)

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
			let sp_id = req.params.sp_id
			let title = req.query.title.toLowerCase()
			console.log(title)
			let where = " AND sp_id = ?"
			if(req.query.title){
				where += ` AND ts.title LIKE "%` + title + `%" `
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
