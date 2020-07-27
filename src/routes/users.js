'use strict';
const express = require('express')
const Route = express.Router();
const multer = require('multer');
const moment = require('moment');
const app = require('../../app')


var usersController = require('../controllers/users')
var Auth = require('../helpers/auth')

//Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/user_image')
    },
    filename: function(req, file, cb){
        cb(null, "profile" + moment().format('YYYY-MM-DD HH:mm:ss') + file.originalname)
    }
});
const upload = multer({storage})

Route
.post('/register', usersController.regUser)
// .post('/register/admin', Auth.verifyToken, Auth.verifyAdmin, usersController.regAdmin)
.post('/login', usersController.loginUser)
// .get('/', Auth.verifyToken, usersController.allUsers)
.get('/', usersController.allUsers)
.get('/image/:name', (req, res) => {
    res.sendFile(app.rootPath + '/uploads/user_image/' + req.params.name)
})
.get('/profile', Auth.verifyToken, usersController.getProfile)
.get('/data/:user_id', Auth.verifyToken, usersController.getUser)
.put('/', Auth.verifyToken, usersController.updateUser)
.put('/photo/:user_id', upload.single('image'), usersController.updatePhotoUser)

// .put('/photo/:user_id', usersController.updatePhotoUser)
.delete('/:id', Auth.verifyToken, usersController.deleteUser)
 module.exports = Route