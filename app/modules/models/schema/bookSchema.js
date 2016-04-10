var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    /*user_id     : { type: Schema.ObjectId, ref: "User"},*/
    name        : String,
    description : String,
    image       : String,
    vocabulary  : [],
    deleted     : {type: Boolean, default: false},
    cretatedAt  : {type: Date, default: Date.now},
    updatedAt   : Date
});

var bookSchema = mongoose.model('Book', bookSchema);

module.exports = bookSchema;