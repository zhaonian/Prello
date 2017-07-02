var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var schema = new Schema({
        cardName: String,
        labels: Array
});

module.exports = mongoose.model('Card', schema);
