// we will use supertest to test HTTP requests/responses
const request = require('supertest');
// we also need our app for the correct routes!
const { app } = require('./app.js');

describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/location');

        expect(response.body).toEqual({
            formatted_query: '30 NW 10th Ave, Portland, OR 97209, USA', 
            latitude: 45.5234211, 
            longitude: -122.6809008
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});