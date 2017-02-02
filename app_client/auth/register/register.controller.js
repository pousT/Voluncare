(function() {
    angular.module('myApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$scope','$location','authentication'];
    function registerCtrl($scope,$location, authentication) {
        $scope.credentials = {
            name: "",
            email: '',
            password: ''
        };

        $scope.returnPage = $location.search().page || '/';
        $scope.onSubmit = function() {
            authentication.register($scope.formData).error(function(err) {
                $scope.formError = err;
            }).then(function() {
                $location.search('page', null);
                $location.path($scope.returnPage);
            });
        };
      var vm=$scope.vm={};
      vm.cb = function () {
        console.log(vm.CityPickData1.areaData)
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