var app = angular.module('myApp', ['ionic','ngMessages']);
app.controller('myCtrl', function($scope, $http, $location) {
        $scope.login = function(){ 
            window.location = '/login';
            
        };

    $scope.formData = {};
    $scope.error = "";
    $scope.genders = [
      "男",
      "女"
    ];
    $scope.submit = function() {
        $http({
            url:'/register',
            method: 'POST',            
            data: $scope.formData    
        }).success(function(data,status){
            if(status == 200) {
                window.location = '/avatar';
            }

        }).error(function(status, data){
            window.location = '/register';
        })
    }

});
