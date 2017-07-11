var express = require('express');
var mongoose = require('mongoose')
var session = require('client-sessions');

var router = express.Router();

// var authCheck = require('../authCheck'); TODO: authCheck does not work
var permissionCheck = require('../permissionCheck');

var List = require('../models/list');
var Card = require('../models/card');
var Comment = require('../models/comment');
var User = require('../models/user');
var Board = require('../models/board');
// TODO: Where to create exceptions???
// TODO: use update to delete and patch



/* List */
// Get all the lists in db
router.get('/list', permissionCheck, function (req, res, next) { // 99% of the times does not need 'next'
        List.find({}, function (err, allLists) {
                if (err) { console.error(err); }
                else { res.json(allLists); }
        });
});


// Get all the lists belonging to {username}
router.get('/board/:boardId/list', permissionCheck, function (req, res, next) { // 99% of the times does not need 'next'
        Board.find({ '_id': req.params.boardId }, function (err, allBoards) {
                if (err) { console.error(err); }
                else {
                        var allLists = [];
                        for (var i = 0; i < allBoards.length; i++) {
                                for (var j = 0; j < allBoards[i].lists.length; j++) {
                                        allLists.push(allBoards[i].lists[j]);
                                }
                        }
                        res.json(allLists);
                }
        });
});

// Create a new list under {username}
router.post('/board/:boardId/list', permissionCheck, function (req, res, next) {
        Board.findOne({ '_id': req.params.boardId },
                function (err, targetBoard) {
                        if (err) { return res.json(err); }
                        else {
                                var newList = new List({
                                        key: req.params.username,
                                        listName: req.body.listName,
                                        cards: []
                                });
                                targetBoard.lists.push(newList);
                                targetBoard.lists.set(targetBoard.lists.length - 1, targetBoard.lists[targetBoard.lists.length - 1]); // tell mongoose it's changed
                                targetBoard.save(function (err, board) {
                                        if (err) { console.log(err); }
                                        else { res.json(board); }
                                });
                        }
                });
});

// Delete a list
router.delete('/board/:boardId/list/:listId', permissionCheck, function (req, res, next) {
        var listId = req.params.listId;
        Board.findOne({ '_id': req.params.boardId },
                function (err, targetBoard) {
                        if (err) { return res.json(err); }
                        else {
                                for (var i = 0; i < targetBoard.lists.length; i++) {
                                        if (targetBoard.lists[i]._id == listId) {
                                                targetBoard.lists.splice(i, 1);
                                        }
                                }
                                // TODO: it deletes the wrong list. Fix this later
                                targetBoard.save(function (err, board) {
                                        if (err) { console.log(err); }
                                        else { res.json(board); }
                                });
                        }
                }
        )
});

// Update a list
// TODO: Implement query
router.patch('/:username/list/:listId', permissionCheck, function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        console.log(username);
        console.log(listId);
        res.send('respond with a resource');
});


/* Card */
// Add a new card to a list
router.post('/board/:boardId/list/:listId/card', permissionCheck, function (req, res, next) {
        var listId = req.params.listId;
        Board.findOne({ '_id': req.params.boardId },
                function (err, targetBoard) {
                        if (err) { return res.json(err); }
                        else {
                                var targetListIndex = 0;
                                for (var i = 0; i < targetBoard.lists.length; i++) {
                                        if (targetBoard.lists[i]._id == listId) {
                                                targetListIndex = i;
                                                var newCard = new Card({
                                                        key: req.body.key,
                                                        cardName: req.body.cardName,
                                                        labels: req.body.labels,
                                                        comments: []
                                                });
                                                targetBoard.lists[i].cards.push(newCard);
                                        }
                                }
                                targetBoard.lists.set(targetListIndex, targetBoard.lists[targetListIndex]);
                                targetBoard.save(function (err, board) {
                                        if (err) { console.log(err); }
                                        else {
                                                res.json(board.lists[targetListIndex]);
                                        }
                                });
                        }
                });
});

// Delete a card from a list
router.delete('/board/:boardId/list/:listId/card/:cardId', permissionCheck, function (req, res, next) {
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        var boardId = req.params.boardId;
        Board.findOne({ '_id': req.params.boardId },
                function (err, targetBoard) {
                        if (err) { return res.json(err); }
                        else {
                                var targetListIndex = 0;
                                for (var i = 0; i < targetBoard.lists.length; i++) {
                                        if (targetBoard.lists[i]._id == listId) {
                                                targetListIndex = i;
                                                for (var j = 0; j < targetBoard.lists[i].cards.length; j++) {
                                                        if (targetBoard.lists[i].cards[j]._id == cardId) {
                                                                targetBoard.lists[i].cards.splice(j, 1);
                                                        }
                                                }
                                        }
                                }
                                targetBoard.lists.set(targetListIndex, targetBoard.lists[targetListIndex]);
                                targetBoard.save(function (err, board) {
                                        if (err) { console.log(err); }
                                        else {
                                                res.json(board.lists[targetListIndex]);
                                        }
                                });
                        }
                });
});

