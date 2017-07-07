module.exports = function (req, res, next) {
	if (!req.session.user) {
		res.render('loginError', {message: "user not logged in"});
	} else {
		next();
	}
};