(function(w){
    'use-strict';
    w.bubbleEnglish.controllers.controller('upsertBookController', ['$scope', '$http', 'messageFactory', function($scope, $http, messageFactory)
    {
        //if book object doesn't exist , we create it.
        $scope.book = $scope.book || {};

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

                $http({
                    method: 'POST',
                    url: '/dashboard/addBook/',
                    headers: {
                        'Content-Type' : undefined
                    },
                    data:{
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
                    self.cleanForm();
                })
                .error(function (data, status) {
                    messageFactory.showMessage('error updating profile', 2);
                    self.cleanForm();
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