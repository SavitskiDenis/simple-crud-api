const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

let id;

describe('Scenario 3', () => {
    test('Create person with name Igor, age 20, not hobbies, expected name Igor', async () => {
        const res = await request
            .post('/person')
            .send({
                name: 'Igor',
                age: 20,
                hobbies: []
            });

        const person = res.body;
        id = person.id;
        expect(person.name).toEqual('Igor');
    });

    test('Set Igor age to 18, expected age equal 18', async () => {
        const res = await request
            .put(`/person/${id}`)
            .send({
                name: 'Igor',
                age: 18,
                hobbies: []
            });

        expect(res.body.age).toEqual(18);
    });

    test('Delete person Igor by id, expected 204 code', async () => {
        const res = await request.delete(`/person/${id}`);

        expect(res.statusCode).toEqual(204);
    });
});