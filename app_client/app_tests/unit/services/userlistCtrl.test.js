describe('userlistCtrl', function() {
    //我们会在测试中使用这个scope
    var scope, $httpBackend;

    //模拟我们的Application模块并注入我们自己的依赖
    beforeEach(module('myApp'));
  beforeEach(module(function($provide) {
    $provide.value('$ionicTemplateCache', function(){} );
  }));

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));
    //模拟Controller，并且包含 $rootScope 和 $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
        //设置$httpBackend冲刷$http请求
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/api/users').respond([{
            id: 1,
            name: 'Bob'
        }, {
            id: 2,
            name: 'Jane'
        }]);
        //创建一个空的 scope
        scope = $rootScope.$new();

        //声明 Controller并且注入已创建的空的 scope
        $controller('userlistCtrl', {
            $scope: scope
        });
    }));

    // 测试从这里开始
    it('should fetch list of users', function() {
        $httpBackend.flush();
        expect(scope.users.length).toBe(2);
        expect(scope.users[0].name).toBe('Bob');
    });
});