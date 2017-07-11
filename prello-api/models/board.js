var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        key: String,
        boardName: String,
        lists: Array,
        members: Array
});

module.exports = mongoose.model('Board', schema);
