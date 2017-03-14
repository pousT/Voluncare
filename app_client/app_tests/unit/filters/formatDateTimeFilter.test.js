describe('Filters', function(){ 
    beforeEach(module('myApp'));

    describe('format datetime filter', function() {
      var formatDateFilter;
      beforeEach(inject(function($filter){
        formatDateFilter = $filter('formatDateTime', {});
      }));
      it('Should return a format date', function(){  //write tests
          expect(formatDateFilter('2016-11-25T16:00:00.000')).toBe('2016-11-26 00:00'); 
      });
    });

});