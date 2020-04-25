'use strict';
const connection = require('../database/conn');

module.exports = {
    insertLabel: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO label set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    allLabels: () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT label_id, label_name FROM label"
            connection.query( sql, (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getLabel: (label_id) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT label_id, label_name FROM label WHERE label_id = ? "
            connection.query( sql, [label_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteLabel: (label_id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM label WHERE label_id = ? "
            connection.query( sql, [label_id], (err, result) => {
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateLabel: (data, label_id) => {
        return new Promise((resolve, reject) =>{
            connection.query(`UPDATE label set ? WHERE label_id = ?`, [data, label_id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },
}
