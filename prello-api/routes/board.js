var express = require('express');
var router = express.Router();

// render the board page ejs
router.get('/', function (req, res, next) {
        res.render('board.ejs', { username: req.session.username });
});

module.exports = router;
