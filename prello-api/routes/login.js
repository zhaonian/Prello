var express = require('express');
var router = express.Router();


// render the login page ejs
router.get('/', function(req, res, next) {
        res.render('login', { title: 'Login | Prello' });
});

module.exports = router;
