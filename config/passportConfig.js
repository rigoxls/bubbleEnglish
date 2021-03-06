var passport = require('passport'),
    userModel = require('../app/modules/models/UserModel'),
    conf = require('./conf'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy;

var passportModule = function(){

    var self = this;
    self.model = new userModel();

    //In a typical web application, the credentials used to authenticate
    //a user will only be transmitted during the login request. If authentication
    //succeeds, a session will be established and maintained via a cookie set in
    //the user's browser.

    //Each subsequent request will not contain credentials, but rather the unique
    //cookie that identifies the session. In order to support login sessions, Passport
    //will serialize and deserialize user instances to and from the session.

    passport.serializeUser(function(user, callback){
        callback(null, user);
    });

    passport.deserializeUser(function(user, callback){
        callback(null, user);
    });

    //twitter strategy
    passport.use(new TwitterStrategy({
        consumerKey: conf.twitterCredentials.key,
        consumerSecret: conf.twitterCredentials.secret,
        callbackURL: '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, callback){

        //data profile
        var dataProfile = {
            provider_id : profile.id,
            provider    : profile.provider,
            name        : profile.displayName,
            photo       : profile.photos[0].value
        }

        self.model.findOrCreate(dataProfile, callback);
    }));

    //facebook strategy
    passport.use(new FacebookStrategy({
        clientID: conf.facebookCredentials.appId,
        clientSecret: conf.facebookCredentials.secret,
        callbackURL: "/auth/facebook/callback",
        profileFields : ['id', 'displayName', 'gender', 'profileUrl', 'photos']
    },
    function(accessToken, refreshToken, profile, callback){

        //data profile
        var dataProfile = {
            provider_id : profile.id,
            provider    : profile.provider,
            name        : profile.displayName,
            photo       : profile.photos[0].value
        }

        self.model.findOrCreate(dataProfile, callback);

    }));

    //google strategy
    passport.use(new GoogleStrategy({
        clientID: conf.googleCredentials.appId,
        clientSecret: conf.googleCredentials.secret,
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
/*        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });*/
      }
    ));
};

module.exports = passportModule;