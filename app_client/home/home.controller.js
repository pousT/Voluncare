angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['authentication','$scope','$location', '$rootScope'];
function homeCtrl(authentication,$scope,$location,$rootScope) {
    $scope.user = {
        data:{}
    }
    authentication.getUser().then(function(data) {
        if(data == undefined) {
            $location.path('/login');    
            return;    
        } else {
            $scope.user.data = data.data;
        }

    });
    $scope.showDiscount = function() {
        $location.path('/integralRecords');
    }

    $scope.recharge = function() {
        $location.path('/recharge');
    }
}

