const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

describe('Scenario 2', () => {
    test('Get /peson/123123, expected code 400', async () => {
        const res = await request.get('/person/123123');

        expect(res.statusCode).toEqual(400);
    });

    test('Get /peson/123123, expected code 404', async () => {
        const res = await request.get('/person/517d17b0-5049-11ec-9743-c5c45d7d796d');

        expect(res.statusCode).toEqual(404);
    });

    test('PUT /peson/123123, expected code 400', async () => {
        const res = await request.put('/person/123123');

        expect(res.statusCode).toEqual(400);
    });

    test('PUT /peson/123123, expected code 400', async () => {
        const res = await request.put('/person/517d17b0-5049-11ec-9743-c5c45d7d796d');

        expect(res.statusCode).toEqual(404);
    });

    test('DELETE /peson/123123, expected code 400', async () => {
        const res = await request.delete('/person/123123');

        expect(res.statusCode).toEqual(400);
    });

    test('DELETE /peson/123123, expected code 400', async () => {
        const res = await request.delete('/person/517d17b0-5049-11ec-9743-c5c45d7d796d');

        expect(res.statusCode).toEqual(404);
    });
});