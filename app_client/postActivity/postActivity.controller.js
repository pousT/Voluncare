(function() {
    angular.module('myApp')
        .controller('postActivityCtrl', postActivityCtrl);
    postActivityCtrl.$inject = ['$scope','$location','authentication','activitiesData'];
    function postActivityCtrl($scope,$location, authentication,activitiesData) {
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
            doAddActivity($scope.formData).error(function(err) {
                $scope.formError = err;
            }).then(function() {
                $location.search('page', null);
                $location.path($scope.returnPage);
            });
        };
        var doAddActivity = function (formData) {
            activitiesData.addActivity({                
                title: formData.title,
                description: formData.description,
                credit: formData.credit,
                status: formData.status,
                tags: formData.tags,
                img: formData.img,
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