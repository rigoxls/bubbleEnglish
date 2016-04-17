(function(w){
    'use-strict';
    w.bubbleEnglish.controllers.controller('listBooksController',['$scope', '$http', 'messageFactory', function($scope, $http, messageFactory)
    {
        //every time we get here , we will call this method
        $scope.$on('$viewContentLoaded', function() {

            $http.get('/dashboard/listBooks/')
                .success(function(data, status, headers, config){
                    console.info(data);
                    console.info(headers);
                    console.info(status);
                    console.info(config);

                    $scope.bookList = data.data;
                })
                .error(function(data, status, headers, config){
                    console.info('Something went wrong with list books request');
                });
        });
    }]);
})(window);