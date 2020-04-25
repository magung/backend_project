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

    getTask: (where = "", data = [], order = "") => {
        return new Promise((resolve, reject) =>{
            let sql = "SELECT ts.*, " + 
                        " usr.name as req_by, us.name as owned_by, " + 
                        " lb.label_name as label, ty.type as type, pri.priority_name as priority, sts.status as status " + 
                        " FROM task ts INNER JOIN user usr ON usr.user_id = ts.req_by " +
                        " INNER JOIN user us ON us.user_id = ts.owned_by " +
                        " INNER JOIN type ty ON ty.type_id = ts.type_id " +
                        " INNER JOIN label lb ON lb.label_id = ts.label_id " + 
                        " INNER JOIN priority pri ON pri.priority_id = ts.priority_id " + 
                        " INNER JOIN status sts ON sts.status_id = ts.status_id " + 
                        " WHERE 1=1 " + where + order
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