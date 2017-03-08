angular
.module('myApp')
.controller('activityDetailCtrl',['$scope','$stateParams','activityData','authentication','$ionicPopup','$timeout',function($scope, $stateParams,activityData,authentication,$ionicPopup, $timeout){
    $scope.activity = $stateParams.activity;
    activityData.getActivityById($scope.activity._id).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activity = data;
        console.log(data);
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
	check = function() {
		var arr = $scope.activity.userSign;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==authentication.currentUser()._id){
				alert('你报过了');
				return false;
			}
		}
		return true;
	}
    $scope.participate = function() {
		if(check()){
        activityData.participate($stateParams.activity._id).success(function (data) {
             var alertPopup = $ionicPopup.alert({
               title: '注册成功',
               template: '欢迎参加活动'
             });
             alertPopup.then(function(res) {
               console.log('活动注册成功');
             });
        });
		}
    }
}])