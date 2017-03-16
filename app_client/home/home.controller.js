angular
.module('myApp')
.controller('homeCtrl', homeCtrl);

 
homeCtrl.$inject = ['authentication','$scope'];
function homeCtrl(authentication,$scope) {
    $scope.user = authentication.currentUser();

    $scope.showDiscount = function() {
    	if($scope.user.credit >= 2000){
    		window.alert("9.2折");
    	} else if($scope.user.credit >= 500){
    		window.alert("9.5折");
    	} else if($scope.user.credit >= 100){
    		window.alert("9.8折");
    	} else {
    		window.alert("没有折扣");
    	}
    }
}

