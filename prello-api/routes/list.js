var express = require('express');
var mongoose = require('mongoose')

var router = express.Router();


var List = mongoose.model('List', {
        user: String,
        listName: String,
        cards: Array
}
        // garbages sent through request body won't be stored in db
        // TODO: how to @JsonIgnore __v
);


// TODO: change router name without 'list' in the beginning


/* List */
// Get all the lists belonging to {username}
router.get('/:username/list', function (req, res, next) {
        var username = req.params.username;
        // TODO: Implement query
        console.log(username);
        res.send('respond with a resource');
});

// Create a new list under {username}
router.post('/:username/list', function (req, res, next) {
        var username = req.params.username;
        // TODO: Implement query
        console.log(username);
        res.send('respond with a resource');
});

// Delete a list
router.delete('/:username/list/:listId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        // TODO: Implement query
        console.log(username);
        console.log(listId);
        res.send('respond with a resource');
});

// Update a list
router.patch('/:username/list/:listId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        // TODO: Implement query
        console.log(username);
        console.log(listId);
        res.send('respond with a resource');
});


/* Card */
// Add a new card to a list
router.post('/:username/list/:listId/card', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        // TODO: Implement query
        console.log(username);
        console.log(listId);
        res.send('respond with a resource');
});

// Delete a card from a list
router.delete('/:username/list/:listId/card/:cardId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        // TODO: Implement query
        console.log(username);
        console.log(listId);
        console.log(cardId);
        res.send('respond with a resource');
});

// Update a card in a list
router.patch('/:username/list/:listId/card/:cardId', function (req, res, next) {
        var username = req.params.username;
        var listId = req.params.listId;
        var cardId = req.params.cardId;
        // TODO: Implement query
        console.log(username);
        console.log(listId);
        console.log(cardId);
        res.send('respond with a resource');
});

module.exports = router;
