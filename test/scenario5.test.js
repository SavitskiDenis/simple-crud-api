const { expect } = require('@jest/globals');
const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4305}`);

describe('Scenario 5', () => {
    test('POST with {} payload, expected text \'Not found required field: name\'', async () => {
        const res = await request.post('/person').send({});

        expect(res.text).toEqual('Not found required field: name');
    });

    test('POST with { name: \'name\' } payload, expected text \'Not found required field: age\'', async () => {
        const res = await request.post('/person').send({ name: 'name' });

        expect(res.text).toEqual('Not found required field: age');
    });

    test('POST with { name: \'name\', age: 10 } payload, expected text \'Not found required field: hobbies\'', async () => {
        const res = await request.post('/person').send({ name: 'name', age: 10 });

        expect(res.text).toEqual('Not found required field: hobbies');
    });

    test('POST with { name: 12, age: 10, hobbies: [] } payload, expected text \'Field name is not a string\'', async () => {
        const res = await request.post('/person').send({ name: 12, age: 10, hobbies: [] });

        expect(res.text).toEqual('Field name is not a string');
    });

    test('POST with { name: \'name\', age: \'10\', hobbies: [] } payload, expected text \'Field age is not a number\'', async () => {
        const res = await request.post('/person').send({ name: 'name', age: '10', hobbies: [] });

        expect(res.text).toEqual('Field age is not a number');
    });

    test('POST with { name: \'name\', age: 10, hobbies: 1 } payload, expected text \'Field hobbies is not a array\'', async () => {
        const res = await request.post('/person').send({ name: 'name', age: 10, hobbies: 1 });

        expect(res.text).toEqual('Field hobbies is not a array');
    });

    test('POST with { name: \'name\', age: 10, hobbies: [ 1 ] } payload, expected text \'Value by index 0 of hobbies array is not string\'', async () => {
        const res = await request.post('/person').send({ name: 'name', age: 10, hobbies: [ 1 ] });

        expect(res.text).toEqual('Value by index 0 of hobbies array is not string');
    });
});