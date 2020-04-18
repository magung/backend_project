'use strict';
const connection = require('../database/conn')

module.exports = {
    register: (data, password)=>{
        return new Promise((resolve, reject)=>{
            //validation for email or username if already exist
            let regis = `INSERT INTO user SET ? , password = ?`;
            let qemail = `SELECT user_id FROM user WHERE email = ?`;

            connection.query(qemail, data.email, (err, result)=>{
                if (result.length > 0) {
                    reject(err),
                    console.log(err)
                } else {
                    connection.query(regis, [data, password], (err, result)=>{
                        if (!err) {
                            resolve(result)
                        } else {
                            reject(err)
                        }
                    })
                }
            })
            
        })
    },
   
    loginUser:(email, password)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT user_id, name, email, username FROM user WHERE email = ? AND password = ?`, [email, password], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    getUser:(where, data)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT usr.user_id, usr.name, usr.email, usr.username, usr.usr_level_id, usr_lvl.level, usr.image FROM user usr LEFT JOIN user_level usr_lvl ON usr_lvl.usr_level_id = usr.usr_level_id WHERE 1=1` + where, data, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    //READ - get all data users
    allUsers: (search, sortBy, sort, skip, limit, user_id) =>{
        return new Promise((resolve, reject) =>{
            let query = `SELECT user_id, name, email, username, usr_status, usr_level_id FROM user WHERE 1=1 ` ;
            if(search){
               query += ` AND name LIKE "%${search}%" or email LIKE "%${search}%" `
            }
            query += ` AND usr_status = "active" AND user_id <> '${user_id}' ORDER BY ${sortBy} ${sort} LIMIT ${skip}, ${limit}`;
            connection.query(query, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    // get total data in database
    totalData: (search, user_id) => {
        return new Promise((resolve, reject) =>{
            let query = `SELECT COUNT(user_id) as 'total' FROM user WHERE usr_status = 'active' AND user_id <> '${user_id}'`
            if(search){
                query +=  ` AND name LIKE "%${search}%" or email LIKE "%${search}%" `
            }
            connection.query(query, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    updateUser:(data, id)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE user set ? WHERE user_id = ? `, [data, id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteUser:(id)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM user WHERE user_id = ?`, id, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }
}