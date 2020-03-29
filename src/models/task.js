'use strict';
const connection = require('../database/conn')

module.exports = {

    //CREATE
    insertTask: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query(`INSERT INTO task set ?`, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }
}