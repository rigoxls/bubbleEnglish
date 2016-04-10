var BookModel = require('../models/BookModel');

var DashboardService = function()
{
    this.bookModel = new BookModel();
};

DashboardService.prototype.addBook = function(data, callback)
{
    var self = this;
    self.bookModel.insert(data, function(data){
        if(data)
        {
            var textResponse = "Book was added successfully";
            callback({ data: data, textResponse: textResponse});
        }
        else
        {
            callback(null);
        }
    });
}

module.exports = DashboardService;