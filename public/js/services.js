(function(){
    angular.module('bubbleEnglish.services', [])

        .factory('messageFactory', ['$timeout', '$rootScope', '$window', function($timeout, $rootScope, $window){
            var factory = {};
            $rootScope.alertMessage = null;
            $rootScope.alertShow = false;

            factory.showMessage = function(msg, type){

                var type = parseInt(type, 10);
                var typeMessage = 'alert-info';

                if(type === 1){
                    typeMessage = 'alert-success';
                }else if(type === 2){
                    typeMessage = 'alert-danger';
                }

                $rootScope.alertMessage = msg;
                $rootScope.alertShow = true;
                $rootScope.alertType = typeMessage;

                $window.scrollTo(0,0);

                $timeout(function(){
                    factory.hideMessage();
                },5000)
            };

            factory.hideMessage = function(){
                $rootScope.alertShow = false;
            };

            return factory;
        }])

})();