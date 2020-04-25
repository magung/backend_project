'use strict';
const connection = require('../database/conn');

module.exports = {
    insertType: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO type set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allType: () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT type_id, type FROM type"
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getType: (type_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT type_id, type FROM type WHERE type_id = ? "
            connection.query( sql, [type_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteType: (type_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM type WHERE type_id = ? "
            connection.query( sql, [type_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateType: (data, type_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE type set ? WHERE type_id = ?`, [data, type_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
