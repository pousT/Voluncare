var app = require('../../app.js'),
       should = require('should'),
       mongoose = require('mongoose'),
       Recharge = mongoose.model('Recharge');
var recharge;
describe('Recharge Model Unit Tests:', function() {
     beforeEach(function(done) {
      var amount = 1000;
      var method = '微信';
      var card = 2345;
      var userName = 'user';
      var uid = '589675a73cd4385a0520fcad';
      var telephone = '17858951932';
       recharge = new Recharge({
                "amount": amount,
                "user": uid,
                "card": card,
                "method": method,
                "userName": userName,
                "telephone": telephone
            });
    
    done(); });
describe('Testing the save method', function() {
   it('Recharge should be able to save without problems', function() {
        recharge.save(function(err) {
                   should.not.exist(err);
        });
    });
  it('Should not be able to save recharge without amount',
   function() {
         recharge.amount = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    }); 
    it('Should not be able to save recharge with amount is not a number',
   function() {
         recharge.amount = 'string';
         recharge.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a recharge without user',
   function() {
         recharge.user = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a recharge without card info',
   function() {
         recharge.card = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a recharge without method',
   function() {
         recharge.method = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    }); 

  it('Should not be able to save a recharge without userName',
   function() {
         recharge.userName = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    });
  it('Should not be able to save a recharge without telephone',
   function() {
         recharge.telephone = '';
         recharge.save(function(err) {
           should.exist(err);
        });
    });
 });
  afterEach(function(done) {
           Recharge.remove(function() {
             done();
      });
  });
});