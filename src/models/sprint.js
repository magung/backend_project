'use strict';
const connection = require('../database/conn')

module.exports = {

    //CREATE
    insertSprint: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO sprint set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    insertMembersSprint: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO sprint_user set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getSprint: (where, data) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT sp.*, usr.name, usr.usr_level_id, usr_lvl.level
                        FROM sprint sp 
                        JOIN project_user pr ON pr.pr_id = sp.pr_id 
                        JOIN user usr ON usr.user_id = sp.sp_owner
                        JOIN user_level usr_lvl ON usr_lvl.usr_level_id = usr.usr_level_id
                        WHERE 1=1 `
            connection.query(query + where, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allProgressSprints: (where = "", data = []) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT sp.*, usr.name as sp_owner_name, usr.image,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) as total_task, 
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 1) as task_ongoing,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 2) as task_onprocess,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 3) as task_done,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 4) as task_achived,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 5) as task_unachived,
                        (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 6) as task_deployed,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 1) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_ongoing,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 2) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_onprocess,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 3) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_done,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 4) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_achived,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 5) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_unachived,
                        ROUND( (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id AND status_id = 6) / (SELECT COUNT(sp_id) FROM task WHERE sp_id = sp.sp_id) * 100, 0) as p_deployed
                        FROM sprint sp JOIN project_user pr ON pr.pr_id = sp.pr_id JOIN user usr ON sp.sp_owner = usr.user_id WHERE 1=1`
            connection.query(sql + where, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getAllSprint: (where, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT su.sp_id, sp.sp_name, sp.pr_id, sp.sp_description, sp.sp_owner FROM sprint_user su JOIN sprint sp ON sp.sp_id = su.sp_id WHERE 1=1 ` + where, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateSprint:(data, sp_id, sp_owner)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE sprint set ? WHERE sp_id = ? AND sp_owner = ? `, [data, sp_id, sp_owner], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteSprint:(sp_id, sp_owner)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM sprint WHERE sp_id = ? AND sp_owner = ? `, [sp_id, sp_owner], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteMembersSprint:(sp_id)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM sprint_user WHERE sp_id = ? `, [sp_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getMembersSprint:(where, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT su.user_id, usr.name, usr.email, usr.username FROM sprint_user su JOIN user usr ON usr.user_id = su.user_id WHERE 1=1 ` + where, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }

}