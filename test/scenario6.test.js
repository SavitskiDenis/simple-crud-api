const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

let id;

describe('Scenario 6', () => {
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

    test('PUT with {} payload, expected text \'Not found required field: name\'', async () => {
        const res = await request.put(`/person/${id}`).send({});

        expect(res.text).toEqual('Not found required field: name');
    });

    test('PUT with { name: \'name\' } payload, expected text \'Not found required field: age\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 'name' });

        expect(res.text).toEqual('Not found required field: age');
    });

    test('PUT with { name: \'name\', age: 10 } payload, expected text \'Not found required field: hobbies\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 'name', age: 10 });

        expect(res.text).toEqual('Not found required field: hobbies');
    });

    test('PUT with { name: 12, age: 10, hobbies: [] } payload, expected text \'Field name is not a string\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 12, age: 10, hobbies: [] });

        expect(res.text).toEqual('Field name is not a string');
    });

    test('PUT with { name: \'name\', age: \'10\', hobbies: [] } payload, expected text \'Field age is not a number\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 'name', age: '10', hobbies: [] });

        expect(res.text).toEqual('Field age is not a number');
    });

    test('PUT with { name: \'name\', age: 10, hobbies: 1 } payload, expected text \'Field hobbies is not a array\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 'name', age: 10, hobbies: 1 });

        expect(res.text).toEqual('Field hobbies is not a array');
    });

    test('PUT with { name: \'name\', age: 10, hobbies: [ 1 ] } payload, expected text \'Value by index 0 of hobbies array is not string\'', async () => {
        const res = await request.put(`/person/${id}`).send({ name: 'name', age: 10, hobbies: [ 1 ] });

        expect(res.text).toEqual('Value by index 0 of hobbies array is not string');
    });
});