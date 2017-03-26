angular
.module('myApp')
.controller('activityDetailCtrl',['$scope','$stateParams','activityData','authentication','$ionicPopup','$timeout','$state',function($scope, $stateParams,activityData,authentication,$ionicPopup, $timeout,$state){
    $scope.details = {
        activity:{},
        user:{}
    }    
    $scope.details.activity = $stateParams.activity;
    $scope.details.user = $stateParams.user;
    console.log($scope.details.activity);
    activityData.getActivityById($scope.details.activity._id).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.details.activity = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });

	var cre = $scope.details.user.credit;
	var pri = $scope.details.activity.price;
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
	
    var end = $scope.details.activity.end;
	var date1 = new Date();
	var date2 = new Date(end);

	if(date1>date2){
		$scope.txt="已结束";
	}
	if(date1<date2){
		$scope.txt="报名中";
	}
	
	checkparticipate = function() {
		var arr = $scope.details.activity.userSign;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==$scope.details.user._id){
				alert('你报过了');
				return false;
			}
		}
		return true;
	}
	
	checkcredit = function() {
		if($scope.details.user.credit<$scope.details.activity.creditReq){
			alert('你分不够');
			return false;
		}	
		return true;
	}	
	
	checkbalance = function() {
		var arr = $scope.details.user.balance;
		if(arr<$scope.details.activity.price){
			alert('你钱不够');
			return false;
		}
		return true;
	}
	
	checkend = function() {
		var end = $scope.details.activity.end;
		var date1 = new Date();
		var date2 = new Date(end);

		if(date1>date2){
			alert('活动已结束');
			return false;
		}
		return true;
	}
		
    $scope.participate = function() {
		if(checkparticipate()){
    		if(checkcredit()){	
        		if(checkbalance()){	
            		if(checkend()){
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

    $scope.signedUser = function() {
        $state.go('signedUsers',{uids:$scope.details.activity.userSign});  
    }
}])


