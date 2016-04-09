var Dashboard = function()
{
    this.response = function(action, req, res, next){
        this[action](req, res, next);
    }
};

Dashboard.prototype.home = function(req, res, next){
    res.send('you are in the dashboard home');
};

module.exports = Dashboard;