// Update a card in a list
// TODO: Implement query
router.patch('/:username/list/:listId/card/:cardId', permissionCheck, function (req, res, next) {
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
        newUser.save(function (err, user) {
                if (err) { return res.render("loginError.ejs", { message: "Registration failed." }); }
                else { res.render('login.ejs', { title: 'Login | Prello' }); }
        });
});

// check if the user is in db
router.post('/user/signin', function (req, res, next) {
        User.findOne({ 'username': req.body.username, 'password': req.body.password },
                function (err, user) {
                        if (err) { return res.json(err); }
                        else {
                                if (user == null) {
                                        return res.render("loginError.ejs", { message: "Invalid email or password." });
                                }                        // how to return message javascript in the same page
                                req.session.username = req.body.username;
                                return res.redirect('http://localhost:3000/boards');
                        }
                });
});


/* Comment */
// get all the comments
router.get('/comment/board/:boardId/list/:listId/card/:cardId', permissionCheck, function (req, res, next) {
        var boardId = req.params.boardId;
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        var username = req.session.username;
        Board.findOne({ '_id': boardId }, function (err, targetBoard) {
                if (err) { return res.json(err); }
                else {
                        for (var i = 0; i < targetBoard.lists.length; i++) {
                                if (targetBoard.lists[i]._id == listId) {
                                        for (var j = 0; j < targetBoard.lists[i].cards.length; j++) {
                                                if (targetBoard.lists[i].cards[j]._id == cardId) {
                                                        return res.json(targetBoard.lists[i].cards[j].comments);
                                                }
                                        }
                                }
                        }
                }
        });
});


// add a new comment
router.post('/comment/board/:boardId/list/:listId/card/:cardId/add', permissionCheck, function (req, res, next) {
        var boardId = req.params.boardId;
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        var username = req.session.username;
        Board.findOne({ '_id': boardId }, function (err, targetBoard) {
                if (err) { return res.json(err); }
                else {
                        var targetListIndex = 0;
                        var targetCardIndex = 0;
                        for (var i = 0; i < targetBoard.lists.length; i++) {
                                if (targetBoard.lists[i]._id == listId) {
                                        targetListIndex = i;
                                        for (var j = 0; j < targetBoard.lists[i].cards.length; j++) {
                                                if (targetBoard.lists[i].cards[j]._id == cardId) {
                                                        targetCardIndex = j;
                                                        var newComment = new Comment({
                                                                key: req.body.username,
                                                                comment: req.body.comment,
                                                                date: new Date()
                                                        });
                                                        targetBoard.lists[i].cards[j].comments.push(newComment);
                                                }
                                        }
                                }
                        }
                        targetBoard.lists.set(targetListIndex, targetBoard.lists[targetListIndex]);
                        targetBoard.save(function (err, board) {
                                if (err) { console.log(err); }
                                else {
                                        res.json(board.lists[targetListIndex].cards[targetCardIndex].comments[board.lists[targetListIndex].cards[targetCardIndex].comments.length - 1]);
                                }
                        });
                }
        });
});


/* Board */
// Load all the boards
router.get('/:username/board', function (req, res, next) {
        Board.find({ 'key': req.params.username }, function (err, allBoards) {
                if (err) { console.error(err); }
                else { res.json(allBoards); }
        });
});

// Add a new board
router.post('/:username/board', function (req, res, next) {
        var newBoard = new Board({
                key: req.params.username,
                boardName: req.body.boardName,
                lists: [],
                members: [req.params.username]
        });
        newBoard.save(function (err, board) {
                if (err) { return res.render("loginError.ejs", { message: "Board creation failed." }); }
                else {
                        res.json(newBoard);
                }
        });
});

// Delete a board
router.delete('/:username/board/:boardId', function (req, res, next) {
        Board.findOne({ 'key': req.params.username, '_id': req.params.boardId },
                function (err, boardToDelete) {
                        if (err) { return res.json(err); }
                        else {
                                boardToDelete.remove();
                                return res.json({ status: 200 });
                        }
                });
});



module.exports = router;