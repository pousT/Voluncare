describe('homeCtrl', function() {
  beforeEach(module('myApp'));

  var scope, homeCtrl;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    homeCtrl = $controller('homeCtrl', {
        $scope :scope
    });
  }));
  it('user should not sign up for events if money is not enough', function() {
    expect(scope.user).toBe(0);
  })
});