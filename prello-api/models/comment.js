var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        key: String,
        comment: String,
        date: Date
});

module.exports = mongoose.model('Comment', schema);;


