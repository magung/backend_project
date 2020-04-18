'use strict';
const connection = require('../database/conn');

module.exports = {
    insertReport: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO report set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    totalData: (search) => {
        return new Promise((resolve, reject) =>{
            let query = "SELECT COUNT(rp_id) as 'total' FROM report "
            if(search){
                query +=  ` AND report LIKE "%${search}%" `
            }
            connection.query(query, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getReport: (where) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT rp.rp_id, rp.report, rp.user_id, usr.name, pr.pr_name, sp.sp_name " +
                        " FROM report rp " +
                        " JOIN user usr ON usr.user_id = rp.user_id " +
                        " JOIN project pr ON pr.pr_id = rp.pr_id " +
                        " JOIN sprint sp ON sp.sp_id = rp.sp_id " +
                        " WHERE 1=1" + where
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getReportById: (rp_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT rp_id, user_id, sp_id, pr_id, report FROM report WHERE rp_id = ? "
            connection.query( sql, [rp_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteReport: (rp_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM report WHERE rp_id = ? "
            connection.query( sql, [rp_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateReport: (data, rp_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE report set ? WHERE rp_id = ?`, [data, rp_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
