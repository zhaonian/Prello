var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        key: String,
        boardName: String,
        lists: Array
});

module.exports = mongoose.model('Board', schema);
