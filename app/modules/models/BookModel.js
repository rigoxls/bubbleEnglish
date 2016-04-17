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
        description : data.description,
        image       : data.image
    };

    var bookObject = new modelBook(predefinedData);

    bookObject.save(function(err, data){
        if(err) return console.error(err);
        callback(data);
    });
};

BookModel.prototype.update = function(data, callback)
{
    var bookId = data.bookId;
    var options = { multi: false, upsert: false};
    var settedValues = {};

    (data.name) ? settedValues.name = data.name : '';
    (data.description) ? settedValues.description = data.description : '';
    (data.image) ? settedValues.image = data.image : '';

    this.model.update(
    {
        _id: bookId,
        user_id: data.user_id
    },
    {
        $set: settedValues
    },
    options,
    function(err, data){
        callback(data);
    })

}

BookModel.prototype.listAll = function(data, callback)
{
    var query = {
        user_id : data.user_id
    };

    this.model.find(
        query,
        function(err, data){
            if(err) return console.error(err);
            callback(data);
        }
    )
};

BookModel.prototype.getById = function(data, callback)
{
    var query = {
        _id: data.bookId
    };

    console.info(query);

    this.model.findOne(
        query,
        function(err, data){
            if(err) return console.error(err);
            callback(data);
        }
    )
}

module.exports = BookModel;