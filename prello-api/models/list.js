var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        key: String,
        listName: String,
        cards: Array
});

module.exports = mongoose.model('List', schema);;


