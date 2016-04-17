var controllersManager = require('./app/modules/controllers/controllersManager'),
    conf = require('./config/conf'),
    passport = require('passport'),
    multer  = require('multer'),
    upload = multer({ dest: conf.uploadFolder });


var Routes = function(app){
    var controllers = [];

    for(var cm in controllersManager){
        controllers[cm] = new controllersManager[cm];
    };

    app.expressServer.get('/', function(req, res, next){
        controllers['homeController'].request('home', req, res, next);
    });

    //dashboard is our main controller
    app.expressServer.get('/dashboard', function(req, res, next){
        //we need to be sure user is logged to see this pages that are managed with angularjs
        //if not user, redirect
        if(!req.user) res.redirect('/home');
        controllers['dashboardController'].request('home', req , res, next);
    });

    app.expressServer.post('/dashboard/addBook', upload.single('file'), function(req, res, next){
        if(!req.user) res.redirect('/home');
        controllers['dashboardController'].request('addBook', req , res, next);
    });

    app.expressServer.get('/dashboard/listBooks', function(req, res, next){
        if(!req.user) res.redirect('/home');
        controllers['dashboardController'].request('listBooks', req , res, next);
    });

    app.expressServer.get('/home', function(req, res, next){
        controllers['homeController'].request('home', req, res, next);
    });

    app.expressServer.get('/logout/', function(req, res, next){
        req.logout();
        res.redirect('/home');
    });

    //redirect the user to twitter for authentication. when complete, twitter
    //will redirect the user back to the application at
    // /auth/twitter/callback
    app.expressServer.get('/auth/twitter', passport.authenticate('twitter'));

    //twitter will redirect the user to this URL  after approval. Finish the
    //authentication process by attempting to obtain an access token.
    //If access was granted, the user will be logged in . Otherwise, authentication has failed.
    app.expressServer.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: conf.appUrl + 'dashboard/#/',
                                           failureRedirect: '/dashboard' } ));

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.expressServer.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.expressServer.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: conf.appUrl + 'dashboard/#/',
                                          failureRedirect: '/dashboard' }));

    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    app.expressServer.get('/auth/google',  passport.authenticate('google', { scope: ['profile'] }));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.expressServer.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: conf.appUrl + '/login/#/' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(conf.appUrl + '/home/#/');
      });
}

module.exports = Routes;