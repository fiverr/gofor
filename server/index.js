const http = require('http');
const noop = () => {}; // eslint-disable-line no-empty-function

/**
 * TestServer
 * @private
 * @param {number} [port]
 */
module.exports = class TestServer {
    constructor(port = 1337) {
        this.port = port;
        this.node = null;
    }

    /**
     * Executes a test on a server
     * @param  {Function} premise
     * @param  {Function} test
     * no return value
     */
    exec(premise = noop, test = noop, done = noop) {
        this.node && this.node.close();

        this.node = http.createServer((request, response) => {
            setTimeout(() => {
                this.node.close();
                done();
            }, 300);

            test(request);

            response.writeHead(201, { 'Content-Type': 'text/plain' });
            response.end('okay');
        });

        this.node.keepAliveTimeout = 1000;
        this.node.listen(this.port);

        this.node.on('error', (error) => console.error(error.stack));

        this.node.on('connection', (socket) => socket.setTimeout(1500));

        premise();

        return this.node;
    }
};
