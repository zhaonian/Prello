var express = require('express');
var mongoose = require('mongoose');
var session = require('client-sessions');
var bcrypt = require('bcrypt');

var router = express.Router();

// models
var User = require('../models/user');

// user register
router.post('/user/register', function (req, res, next) {
        var hash = bcrypt.hashSync(req.body.password, 10);
        var newUser = new User({
                username: req.body.username,
                email: req.body.email,
                hash: hash
        });
        newUser.save(function (err, user) {
                if (err) { return res.render("error.ejs", { message: "Registration failed." }); }
                else { return res.redirect('/login'); }
        });
});

// user log in
router.post('/user/login', function (req, res, next) {
        User.findOne({ 'username': req.body.username },
                function (err, user) {
                        if (err) { return res.json(err); }
                        else {
                                if (user == null) {
                                        return res.render("error.ejs", { message: "Invalid email or password." });
                                }
                                // validate the password
                                if (!bcrypt.compareSync(req.body.password, user.hash)) {
                                        console.log('here');
                                        return res.render("error.ejs", { message: "Invalid email or password." });
                                }
                                req.session.username = req.body.username;
                                return res.redirect('/home');
                        }
                });
});

// user forget password
router.post('/user/reset', function (req, res, next) {
        User.findOne({ 'email': req.body.email },
                function (err, user) {
                        if (err) { return res.json(err); }
                        else {
                                if (user == null) {
                                        return res.render("error.ejs", { message: "Email does not exist." });
                                }
                                req.session.email = req.body.email;
                                return res.redirect('/link');
                        }
                });
});

// open reset form
router.post('/user/form/:email', function (req, res, next) {
        res.json({redirect: '/form'});
});


// update password in db
router.post('/user/newPassword', function (req, res, next) {
        User.findOne({ 'email': req.session.email },
                function (err, user) {
                        if (err) { return res.json(err); }
                        else {
                                if (user == null) {
                                        return res.render("error.ejs", { message: "Email does not exist." });
                                }
                                user.hash = bcrypt.hashSync(req.body.password, 10);
                                user.save(function (err, u) {
                                        if (err) { console.log(err); }
                                        else { console.log('success'); }
                                });
                                return res.redirect('/success');
                        }
                });
});


module.exports = router;