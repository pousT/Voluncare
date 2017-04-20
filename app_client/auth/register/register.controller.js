(function() {
    angular.module('myApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$scope','$location','authentication','$ionicPickerI18n'];
    function registerCtrl($scope,$location, authentication,$ionicPickerI18n) {
       $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        $scope.formData = {
            name: "",
            telephone: '',
            pw: '',
            pwc:'',
            birthday:'',
            address:'',
            gender:""
        };
       $ionicPickerI18n.ok = "确认";
       $ionicPickerI18n.cancel = "取消";   
        $scope.returnPage = $location.search().page || '/';
        $scope.onSubmit = function() {
            authentication.register($scope.formData).error(function(err) {
                $scope.formError = err;
            }).then(function() {
                $location.search('page', null);
                $location.path($scope.returnPage);
            });
        };

};
angular.module('myApp')
.directive('matchValidator', function() {
    return {
      require: 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          console.log(scope.$eval(attrs.matchValidator));
          ngModel.$setValidity('match', value == scope.$eval(attrs.matchValidator));
          return value;
        });
      }
    }
  })
  .directive('passwordCharactersValidator', function() {
    var PASSWORD_FORMATS = [
      /[a-z]+/, //letters
      /\d+/ //numbers
    ];

    return {
      require: 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          var status = true;
          angular.forEach(PASSWORD_FORMATS, function(regex) {
            status = status && regex.test(value);
          });
          ngModel.$setValidity('password-characters', status);
          return value;
        });
      }
    }
  })
})();

