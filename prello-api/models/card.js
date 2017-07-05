var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        key: String,
        cardName: String,
        labels: Array,
        comments: Array
});

module.exports = mongoose.model('Card', schema);
