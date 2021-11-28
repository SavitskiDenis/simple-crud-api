const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

let id;

describe('Scenario 4', () => {
    beforeAll(async () => {
        const res = await request
            .post('/person')
            .send({
                name: 'Igor',
                age: 20,
                hobbies: []
            });
        id = res.body.id;
    });

    afterAll(async () => {
        await request.delete(`/person/${id}`);
    });

    test('POST without payload, expected code 400', async () => {
        const res = await request.post(`/person`);

        expect(res.statusCode).toEqual(400);
    });

    test('PUT without payload, expected code 400', async () => {
        const res = await request.put(`/person/${id}`);

        expect(res.statusCode).toEqual(400);
    });
});