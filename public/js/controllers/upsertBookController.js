(function(w){
    'use-strict';
    w.bubbleEnglish.controllers.controller('upsertBookController', ['$scope', '$http', '$routeParams', 'messageFactory', function($scope, $http, $routeParams, messageFactory)
    {
        //if book object doesn't exist , we create it.
        $scope.book = $scope.book || {};
        $scope.bookId = null;

        $scope.$on('$viewContentLoaded', function()
        {
            var dataParams = {};
            $scope.bookId = $routeParams.bookId;
            dataParams.bookId = $scope.bookId;

            if($scope.bookId){
                $http.get('/dashboard/getBook/', {params : dataParams})
                    .success(function(data, status, headers, config){
                        $scope.book = data.data;
                    })
                    .error(function(data, status, headers, config){
                        console.info('Something went wrong getting book');
                    });
            }

        });


        $scope.submitForm = function(isValid)
        {
            var self = this;

            if(isValid)
            {
                var fileName = null;

                //we need to rename the image to avoid override it if user upload another image with same name
                if($scope.file){
                    fileName = parseInt(Math.random() * 100) + $scope.file.name.replace(/[^a-zA-Z0-9\.]+/g, '-').toLowerCase();
                }

                var endPoint = ($scope.bookId) ? '/dashboard/updateBook/' : '/dashboard/addBook/';

                $http({
                    method: 'POST',
                    url: endPoint,
                    headers: {
                        'Content-Type' : undefined
                    },
                    data:{
                        bookId : $scope.bookId, //just in case of update
                        name : $scope.book.name,
                        description : $scope.book.description,
                        file: $scope.file,
                        fileName: fileName
                    },
                    //emulate a post/ multipart data
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });

                        return formData;
                    }
                })
                .success(function(data){
                    messageFactory.showMessage(data.textResponse, 1);
                    if(!$scope.bookId){
                        self.cleanForm();
                    }
                })
                .error(function (data, status) {
                    messageFactory.showMessage('error updating profile', 2);
                    if(!$scope.bookId){
                        self.cleanForm();
                    }
                })
            }
        };

        $scope.cleanForm = function()
        {
            $scope.book.name = $scope.book.description = '';
            var inputFile = angular.element( document.querySelector("input[type='file']"));
            inputFile.val(null);
            inputFile.triggerHandler('change');
        }

    }]);
})(window);