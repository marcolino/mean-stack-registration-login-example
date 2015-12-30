//require('rootpath')();
var express = require('express');
var app = module.exports = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
//var config = require('../config.json');
var config = require('./config');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./login.controller'));
app.use('/register', require('./register.controller'));
app.use('/app', require('./app.controller'));
app.use('/api/users', require('./api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});