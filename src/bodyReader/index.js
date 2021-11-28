const readBody = (req) => {
    return new Promise((resolve, reject) => {
        let result = '';
        req.on('data', chunk => {
            result += chunk.toString();
        })
            .on('end', () => {
                resolve(result);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = readBody;