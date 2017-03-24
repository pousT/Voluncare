angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['authentication','$scope','$location'];
function homeCtrl(authentication,$scope,$location) {
    $scope.user = authentication.currentUser();
    if($scope.user == undefined) {
        $location.path('/login');
    }
    $scope.showDiscount = function() {
        $location.path('/integralRecords');
    }
}

