var app = require('../../app.js'),
       should = require('should'),
       mongoose = require('mongoose'),
       request = require('supertest'),
       Activity = mongoose.model('Activity'),
       User = mongoose.model('User');
var user, activity, token;
 describe('Activity Controller Unit Tests:', function() {
     beforeEach(function(done) {
      Activity.remove().exec();
      var title = 'activity1';
      var start = '2016-11-25T12:00:00.000Z';
      var end = '2016-11-26T12:00:00.000Z';
      var address = '赤坂亭';
      var description = 'free lunch with professors';
      var maxNum = 100;
      var creditReq = 0;
      var price = 200;
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
       user.save( function(data) {
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
         activity.save(function(err) {
        });
       });
   request(app)
      .post('/api/login')
      .send({ telephone: user.telephone, password: upwd })
      .end(function(err, res) {
        token = res.body.token; 
        done();
      });   
    });
    describe('Testing the GET methods', function() {
       it('Should be able to get the list of recharge record', function(done){
         request(app).get('/api/activities')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
             res.body.should.be.an.Array.and.have.lengthOf(1);
             res.body[0].should.have.property('title', activity.title);
             res.body[0].should.have.property('description', activity.description);
            done(); 
            });
        });
       it('Should be able to get the recharge record', function(done) {
         request(app).get('/api/activities/' + activity.id)
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
             res.body.should.be.an.Object.and.have.property('title', activity.title);
             res.body.should.have.property('description', activity.description);
        done(); });
        });
         it('Should be not able to get my recharge list without logging in', function(done){
         request(app).get('/api/myActivity')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
         it('Should be able to get my recharge list when logging in', function(done){
         request(app).get('/api/myActivity')
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
            done(); 
            });
        });
    });
    describe('Testing the PUT methods', function() {
       it('Should be able to reject', function(done){
        var data = {
          aid:activity.id
        }         
        request(app).put('/api/participate')
           .send(data)
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
            done(); 
            });
        });
       it('Should not be able to reject without logging in', function(done) {
        var data = {
          aid:activity.id
        }  
         request(app).put('/api/participate')
           .send(data)
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
         it('Should be not able to reject without recharge id', function(done){
         request(app).put('/api/participate')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .set('Authorization', 'Bearer ' + token)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
         it('Should be not able to view a user recharge records without recharge id', function(done){
         request(app).put('/api/signedUsers')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .set('Authorization', 'Bearer ' + token)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
         it('Should not be able to view users recharge record without an admin account', function(done){
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
         request(app).put('/api/signedUsers')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .set('Authorization', 'Bearer ' + normaltoken)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
    });
    describe('Testing the POST methods', function() {
       it('Should be able to put an recharge without problems', function(done){
        var activityData = {
                "title": "New Activity",
                "description": "please come and see",
                "start": '2016-11-25T12:00:00.000Z',
                "end": '2016-11-25T12:00:00.000Z',
                "address": 'my home',
                "maxNum": 10,
                "creditReq": 100,
                "price": 0,

            }            
         request(app).post('/api/activity')
           .send(activityData)
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
           .expect('Content-Type', /json/)
           .expect(200)
           .end(function(err, res) {
             res.body.should.be.an.Object.and.have.property('title', "New Activity");
             res.body.should.have.property('description', "please come and see");
            done(); 
            });
        });
       it('Should be not able to put an recharge record without logging in', function(done){
        var activityData = {
                "title": "New Activity",
                "description": "please come and see",
                "start": '2016-11-25T12:00:00.000Z',
                "end": '2016-11-25T12:00:00.000Z',
                "address": 'my home',
                "maxNum": 10,
                "creditReq": 100,
                "price": 0,

            }            
         request(app).post('/api/activity')
           .send(activityData)
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
    it('Should be not able to approve or reject a recharge with volunteer account', function(done){
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
        var activityData = {
                "title": "New Activity",
                "description": "please come and see",
                "start": '2016-11-25T12:00:00.000Z',
                "end": '2016-11-25T12:00:00.000Z',
                "address": 'my home',
                "maxNum": 10,
                "creditReq": 100,
                "price": 0,

            }            
         request(app).post('/api/activity')
           .send(activityData)
           .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + normaltoken)
           .expect('Content-Type', /json/)
           .expect(401)
           .end(function(err, res) {
            done(); 
            });
        });
    });    
    afterEach(function(done) {
       Activity.remove().exec();
       User.remove().exec();
       done();
    });
  });