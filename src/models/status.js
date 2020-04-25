'use strict';
const connection = require('../database/conn');

module.exports = {
    insertStatus: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO status set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allStatus: () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT status_id, status FROM status"
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getStatus: (status_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT status_id, status FROM status WHERE status_id = ? "
            connection.query( sql, [status_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteStatus: (status_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM status WHERE status_id = ? "
            connection.query( sql, [status_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateStatus: (data, status_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE status set ? WHERE status_id = ?`, [data, status_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
