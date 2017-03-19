describe('rechargeAdminCtrl', function() {
  beforeEach(module('myApp'));

  var $httpBackend, $rootScope, createController, authRequestHandler;
  var resData = [
    {
      "_id": "58c88b1a1fbf13c89dc50fbb",
      "amount": 10000,
      "user": "589675a73cd4385a0520fcad",
      "method": "支付宝",
      "userName": "soup233",
      "telephone": "15102227918",
      "__v": 0,
      "flag": 1,
      "time": "2017-03-15T00:30:18.990Z"
    }
  ];
  beforeEach(module(function($provide) {
    $provide.value('$ionicTemplateCache', function(){} );
  }));

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));
   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     rechargeRequestHandler = $httpBackend.when('GET', '/api/recharges')
                            .respond(resData);

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('rechargeAdminCtrl', {'$scope' : $rootScope });
     };
   }));
   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('should fetch recharge list', function() {
     $httpBackend.expectGET('/api/recharges');
     var controller = createController();
     $httpBackend.flush();
   });
   it('should fail get recharge list', function() {
     rechargeRequestHandler.respond(400, '');

     $httpBackend.expectGET('/api/recharges');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.message).toBe('读取充值列表失败');
   });
   it('should send put request to server', function() {
     var controller = createController();
     $httpBackend.flush();

     // now you don’t care about the authentication, but
     // the controller will still send the request and
     // $httpBackend will respond without you having to
     // specify the expectation and response for this request

     $httpBackend.expectPUT('/api/recharge/pass',  {"rid":"message content"}).respond(200, '');
     $rootScope.pass('message content');
     $httpBackend.flush();
     expect($rootScope.message).toBe('已通过');
   });

});