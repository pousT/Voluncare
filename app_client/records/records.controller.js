angular
.module('myApp')
.controller('recordsCtrl', recordsCtrl);


recordsCtrl.$inject = ['recordsData','$scope','$state'];
function recordsCtrl(recordsData,$scope,$state) {
    recordsData.success(function (data) {
        message = data.length > 0 ? "" : "暂无数据";
        $scope.records = data;
    }).error(function (e) {
        console.log(e);
        message = "Sorry, something's gone wrong ";
    });
}

