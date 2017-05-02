var app = require('../../app.js'),
       should = require('should'),
       mongoose = require('mongoose'),
       request = require('supertest'),
       User = mongoose.model('User');
var user, token;
 describe('User Controller Unit Tests:', function() {
     beforeEach(function(done) {
       user = new User({
         name: 'testName',
         telephone: '1234567',
         address: 'China',
         birthday: new Date(),
         gender: 'female',
         status: 1
        });
    var upwd = "passward";
    user.setPassword(upwd);
       user.save( function() {});
   request(app)
      .post('/api/login')
      .send({ telephone: user.telephone, password: upwd })
      .end(function(err, res) {
        token = res.body.token; 
        done();
      }); 
  });  
    describe('Testing the GET methods', function() {
       it('Should be able to get the list of users', function(done){
         request(app).get('/api/users')
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
             res.body.should.be.an.Array.and.have.lengthOf(1);
             res.body[0].should.have.property('name', user.name);
            done(); 
            });
        });
       it('Should be not able to get the list of users with normal user account', function(done){
       var normaltoken;
       var normaluser = new User({
         name: 'testName',
         telephone: '123456789',
         address: 'China',
         birthday: new Date(),
         gender: 'female'
      });
      var upwd = "passward";
      normaluser.setPassword(upwd);
      normaluser.save(function(err) {
                 should.not.exist(err);
      });
      request(app)
        .post('/api/login')
        .send({ telephone: '123456789', password: upwd })
        .end(function(err, res) {
          normaltoken = res.body.token; 
        });                     
         request(app).get('/api/users')
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + normaltoken)
           .expect('Content-Type', /json/)
           .expect(400)
           .end(function(err, res) {
            done(); 
            });
        }); 
         it('Should be able to get the user object', function(done){
         request(app).get('/api/user')
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
             res.body.should.be.an.Object;
             res.body.should.have.property('name', user.name);
            done(); 
            });
        });
         it('Should not be able to get the user object without logging in', function(done){
         request(app).get('/api/user')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(404)
           .end(function(err, res) {
            done(); 
            });
        });              
    });  
    afterEach(function(done) {
       User.remove().exec();
       done();
    });
  });