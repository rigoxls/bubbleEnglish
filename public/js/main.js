(function(w){
    'use strict';

    var app = angular.module('bubbleEnglish', [
        'ngRoute',
        'bubbleEnglish.controllers',
        'bubbleEnglish.directives'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider

        .when('/', {
            redirectTo : '/home/'
        })

        .when('/addBooks/', {
            templateUrl : '../views/upsert-book.html',
            controller : 'upsertBookController'
        })

        .otherwise('/', {
            redirectTo : '/home/'
        })
    }])

    app.controllers = angular.module('bubbleEnglish.controllers', []);
    w.bubbleEnglish = app;

})(window);
