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

    getAllProject: (where, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT pu.pr_id, pr.pr_name FROM project_user pu JOIN project pr ON pr.pr_id = pu.pr_id WHERE 1=1 ` + where, data, (err, result) => {
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

    getMembersProject:(where, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT pu.user_id, usr.name, usr.email, usr.username FROM project_user pu JOIN user usr ON usr.user_id = pu.user_id WHERE 1=1 ` + where, data, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }

}