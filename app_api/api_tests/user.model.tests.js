var app = require('../../app.js'),
       should = require('should'),
       mongoose = require('mongoose'),
       User = mongoose.model('User');
var user;
describe('User Model Unit Tests:', function() {
     beforeEach(function(done) {
       user = new User({
         name: 'testName',
         telephone: '1234567',
         address: 'China',
         birthday: new Date(),
         gender: 'female'
    });
    var upwd = "passward";
    user.setPassword(upwd);
    done(); });
describe('Testing the save method', function() {
   it('User should be able to save without problems', function() {
        user.save(function(err) {
                   should.not.exist(err);
        });
    });
  it('Should not be able to save a user without a name',
   function() {
         user.name = '';
         user.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a user without a telephone',
   function() {
         user.telephone = '';
         user.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a user without an address',
   function() {
         user.address = '';
         user.save(function(err) {
           should.exist(err);
        });
    }); 
  it('Should not be able to save a user without gender',
   function() {
         user.gender = '';
         user.save(function(err) {
           should.exist(err);
        });
    });
    it('Should not be able to save with an existing telephone',
   function() {
        user.save(function(err) {
                   should.not.exist(err);
        });
         var user2 = new User({
         name: 'testName',
         telephone: '1234567',
         address: 'UK',
         birthday: new Date(),
         gender: 'male'
    });
    var upwd2 = "passward2";
    user2.setPassword(upwd2);
         user2.save(function(err) {
           should.exist(err);
        });
    });  

});

afterEach(function(done) {
         User.remove(function() {
           done();
    });
});
});
