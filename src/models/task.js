'use strict';
const connection = require('../database/conn')

module.exports = {

    //CREATE
    insertTask: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO task set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getTask: (where, data, order = "") => {
        return new Promise((resolve, reject) =>{
            let sql = "SELECT ts.task_id, ts.pr_id, ts.sp_id, ts.title, " + 
                        "ts.task_desc, usr.name as req_by, us.name as owned_by, " + 
                        "lb.label as label, ty.type as type, ts.priority, ts.duration " + 
                        "FROM task ts JOIN user usr ON usr.user_id = ts.req_by " +
                        "JOIN user us ON us.user_id = ts.owned_by " +
                        "JOIN type ty ON ty.type_id = ts.type_id " +
                        "JOIN label lb ON lb.label_id = ts.label_id WHERE 1=1 " + where + order
            connection.query(sql, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateTask: (data, ts_id) => {
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE task set ? WHERE task_id = ?`, [data, ts_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteTask: (task_id) => {
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM task WHERE task_id = ? `, [task_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }

    
}