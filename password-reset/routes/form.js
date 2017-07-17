var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
        res.render('form', {
                title: 'Password reset form',
                email: req.session.email,
        });
});

module.exports = router;
