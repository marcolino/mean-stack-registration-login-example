var config = require('./config');
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
console.log(req.body);
    request.post({
        url: 'http://localhost:3000/api' /*config.apiUrl*/ + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
console.error('RESPONSE.SC:', response.statusCode);
console.error('RESPONSE:', response.body);
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
console.log('ok');
        return res.redirect('/login');
    });
});

module.exports = router;