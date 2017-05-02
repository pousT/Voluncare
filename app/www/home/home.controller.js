angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['authentication','$scope','$location', '$rootScope'];
function homeCtrl(authentication,$scope,$location,$rootScope) {
    $scope.user = {
        data:{}
    }
    if(authentication.isLoggedIn()) {
        authentication.getUser().then(function(data) {
            if(data == undefined) {
                $location.path('/login');    
                return;    
            } else {
                $scope.user.data = data.data;
            }

        });        
    } else {
                $location.path('/login');           
    }

    $scope.showDiscount = function() {
        $location.path('/');
    }

    $scope.recharge = function() {
        $location.path('/recharge');
    }
    $scope.logout = function() {
        authentication.logout();
        $location.path('/login');         
    } 
}

