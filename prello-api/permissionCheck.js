var Board = require('./models/board');

var permission = function (req, res, next) {
        if (!req.session.username) {
                return console.log("permission denied");
        }
        Board.findById(req.params.boardId, function (err, targetBoard) {
                if (!targetBoard.members.includes(req.session.username)) {
                        return console.log("permission denied");
                        // TODO: fix this later
                }
        });
        next();
};

module.exports = permission;