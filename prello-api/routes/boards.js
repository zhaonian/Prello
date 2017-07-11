var express = require('express');
var router = express.Router();


// render the boards page ejs
router.get('/', function(req, res, next) {
        res.render('boards.ejs', { 
                username: req.session.username
        });
});

module.exports = router;
