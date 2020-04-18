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
            connection.query(`SELECT sp.sp_id, sp.sp_name, sp.pr_id, sp.sp_description, sp.sp_owner FROM sprint sp JOIN project_user pr ON pr.pr_id = sp.pr_id WHERE 1=1 ` + where, data, (err, result) => {
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