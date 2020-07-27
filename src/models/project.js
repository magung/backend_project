'use strict';
const connection = require('../database/conn')

module.exports = {

    //CREATE
    insertProject: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO project set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    insertMembersProject: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO project_user set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteMembersProject: (pr_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`DELETE FROM project_user WHERE pr_id = ?`, [pr_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getAllProject: (where, data, order = " ORDER BY pr.pr_name ASC ") => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT pu.*, pr.*, usr.name as pr_owner_name, usr.image FROM project pr JOIN project_user pu ON pr.pr_id = pu.pr_id JOIN user usr ON pr.pr_owner = usr.user_id WHERE 1=1 ` + 
            where + order, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateProject:(data, pr_id, pr_owner)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE project set ? WHERE pr_id = ? AND pr_owner = ? `, [data, pr_id, pr_owner], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteProject:(pr_id, pr_owner)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM project WHERE pr_id = ? AND pr_owner = ? `, [pr_id, pr_owner], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getMembersProject:(where, data, order = " ORDER BY usr.usr_level_id") => {
        return new Promise((resolve, reject) => {
            let query = `SELECT pu.pr_user_id, pu.user_id, usr.name, usr.email, usr.username, usr.usr_level_id, usr_lvl.level, usr.image FROM project_user pu 
                        JOIN user usr ON usr.user_id = pu.user_id 
                        JOIN user_level usr_lvl ON usr_lvl.usr_level_id = usr.usr_level_id
                        WHERE 1=1 `
            connection.query( query + where + order, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }

}