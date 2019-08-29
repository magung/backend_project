require('dotenv').config()
var express =require('express');
var cors = require('cors');
var app = express();
var bodyParser=require('body-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')

var port = process.env.SERVER_PORT || 5000;


//ALLOWED CORS
app.use(cors());
// var allowedOrigins = ['http://localhost:3000',
//                       'http://yourapp.com'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes/routes');
var routeProducts =require('./src/routes/products');
var routeCategories= require('./src/routes/categories');
var routeUsers = require('./src/routes/users');
//url

app.use('/products', routeProducts);
app.use('/categories', routeCategories);
app.use('/user', routeUsers);
app.use('/', routes);

app.post('/login', (req, res) =>{
    const user = {
        id : 1,
        username: 'agung',
        email: 'agung@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err,token) => {
        res.json({
            token
        })
    });
})



app.listen(port);
console.log("Started on server http://localhost:"+port);

const Joi = require('@hapi/joi');
 
// const schema = {
//     a: Joi.string()
// };
// const result = Joi.validate({ a: "3" }, schema)
// if (result.error == null) return console.log("valid")
// else return console.log("invalid")
 
// Joi.validate({ a: 3 }, schema, function (error, value) { 
//     if(!error){
//         console.log("valid")
//         console.log(value)
//     }else{
//         console.log("invalid")
//     }
// });