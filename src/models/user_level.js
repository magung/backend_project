'use strict';
const connection = require('../database/conn');

module.exports = {
    insertLevel: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO user_level set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allLevel: () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT usr_level_id, level FROM user_level"
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getLevel: (usr_level_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT usr_level_id, level FROM user_level WHERE usr_level_id = ? "
            connection.query( sql, [usr_level_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteLevel: (usr_level_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM user_level WHERE usr_level_id = ? "
            connection.query( sql, [usr_level_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateLevel: (data, usr_level_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE user_level set ? WHERE usr_level_id = ?`, [data, usr_level_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
