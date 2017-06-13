var should = require('should');
var repository = require('./repository');

describe('Repository', () => {

  it('should connect with a promise', () => {
    repository.connect().should.be.a.Promise();
  });

  it('should throw an exception if it is not created with a host, username, password and port', () => {
    
    return Promise.all([
      repository.connect({
        //host: 'localhost',
        user: 'vicky',
        password: 123,
        port: 3306
        }).should.be.rejectedWith(/host/),

      repository.connect({
        host: 'localhost',
        // user: 'vicky',
        password: 123,
        port: 3306
        }).should.be.rejectedWith(/user/),

      repository.connect({
        host: 'localhost',
        user: 'vicky',
        // password: 123,
        port: 3306
        }).should.be.rejectedWith(/password/),

      repository.connect({
        host: 'localhost',
        user: 'vicky',
        password: 123,
        // port: 3306
        }).should.be.rejectedWith(/port/),

      ]);
  });
  
});