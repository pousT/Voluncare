(function() {
    angular.module('myApp')
        .controller('postActivityCtrl', postActivityCtrl);
    postActivityCtrl.$inject = ['$scope','$location','authentication','activityData'];
    function postActivityCtrl($scope,$location, authentication,activityData) {
        $scope.formData = {
            title: "",
            description: '',
            credit: '',
            status:'',
            birthday:'',
            address:'',
            start:'',
            end:'',
            maxNum:''
        };
        $scope.returnPage = $location.search().page || '/';
        $scope.onSubmit = function() {
            doAddActivity($scope.formData);
            
        };
        var doAddActivity = function (formData) {
            activityData.addActivity({                
                title: formData.title,
                description: formData.description,
                credit: formData.credit,
                status: formData.status,
                tags: formData.tags,
                address: formData.address,
                bonus: formData.bonus,
                maxNum:formData.maxNum,
                start:formData.start,
                end:formData.end

            }).success(function(data) {
                console.log("success!");
            }).error(function(data) {
                $scope.formError = "添加失败，请再试一次";
                console.log("error");
            });
            return false;
        };
      var vm=$scope.vm={};
      vm.cb = function () {
        $scope.formData.address = vm.CityPickData1.areaData[0] + "-" 
                                + vm.CityPickData1.areaData[1] + "-" 
                                + vm.CityPickData1.areaData[2];
        console.log($scope.formData.address);
        }
      vm.CityPickData1 = {
        areaData: [],
        backdrop: true,
        backdropClickToClose: true,
        defaultAreaData: ['浙江', '宁波', '海曙区'],
        buttonClicked: function () {
          vm.cb()
        },
        tag: '-',
        iconClass: 'ion-location',
        title: '请输入地址'
      }
    }
})();