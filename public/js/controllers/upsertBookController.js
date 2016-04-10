(function(w){
    'use-strict';
    w.bubbleEnglish.controllers.controller('upsertBookController', ['$scope', '$http', 'messageFactory', function($scope, $http, messageFactory)
    {
        //if book object doesn't exist , we create it.
        $scope.book = $scope.book || {};

        $scope.submitForm = function(isValid)
        {
            if(isValid)
            {
                var bookParameters = {
                    name : $scope.book.name,
                    description : $scope.book.description
                };

                $http.post("/dashboard/addBook", bookParameters)
                    .success(function (data, status, header, config){
                        messageFactory.showMessage(data.textResponse, 1);
                        console.info('all good');
                    }).
                    error(function(data, status, headers, config){
                        messageFactory.showMessage(data.textResponse, 1);
                        //a message of error in here
                        console.info('There was an error procesing your request AJS');
                    });
            }

        }

    }]);
})(window);