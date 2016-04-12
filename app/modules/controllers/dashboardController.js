var fs = require('fs'),
    conf = require('../../../config/conf.json'),
    dashboardService = require('../services/dashboardService');

var Dashboard = function()
{
    this.dashboardService = new dashboardService();

    //this method take the request and redirect it to properly method
    this.request = function(action, req, res, next)
    {
        this[action](req, res, next);
    };

    //if a response is in format JSON is requered, this method is used
    this.JSONresponse = function(res, textResponse, data, user)
    {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            textResponse: textResponse,
            data: data,
            user: user
        }));
    }
};

Dashboard.prototype.home = function(req, res, next)
{
    var viewParams = {
        appUrl : req.app.locals.appUrl
    };

    res.render('dashboard/home', viewParams);
};

Dashboard.prototype.addBook = function(req, res, next)
{
    var self = this;

    if(!req.body){
        console.info('body is empty');
        return false;
    }

    var data = req.body;

    //move file to book upload image folder
    if(req.body.fileName){
        var imagePath = conf.booksImageFolder + req.body.fileName;
        fs.rename(req.file.path, imagePath, function(){});
        data.image = imagePath;
    }

    //we need to know how is adding a new book
    data.user = req.user;


    self.dashboardService['addBook'](data, function(resData)
    {
        if(resData){
            self.JSONresponse(res, resData.textResponse, resData.data, data.user);
        }
        else{
            console.info('something went wrong with addBook request');
        }
    })


}

module.exports = Dashboard;