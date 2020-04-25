'use strict';
const connection = require('../database/conn');

module.exports = {
    insertPriority: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO priority set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allPriorities: () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT priority_id, priority_name FROM priority"
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getPriority: (priority_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT priority_id, priority_name FROM priority WHERE priority_id = ? "
            connection.query( sql, [priority_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deletePriority: (priority_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM priority WHERE priority_id = ? "
            connection.query( sql, [priority_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updatePriority: (data, priority_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE priority set ? WHERE priority_id = ?`, [data, priority_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
