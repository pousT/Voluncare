
var app = angular.module('myApp', ['ionic']);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.formData = {};
    $scope.error = "";
    $scope.register = function() {
                window.location = '/register';        
    }
    $scope.processForm = function() {
        $http({
            url:'/login',
            method: 'POST',            
            data: $scope.formData      
        }).success(function(data,status){
            if(status == 200) {
                window.location = '/home';
            }

        }).error(function(status, data){
            window.location = '/login';
        })
    }
});
