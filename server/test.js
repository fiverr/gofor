const TestServer = require('./');
const PORT = 3344;
const testServer = new TestServer(PORT);
const Gofor = require('..');

describe('E2E test', () => {
    describe('Headers', () => {
        describe('As object literals', () => {

            it('accepts headers as an object literal (defaults)', (done) => {
                const gofor = new Gofor({
                    headers: {'X-Custom-Header': 'Custom-Value'}
                });

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`)
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        assert.equal(request.headers['x-custom-header'], 'Custom-Value');
                        done();
                    }
                );
            });

            it('accepts headers as an object literal (supplied)', (done) => {
                const gofor = new Gofor({
                    headers: {'X-Custom-Header': 'Custom-Value'}
                });

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`, {headers: {'X-Custom-Header-A': 'Custom-Value-A'}})
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        assert.equal(request.headers['x-custom-header'], 'Custom-Value');
                        assert.equal(request.headers['x-custom-header-a'], 'Custom-Value-A');
                        done();
                    }
                );
            });

            it('supplied headers *RUN OVER* defaults', (done) => {
                const gofor = new Gofor({
                    headers: {'X-Custom-Header': 'Custom-Value'}
                });

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`, {headers: {'X-Custom-Header-A': 'Custom-Value-A',
                            'X-Custom-Header': 'Custom-Value-X'}})
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        assert.equal(request.headers['x-custom-header'], 'Custom-Value-X');
                        assert.equal(request.headers['x-custom-header-a'], 'Custom-Value-A');
                        done();
                    }
                );
            });
        });

        describe('As a Headers instance', () => {
            it('accepts headers a Headers instance (defaults)', (done) => {
                const headers = new Headers();
                headers.append('X-Custom-Header', 'Custom-Value');

                const gofor = new Gofor({headers});

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`)
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        expect(request.headers['x-custom-header']).to.equal('Custom-Value');
                    },
                    done
                );
            });

            it('accepts headers a Headers instance (supplied)', (done) => {
                const gofor = new Gofor();

                const headers = new Headers();
                headers.append('X-Custom-Header', 'Custom-Value');

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`, {headers})
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        expect(request.headers['x-custom-header']).to.equal('Custom-Value');
                    },
                    done
                );
            });

            it('supplied headers *RUN OVER* defaults', (done) => {
                const headers = new Headers();
                headers.append('X-Custom-Header', 'Custom-Value');

                const supplied = new Headers();
                supplied.append('X-Custom-Header', 'Custom-Value-X');
                supplied.append('X-Custom-Header-A', 'Custom-Value-A');

                const gofor = new Gofor({headers});

                testServer.exec(
                    () => {
                        gofor.fetch(`http://localhost:${PORT}`, {headers: supplied})
                            .catch((error) => {
                                assert(false, error);
                                done();
                            });
                    },
                    (request) => {
                        expect(request.headers['x-custom-header']).to.equal('Custom-Value-X');
                        expect(request.headers['x-custom-header-a']).to.equal('Custom-Value-A');
                    },
                    done
                );
            });
        });
    });
});
