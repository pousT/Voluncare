(function () {
    angular.module('myApp')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authentication','$scope'];
    function loginCtrl($location, authentication,$scope) {
        $scope.formData = {
            telephone: '',
            password: ''
        };
        
        $scope.returnPage = $location.search().page || '/';
        $scope.onSubmit = function () {
                $scope.doLogin();
        };
        $scope.goToRegister = function(path) {
            $location.path(path);
        }
        $scope.doLogin = function () {
            authentication.login($scope.formData).error(function (err) {
                $scope.formError = err.message;
            }).success(function () {
                $location.search('page', null);
                $location.path($scope.returnPage);
            });
        };
    }

})();