const Gofor = require('..');

describe('Gofor', () => {
    describe('toHeaders', () => {
        const gofor = new Gofor();
        const Headers = global.Headers;

        afterEach(() => {
            global.Headers = Headers;
        });

        it('converts headers object to Headers instance', () => {
            const headers = gofor.toHeaders({a: 1});
            expect(headers).to.be.an.instanceof(Headers);
            expect(headers.keys).to.be.a('function');
            expect(headers.keys().next).to.be.a('function');
            expect(headers.keys().next()).have.all.keys('done', 'value');
        });

        it('Does not convert headers when Headers is unavailable', () => {
            delete require.cache[require.resolve('..')];
            global.Headers = null;
            const Gofor = require('..');
            const gofor = new Gofor;

            const headers = gofor.toHeaders({a: 1});
            expect(headers.keys).to.not.be.a('function');
        });
    });
});
