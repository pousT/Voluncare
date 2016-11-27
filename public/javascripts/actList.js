var app = angular.module('myApp', ['ionic','ngMessages']);
app.controller('myCtrl', function($scope, $http, $location) {
        $scope.login = function(){ 
            window.location = '/login';
            
        };

    $scope.formData = {};
    $scope.error = "";
    $scope.submit = function() {
        $http({
            url:'/newAct',
            method: 'POST',            
            data: $scope.formData      
        }).success(function(data,status){
            if(status == 200) {
                window.location = '/home';
            }

        }).error(function(status, data){
            window.location = '/newAct';
        })
    }

});