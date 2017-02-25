angular
.module('myApp')
.controller('activityDetailCtrl',['$scope','$stateParams','activityData', '$ionicPopup', '$timeout', function($scope, $stateParams,activityData,$ionicPopup, $timeout){
    $scope.activity = $stateParams.activity;
    activityData.getActivityById($scope.activity._id).success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activity = data;
        console.log(data);
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.participate = function() {
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

}])