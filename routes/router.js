var express = require('express');
var router = express.Router();

var sendEmail = require('./emailuser.js');
var indexRouter = require('./index.js');
var usersRouter = require('./users.js');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'API works well.' });
    console.log('works well');
  });

router.route('/print').get(function(req, res) {
    console.log('successful');
    res.statusMessage('successfull');
});

router.route('/default').get(indexRouter);
router.route('/users').get( usersRouter);
router.route('/api/sendEmail').get(sendEmail.sendEmail);

router.get('*', function(req, res) {
    console.log('In wild card route');
    res.render('error', { title: 'No matching route found.' });
    // res.redirect('/');
});

module.exports = router;