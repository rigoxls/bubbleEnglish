(function(w){
    'use-strict';
    w.bubbleEnglish.controllers.controller('upsertBookController', ['$scope', function($scope){

        //if book object doesn't exist , we create it.
        $scope.book = $scope.book || {};

        console.info('book controller loaded');

    }]);
})(window);