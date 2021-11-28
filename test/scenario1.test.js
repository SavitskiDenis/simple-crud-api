const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

let id;

describe('Scenario 1', () => {
    test('Get all persons, expected empty array', async () => {
        const res = await request.get('/person');

        expect(res.body).toEqual([]);
    });

    test('Create new person, expected created person', async () => {
        const res = await request
            .post('/person')
            .send({
                name: 'Igor',
                age: 12,
                hobbies: ['video games']
            });

        const person = res.body;
        id = person.id;
        expect(person.name).toEqual('Igor');
    });

    test('Get person by id, expected person object', async () => {
        const res = await request.get(`/person/${id}`);

        expect(res.body.name).toEqual('Igor');
    });

    test('Delete person by id, expected 204 code', async () => {
        const res = await request.delete(`/person/${id}`);

        expect(res.statusCode).toEqual(204);
    });

    test('Get person by id, expected 404 code', async () => {
        const res = await request.get(`/person/${id}`);

        expect(res.statusCode).toEqual(404);
    });
});