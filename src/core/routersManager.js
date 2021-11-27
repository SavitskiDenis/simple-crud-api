const bodyReader = require('../bodyReader');

class RoutersManager {
    constructor (controllers) {
        if (!Array.isArray(controllers)) {
            throw new Error();
        }
        this.controllers = controllers;
    }

    async manage (req, resp) {
        let handler = null;
        for (const controller of this.controllers) {
            handler = controller.getRequestHandler(req.url, req.method);
            if (handler) {
                break;
            }
        }

        if (handler) {
            try {
                req.body = await bodyReader(req);
            }   catch (err) {
                resp.statusCode = 500;
                resp.end(err.message);
                return;
            }

            handler(req, resp);
        }   else {
            resp.statusCode = 404;
            resp.end('Not correct api path');
        }
    }
}

module.exports = RoutersManager;