angular
.module('myApp')
.controller('activitiesCtrl', activitiesCtrl);


homeCtrl.$inject = ['activitiesData','userData','$scope'];
function activitiesCtrl(activitiesData,userData,$scope,$state) {
    activitiesData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.activities = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
    $scope.user = userData;
    $scope.goDetail=function(activity){
        $state.go('detail',{activity:activity});  
    }
}

