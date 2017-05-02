var app = require('../../app.js'),
       should = require('should'),
       mongoose = require('mongoose'),
       Activity = mongoose.model('Activity');
var activity;
describe('Activity Model Unit Tests:', function() {
     beforeEach(function(done) {
      var title = 'activity1';
      var start = '2016-11-25T12:00:00.000Z';
      var end = '2016-11-26T12:00:00.000Z';
      var address = '赤坂亭';
      var description = 'free lunch with professors';
      var maxNum = 100;
      var creditReq = 0;
      var price = 200;
       activity = new Activity({
                "title": title,
                "description": description,
                "start": start,
                "end": end,
                "address": address,
                "maxNumber": maxNum,
                "creditReq": creditReq,
                "price": price
            });
    
    done(); });
describe('Testing the save method', function() {
   it('Activity should be able to save without problems', function() {
        activity.save(function(err) {
                   should.not.exist(err);
        });
    });
  it('Should not be able to save an ativity without a title',
   function() {
         activity.title = '';
         activity.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save an activity without a description',
   function() {
         activity.description = '';
         activity.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save an activity without an address',
   function() {
         activity.address = '';
         activity.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save an activity without maxNum',
   function() {
         activity.maxNumber = '';
         activity.save(function(err) {
           should.exist(err);
        });
    }); 
    it('Should not be able to save an activity without price',
   function() {
         activity.price = '';
         activity.save(function(err) {
           should.exist(err);
        });
    });
    it('Should not be able to save an activity with price is not a number',
   function() {
         activity.price = 'String';
         activity.save(function(err) {
           should.exist(err);
        });
    });
  it('Should not be able to save an activity without start',
   function() {
         activity.start = '';
         activity.save(function(err) {
           should.exist(err);
        });
    });
  it('Should not be able to save an activity without end',
   function() {
         activity.end = '';
         activity.save(function(err) {
           should.exist(err);
        });
    });
 });
  afterEach(function(done) {
           Activity.remove(function() {
             done();
      });
  });
});