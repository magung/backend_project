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
	}
    
}
