(function(w){
    'use strict';

    var app = angular.module('bubbleEnglish', [
        'ngRoute',
        'bubbleEnglish.controllers',
        'bubbleEnglish.directives',
        'bubbleEnglish.services'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider

        .when('/', {
            redirectTo : '/home/'
        })

        .when('/addBook/', {
            templateUrl : '../views/upsert-book.html',
            controller : 'upsertBookController'
        })

        .when('/listBooks/', {
            templateUrl : '../views/list-books.html',
            controller : 'listBooksController'
        })

        .otherwise('/', {
            redirectTo : '/home/'
        })
    }])

    app.controllers = angular.module('bubbleEnglish.controllers', []);
    w.bubbleEnglish = app;

})(window);
