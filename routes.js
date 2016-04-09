var controllersManager = require('./app/modules/controllers/controllersManager'),
    conf = require('./config/conf'),
    passport = require('passport');


var Routes = function(app){
    var controllers = [];

    for(var cm in controllersManager){
        controllers[cm] = new controllersManager[cm];
    };

    app.expressServer.get('/', function(req, res, next){
        res.send('you are in / as logged');
    });

    app.expressServer.get('/login', function(req, res, next){
        res.send('you are in login');
    });

    app.expressServer.get('/home', function(req, res, next){
        controllers['homeController'].response('home', req, res, next);
    });

    //redirect the user to twitter for authentication. when complete, twitter
    //will redirect the user back to the application at
    // /auth/twitter/callback
    app.expressServer.get('/auth/twitter', passport.authenticate('twitter'));

    //twitter will redirect the user to this URL  after approval. Finish the
    //authentication process by attempting to obtain an access token.
    //If access was granted, the user will be logged in . Otherwise, authentication has failed.
    app.expressServer.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: conf.appUrl + 'login/#/',
                                           failureRedirect: '/login' } ));

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.expressServer.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.expressServer.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: conf.appUrl + 'home/#/',
                                          failureRedirect: '/login' }));

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