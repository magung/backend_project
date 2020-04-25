require('dotenv').config()
var express =require('express');
var cors = require('cors');
var app = express();
var bodyParser=require('body-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')
app.use(cors());
var port = process.env.SERVER_PORT || 5000;

//ALLOWED CORS

// var allowedOrigins = ['http://localhost:3000',
//                       '192.168.43.135:3000'];
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

let path = './src/routes/'
var routes = require(path + 'routes');
var routeUsers = require(path + 'users');
var routeProject = require(path + 'project');
var routeSprint = require(path + 'sprint');
var routeTask = require(path + 'task');
var routeReport = require(path + 'report');
var routeLabel = require(path + 'label');
var routePriority = require(path + 'priority');
var routeType = require(path + 'type');
var routeStatus = require(path + 'status');
var routeLevel = require(path + 'user_level');

app.use('/level', routeLevel)
app.use('/status', routeStatus)
app.use('/type', routeType)
app.use('/priority', routePriority)
app.use('/label', routeLabel)
app.use('/report', routeReport)
app.use('/task', routeTask);
app.use('/sprint', routeSprint);
app.use('/project', routeProject);
app.use('/user', routeUsers);
app.use('/', routes);


app.listen(port);
console.log("Started on server http://localhost:"+port);
