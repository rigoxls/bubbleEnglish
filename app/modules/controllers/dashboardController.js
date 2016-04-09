var Dashboard = function()
{
    this.response = function(action, req, res, next)
    {
        this[action](req, res, next);
    }
};

Dashboard.prototype.home = function(req, res, next)
{
    var object = {
        appUrl : req.app.locals.appUrl
    };

    res.render('dashboard/home', object);
};

module.exports = Dashboard;