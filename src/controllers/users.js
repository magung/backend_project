'use strict';
const modelUsers = require('../models/users')
const response = require('../res')
const moment = require('moment')
require('dotenv').config();

const isFormFalid = (data)=>{
    const Joi = require('@hapi/joi')
    const schema = Joi.object().keys({
        name: Joi.string(),
        // username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string()
    })
    const result = Joi.validate(data, schema)
    if (result.error == null) return true
    else return false
}

const hash = (string) => {
    const crypto = require('crypto-js')
    return crypto.SHA256(string)
      .toString(crypto.enc.Hex)
}

const active = "active"
const inactive = "inactive"

module.exports = {

    // REGISTER user
    regUser: (req, res)=>{
        
        const data = {
            name : req.body.name,
            email : req.body.email,
            usr_status : active
            //password : req.body.password,
        }
        const password = hash(req.body.password);

        if(!isFormFalid(data)){
            return response.dataManipulation(res, 200, "Data not valid")
        }
        modelUsers.register(data, password)
        .then(result=>{
            data.id = result.id
            return response.dataManipulation(res, 200, "Success register user", data)
        })
        .catch(err=>{
            console.log(err)
            return response.dataManipulation(res, 201, "Failed register, email already exist")
        })
        
        
        // modelUsers.userReady(data.username)
        // .then(result =>{
        //     console.log('username already')
        //     return response.dataManipulation(res, 201, "email or username already exists")
        // })
        // .catch(err => {
            
        // })

        
    },
    // REGISTER for admin
    // regAdmin: (req, res)=>{
    //     const data = {
    //         name : req.body.name,
    //         username : req.body.username,
    //         email : req.body.email,
    //         //password : req.body.password,
    //         level: 'admin'
    //     }
    //     const password = hash(req.body.password);
    //     //data.password = hash(data.password)

    //     if(!isFormFalid(data)){
    //         return response.dataManipulation(res, 200, "Data not valid")
    //     }

    //     modelUsers.register(data, password)
    //     .then(result=>{
    //         data.id = result.id
    //         return response.dataManipulation(res, 200, "Success register admin", data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         return response.dataManipulation(res, 201, "Failed register, username or email already exist")
    //     })
    // },

    // READ - get all users
    
    // allUsers:(req, res)=>{
    //     modelUsers.allUsers()
    //     .then(result=>res.json(result))
    //     .catch(err=>console.log(err))
    // },

    allUsers:(req, res)=>{
        const sortBy = req.query.sort_by || 'user_id';
		const sort = req.query.sort || 'ASC';
		const limit = parseInt(req.query.limit) || 10;
        const page = req.query.page || 1;
        const skip = (parseInt(page)-1)* limit;
        const search = req.query.search;
        let total
        modelUsers.totalData(search)
        .then(result => {
             total = result
        })
        .catch(err => console.log(err) );
        // let total_row = total.total
        // let totalPage = total_row
        modelUsers.allUsers(search, sortBy, sort, skip, limit, total)
        .then(result => {
            if(result.length !== 0) {
                let total_row = total[0].total
                let totalPage = Math.ceil(total_row / limit)
                return response.getDataWithTotals(res, 200, result, limit, page, totalPage, total_row)
            } else {
                return response.getDataResponse(res, 404, null, null, null, "Data not Found")
            }
        })
        .catch(err =>{
            return response.dataManipulation(res, 500, "Failed get all user")
        })
        
    },

    getUser: (req, res) => {
        let where = ' AND user_id = ? '
        let data = [req.user_id]
        modelUsers.getUser(where, data)
        .then(result => {
            return response.getDataWithTotals(res, 200, result)
        })
        .catch(err => {
            console.log(err)
            return response.dataManipulation(res, 500, "Failed get user")
        })
    },

    //LOGIN
    loginUser: (req, res)=>{
        const email = req.body.email;
        const password = hash(req.body.password);

        let where = ' AND email = ? AND password = ? '
        let data = [email, password]
        modelUsers.getUser(where, data)
        .then(result=>{
            if(result.length !== 0){
                const jwt =require('jsonwebtoken')
                const load = {
                    user_id: result[0].user_id,
                    username: result[0].username,
                    email: result[0].email
                }
                jwt.sign(load, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXP}, (err, token)=>{
                    if(!err){
                        res.json({
                            dataUser:load,
                            token: `${token}`})
                    }else{
                        console.log(err)
                        return response.dataManipulation(res, 201, "Failed Login user bacause jwt with user-id " + load.user_id)
                    }
                })

                
            } else {
                return response.dataManipulation(res, 400, "Email or password wrong")
            }
            // if(result.length !== 0){
            //     if(result[0].password == password){
            //         const jwt =require('jsonwebtoken')
            //         const load = {
            //             userId: result[0].id,
            //             username: result[0].username,
            //             email: result[0].email,
            //             level: result[0].level
            //         }
    
            //         jwt.sign(load, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXP}, (err, token)=>{
            //             if(!err){
            //                 res.json({
            //                     dataUser:load,
            //                     token: `${token}`})
            //             }else{console.log(err)}
            //         })

            //     }else{
            //         return response.dataManipulation(res, 400, "Email and Password doesnt match")
            //     }
            // }else{
            //     return response.dataManipulation(res, 400, "Email doesnt exist")
            // }

        })
        .catch(err=>{
            console.log(err)
            return response.dataManipulation(res, 500, "Failed Login user")
        })
    },

    //UPDATE
    updateUser: async (req, res)=>{
        const id = req.user_id
        const data={
            updated_date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if(req.body.name) {
            data.name = req.body.name
        }
        let update = true
        if(req.body.username) {
            let where = ' AND username = ? '
            let username = req.body.username
            await modelUsers.getUser(where, [username])
            .then(result=>{
                if(result.length > 0){
                    update = false
                    return response.dataManipulation(res, 200, "username already exist")
                }
            })
            .catch(err=>console.log(err))
            data.username = username
        }
        if(req.body.email) {
            let where = ' AND email = ? '
            let email = req.body.email
            await modelUsers.getUser(where, [email])
            .then(result=>{
                if(result.length > 0){
                    update = false
                    return response.dataManipulation(res, 200, "Email already exist")
                }
            })
            .catch(err=>console.log(err))
            data.email = email
        }
        if(req.body.status) {
            data.usr_status = req.body.status
        }
        if(req.body.image) {
            data.image = req.body.image
        }
        if(req.body.password) {
            const password = hash(req.body.password);
            data.password = password
        }
        if(update) {
            await modelUsers.updateUser(data, id)
            .then(result=> {
                if(result.affectedRows !== 0) {
                    return response.dataManipulation(res, 200, "Succes updating user")
                }
                else {
                    return response.dataManipulation(res, 201, "Failed to update user")
                }
            })
            .catch(err=>{
                console.log(err)
                return response.dataManipulation(res, 500, "Failed to update user")
            })
        }
        
    },

    //DELETE user
    deleteUser:(req, res)=>{
        const id = req.params.id
        modelUsers.deleteUser(id)
        .then(result=> {
            result.id = id
            if(result.affectedRows !== 0) return response.dataManipulation(res, 200, "Success deleting user")
            else return response.dataManipulation(res, 404, "Failed to delete user or Not Found")
        })
        .catch(err=>{
            console.log(err)
            return response.dataManipulation(res, 500, err)
        })
    }
}