const uuid = require('uuid');
const { Router } = require('../core');
const Validator = require('../validator');

const personValidator = new Validator({
    name: { required: true, type: 'string' },
    age: { required: true, type: 'number' },
    hobbies: { required: true, type: 'array', item: { type: 'string' } }
});

const parseAndCheckId = (url) => {
    const parsedUrl = url.split('/').filter(el => el !== '');
    const uuidParam = parsedUrl[parsedUrl.length - 1];

    if (!uuid.validate(uuidParam)) {
        return null;
    }

    return uuidParam;
};

const personData = new Map();

const personRouter = new Router('/person');

personRouter.GET('/', (_, resp) => {
    const result = [];
    personData.forEach((value, key) => {
        result.push(
            {
                ...value,
                id: key
            }
        );
    });

    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify(result));
});

personRouter.GET('/[A-Za-z0-9_-]+', (req, resp) => {
    const uuidParam = parseAndCheckId(req.url);

    if (!uuidParam) {
        resp.statusCode = 400;
        resp.end('Not valid id');
        return;
    }

    if (!personData.has(uuidParam)) {
        resp.statusCode = 404;
        resp.end(`Not found person by ${uuidParam}`);
        return;
    }

    const person = {
        ...personData.get(uuidParam),
        id: uuidParam
    }

    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify(person));
});

personRouter.POST('/', async (req, resp) => {
    let payload;
    try {
        payload = JSON.parse(req.body);
        personValidator.validate(payload);
    }   catch (err) {
        resp.statusCode = 400;
        resp.end(err.message);
        return
    }

    const id = uuid.v1();
    personData.set(id, payload);

    resp.setHeader('Content-Type', 'application/json');
    resp.statusCode = 201;
    resp.end(JSON.stringify({
        ...payload,
        id
    }));
});

personRouter.DELETE('/[A-Za-z0-9_-]+', (req, resp) => {
    const uuidParam = parseAndCheckId(req.url);

    if (!uuidParam) {
        resp.statusCode = 400;
        resp.end('Not valid id');
        return;
    }

    if (!personData.has(uuidParam)) {
        resp.statusCode = 404;
        resp.end(`Not found person by ${uuidParam}`);
        return;
    }

    personData.delete(uuidParam);

    resp.statusCode = 204;
    resp.end();
});

personRouter.PUT('/[A-Za-z0-9_-]+', async (req, resp) => {
    const uuidParam = parseAndCheckId(req.url);

    if (!uuidParam) {
        resp.statusCode = 400;
        resp.end('Not valid id');
        return;
    }

    if (!personData.has(uuidParam)) {
        resp.statusCode = 404;
        resp.end(`Not found person by ${uuidParam}`);
        return;
    }

    let payload;
    try {
        payload = JSON.parse(req.body);
        personValidator.validate(payload);
    }   catch (err) {
        resp.statusCode = 400;
        resp.end(err.message);
        return
    }

    personData.set(uuidParam, payload);
    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify({
        ...personData.get(uuidParam),
        id: uuidParam
    }));
});

module.exports = personRouter;