const request = require('supertest');

describe('GET LOCATION/ ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/location?search=Portland');

        expect(response.body).toEqual({
            formatted_query: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET WEATHER/ ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/weather');

        expect(response.body[0]).toEqual({
            forecast: expect.any(String),
            time: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET YELP / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/reviews');

        expect(response.body[0]).toEqual({
            name: expect.any(String),
            image: expect.any(String),
            price: expect.any(String),
            rating: expect.any(Number),
            url: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET EVENTS / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/events');

        expect(response.body[0]).toEqual({
            link: expect.any(String),
            name: expect.any(String),
            date: expect.any(String),
            summary: null
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET TRAILS / ', () => {
    test('It should respond with correctly formatted data', async (done) => {
        const response = await request(`https://sleepy-coast-13591.herokuapp.com`)
            .get('/trails');

        expect(response.body[0]).toEqual({
            name: expect.any(String),
            location: expect.any(String),
            length: expect.any(Number),
            stars: expect.any(Number),
            star_votes: expect.any(Number),
            summary: expect.any(String),
            trail_url: expect.any(String),
            conditions: expect.any(String),
            condition_date: expect.any(String),
            condition_time: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});