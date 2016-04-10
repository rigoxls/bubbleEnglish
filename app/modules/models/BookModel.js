var modelBook = require('./schema/bookSchema'),
    mongoose = require('mongoose');

var BookModel = function(conf){
    conf = conf || {};
    this.model = modelBook;
};

BookModel.prototype.insert = function(data, callback)
{
    var predefinedData = {
        user_id     : data.user_id,
        name        : data.name,
        description : data.description
    };

    var bookObject = new modelBook(predefinedData);

    bookObject.save(function(err, data){
        if(err) return console.error(err);
        callback(data);
    });
}

module.exports = BookModel;