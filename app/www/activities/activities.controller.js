angular
.module('myApp')
.controller('activitiesCtrl', activitiesCtrl);


activitiesCtrl.$inject = ['activitiesData','$scope','$state'];
function activitiesCtrl(activitiesData,$scope,$state) {
    activitiesData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activities = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.goDetail=function(activity){
        console.log(activity);
        $state.go('detail',{activity:activity});  
    }
}

