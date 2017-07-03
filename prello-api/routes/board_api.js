var express = require('express');
var mongoose = require('mongoose')

var router = express.Router();


var List = require('../models/list');
var Card = require('../models/card');
var User = require('../models/user');
// TODO: Where to create exceptions???
// TODO: use update to delete and patch



/* List */
// Get all the lists belonging to {username}
router.get('/:username/list', function (req, res, next) { // 99% of the times does not need 'next'
        List.find({ 'key': req.params.username }, function (err, allLists) {
                if (err) { console.error(err); }
                else { res.json(allLists); }
        });
});

// Create a new list under {username}
router.post('/:username/list', function (req, res, next) {
        var newList = new List({
                key: req.params.username,
                listName: req.body.listName,
                cards: []
        });
        newList.save(function (err, list) { // what does this list refer to?
                if (err) { console.log(err); }
                else { res.json(newList); }
        });
});

// Delete a list
router.delete('/:username/list/:listId', function (req, res, next) {
        List.findOne({ 'key': req.params.username, '_id': req.params.listId },
                function (err, listToDelete) {
                        if (err) { return res.json(err); }
                        else {
                                listToDelete.remove();
                                return res.json({ status: 200 });
                        }
                });
});

// Update a list
// TODO: Implement query
router.patch('/:username/list/:listId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        console.log(username);
        console.log(listId);
        res.send('respond with a resource');
});


/* Card */
// Add a new card to a list
router.post('/:username/list/:listId/card', function (req, res, next) {
        List.findOne({ 'key': req.params.username, '_id': req.params.listId },
                function (err, targetList) {
                        if (err) { return res.json(err); }
                        else {
                                var newCard = new Card({
                                        cardName: req.body.cardName,
                                        labels: req.body.labels
                                });
                                targetList.cards.push(newCard);
                        }
                        targetList.save(function (err, list) {
                                if (err) { console.log(err); }
                                else { res.json(list); }
                        });
                });
});

// Delete a card from a list
router.delete('/:username/list/:listId/card/:cardId', function (req, res, next) {
        var cardId = req.params.cardId;
        List.findOne({ 'key': req.params.username, '_id': req.params.listId },
                function (err, targetList) {
                        if (err) { return res.json(err); }
                        else {
                                for (var i = 0; i < targetList.cards.length; i++) {
                                        if (targetList.cards[i]._id == cardId) {
                                                targetList.cards.splice(i, 1);
                                        }
                                }
                        }
                        targetList.save(function (err, list) {
                                if (err) { console.log(err); }
                                else { res.json(list); }
                        });
                });
});

// Update a card in a list
// TODO: Implement query
router.patch('/:username/list/:listId/card/:cardId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        console.log(username);
        console.log(listId);
        console.log(cardId);
        res.send('respond with a resource');
});


/* User */
// create a new user
router.post('/user/register', function (req, res, next) {
        var newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
        });
        console.log(newUser);
        newUser.save(function (err, user) {
                if (err) { console.log(err); }
                else { res.render('board.ejs', { title: 'Board | Prello' }); }
        });
});

// check if the user is in db
router.post('/user/signin', function (req, res, next) {
        User.findOne({ 'username': req.body.username, 'password': req.body.password },
                function (err, user) {
                        if (err) { return res.json(err); }
                        else {
                                if (user == null) {
                                        return res.json({ 'status': 0 }); // return 0 if the username/password is wrong
                                }
                                return res.json({ 'status': 1 }); // return 1 if user is found in db
                        }
                });
});


module.exports = router;
