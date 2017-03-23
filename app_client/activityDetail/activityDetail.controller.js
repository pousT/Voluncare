angular
.module('myApp')
.controller('activityDetailCtrl',['$scope','$stateParams','activityData','authentication','$ionicPopup','$timeout','$rootScope',function($scope, $stateParams,activityData,authentication,$ionicPopup, $timeout,$rootScope){
    $scope.activity = $stateParams.activity;
    activityData.getActivityById($scope.activity._id).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activity = data;
        console.log(data);
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.details = {
        activity:{},
        user:{}
    }
    authentication.getUser().then(function(data) {
            console.log(data.data);
            $scope.details.user = data.data;
    });	
	var cre = $scope.details.user.credit;
	var pri = $scope.activity.price;
	if(cre>=100&&cre<500){
		$scope.discount=pri*0.98;
	}
	if(cre>=500&&cre<2000){
		$scope.discount=pri*0.95;
	}
	if(cre>=2000){
		$scope.discount=pri*0.92;
	}
	if(cre>=0&&cre<100){
		$scope.discount=pri;
	}
	
    var end = $scope.activity.end;
	var date1 = new Date();
	var date2 = new Date(end);

	if(date1>date2){
		$scope.txt="已结束";
	}
	if(date1<date2){
		$scope.txt="报名中";
	}
	
	check1 = function() {
		var arr = $scope.activity.userSign;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==$scope.details.user._id){
				alert('你报过了');
				return false;
			}
		}
		return true;
	}
	
	check2 = function() {
		if($scope.details.user.credit<$scope.activity.creditReq){
			alert('你分不够');
			return false;
		}	
		return true;
	}	
	
	check3 = function() {
		var arr = $scope.details.user.balance;
		if(arr<$scope.activity.price){
			alert('你钱不够');
			return false;
		}
		return true;
	}
	
	check4 = function() {
		var end = $scope.activity.end;
		var date1 = new Date();
		var date2 = new Date(end);

		if(date1>date2){
			alert('活动已结束');
			return false;
		}
		return true;
	}
		
    $scope.participate = function() {
		if(check1()){
		if(check2()){	
		if(check3()){	
		if(check4()){
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
		}
		}
    }
}])


