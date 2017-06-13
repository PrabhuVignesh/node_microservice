var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Users API', () => {

  var app = null;
  var testUsers = [{
      email: 'stark@vicky.com',
      phone_number: '+91 9876543219'
    }, {
      email: 'spidy@vicky.com',
      phone_number: '+91 9876543219'
    }
  ];
  var testRepo = {
    getUsers: () => { 
      return Promise.resolve(testUsers);
    },
    getUserByEmail: (email) => { 
      return Promise.resolve(testUsers.find((user) => {
        return user.email === email;
      }));
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect(function(res) {
        res.body.should.containEql({
          email: 'hulk@vicky.com',
          phoneNumber: '+91 9876543219'
        });
      res.body.should.containEql({
          email: 'wonderwomen@vicky.com',
          phoneNumber: '+91 9876543219'
        });
      })
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    request(app)
      .get('/search?email=prabhu@sample.com')
      .expect(404, done);
  });

  it('returns a 200 for a known user', (done) => {

    request(app)
      .get('/search?email=hulk@vicky.com')
      .expect(200, done);
  });

});