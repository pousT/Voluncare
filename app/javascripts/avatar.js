var app = angular.module('myApp', ['ionic','ngMessages','file-model']);
app.controller('myCtrl', function($scope, $http, $location) {
        $scope.home = function(){ 
            window.location = '/home';
            
        };

});
