(function(w){
    'use strict';

    var app = angular.module('bubbleEnglish', [
        'ngRoute'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider

        .when('/', {
            redirectTo : '/home/'
        })

        .when('/createBooks/', {
            templateUrl : '../views/upsert-book,html',
            controller : 'upsertBookController'
        })

        .otherwise('/', {
            redirectTo : '/home/'
        })
    }])
})
