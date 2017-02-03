(function() {
    angular.module('myApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$scope','$location','authentication'];
    function registerCtrl($scope,$location, authentication,dateService) {
        $scope.formData = {
            name: "",
            telephone: '',
            pw: '',
            pwc:'',
            birthday:'',
            address:'',
            sex:""
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
//日历测试
var currentDate = new Date();
var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 23);
$scope.date = date;
$scope.myFunction = function (date) {
  $scope.formData.birthday = date;
  console.log($scope.formData);
};

$scope.onezoneDatepicker = {
  date: date,
  mondayFirst: false,
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
  startDate: new Date(1989, 1, 26),
  endDate: new Date(2024, 1, 26),
  disablePastDays: false,
  disableSwipe: false,
  disableWeekend: false,
  disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
  showDatepicker: false,
  showTodayButton: true,
  calendarMode: false,
  hideCancelButton: false,
  hideSetButton: true,
  callback: $scope.myFunction
};

$scope.showDatepicker = function () {
  $scope.onezoneDatepicker.showDatepicker = true;
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
      /[A-Z]+/, //uppercase letters
      /\w+/, //other letters
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

