class Router {
    constructor (path) {
        path = path[0] !== '/' ? `/${path}` : path;
        path = path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;

        this.path = path;
        this.routes = {
            GET: null,
            POST: null,
            PUT: null,
            DELETE: null
        }
    }

    getRequestHandler (url, method) {
        if (typeof method === 'string' && this.routes[method]) {
            let [ reqPath ] = url.split('?');
            reqPath = reqPath[0] !== '/' ? `/${reqPath}` : reqPath;
            reqPath = reqPath[reqPath.length - 1] !== '/' ? `${reqPath}/` : reqPath;

            for (const [routePath, handler] of this.routes[method]) {
                let roterRegex = new RegExp(`^${this.path + routePath}$`);

                if (roterRegex.test(reqPath)) {
                    return handler;
                }
            }
        }
        return null;
    }

    setHandler (method, path, handler) {
        if (typeof method === 'string' && this.routes.hasOwnProperty(method) && typeof path === 'string' && typeof handler === 'function') {
            if (!this.routes[method]) {
                this.routes[method] = new Map();
            }

            path = path[0] !== '/' ? `/${path}` : path;

            path = path[path.length - 1] !== '/' ? `${path}/` : path;

            this.routes[method].set(path, handler);
        }   else {
            throw new Error('Args error');
        }
    }

    GET (path, handler) {
        this.setHandler('GET', path, handler);
    }

    POST (path, handler) {
        this.setHandler('POST', path, handler);
    }

    PUT (path, handler) {
        this.setHandler('PUT', path, handler);
    }

    DELETE (path, handler) {
        this.setHandler('DELETE', path, handler);
    }
}

module.exports = Router;