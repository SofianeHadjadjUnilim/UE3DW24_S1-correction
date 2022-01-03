const request = require('supertest');
const app = require('../app');

describe('Test : Get all users', function() {
    it('* Json response - status : 200', function(done) {
        request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('Test : Get one user', function() {
    it('* Json response - status : 200', function(done) {
        request(app)
        .get('/api/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('Test : User not found', function() {
    it('* Json response - status : 404', function(done) {
        request(app)
        .get('/api/user/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
});

describe('Test : Create user', function() {
    it('* Json response - status : 201', function(done) {
        request(app)
        .post('/api/createuser')
        .send({
            firstname : "Ok",
            lastname : "Ok"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
            process.env.TEST_ID = res.body.id;
        })
        .expect(201, done);
    });
});

describe('Test : Cannot create user', function() {
    it('* Json response - status : 500', function(done) {
        request(app)
        .post('/api/createuser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
});

describe('Test : Update user', function() {
    it('* Json response - status : 200', function(done) {
        request(app)
        .put('/api/updateuser')
        .send({
            id : process.env.TEST_ID,
            firstname : "Okey"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('Test : Cannot update user', function() {
    it('* Json response - status : 500', function(done) {
        request(app)
        .put('/api/updateuser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
});

describe('Test : Delete user', function() {
    it('* Json response - status : 200', function(done) {
        request(app)
        .delete('/api/deleteuser')
        .send({
            id : process.env.TEST_ID
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('Test : Cannot delete user', function() {
    it('* Json response - status : 500', function(done) {
        request(app)
        .delete('/api/deleteuser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
});

describe('Test : User not found', function() {
    it('* Json response - status : 404', function(done) {
        request(app)
        .delete('/api/deleteuser')
        .send({
            id : -1
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
});