const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');
let server;

beforeAll(async () => {
    await sequelize.authenticate();
    server = app.listen(3000, () => {
        console.log('Test server started on port 3000');
    });
});

afterAll(async () => {
    if (server) {
        await server.close();
        console.log('Test server closed');
    }
    await sequelize.close();
});

describe('Test : Get all users', function() {
    it('* Json response - status : 200', async () => {
        await request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test : Get one user', function() {
    it('* Json response - status : 200', async () => {
        await request(app)
        .get('/api/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test : User not found', function() {
    it('* Json response - status : 404', async () => {
        await request(app)
        .get('/api/user/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
});

describe('Test : Create user', function() {
    it('* Json response - status : 201', async () => {
        const response = await request(app)
        .post('/api/createuser')
        .send({
            firstname : "Ok",
            lastname : "Ok"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
        process.env.TEST_ID = response.body.id;
    });
});

describe('Test : Cannot create user', function() {
    it('* Json response - status : 400', async () => {
        await request(app)
        .post('/api/createuser')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('Test : Update user', function() {
    it('* Json response - status : 200', async () => {
        await request(app)
        .put('/api/updateuser')
        .send({
            id : process.env.TEST_ID,
            firstname : "Okey"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test : Cannot update user', function() {
    it('* Json response - status : 400', async () => {
        await request(app)
        .put('/api/updateuser')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('Test : Delete user', function() {
    it('* Json response - status : 200', async () => {
        await request(app)
        .delete('/api/deleteuser')
        .send({
            id : process.env.TEST_ID
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test : Cannot delete user', function() {
    it('* Json response - status : 400', async () => {
        await request(app)
        .delete('/api/deleteuser')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('Test : User not found', function() {
    it('* Json response - status : 404', async () => {
        await request(app)
        .delete('/api/deleteuser')
        .send({
            id : -1
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
});