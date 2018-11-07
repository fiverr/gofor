const {gofor} = Gofor = require('..');

describe('gofor', () => {
    it('Should import an instance of Gofor', () => {
        assert.instanceOf(gofor('http://httpbin.org/get'), Promise, 'Gofor.gofor exposes a promise (fetch)');
    });
    it('Should import more instances of Gofor', () => {
        const a = Gofor.gofor;
        const b = Gofor.gofor;
        assert.notEqual(a, b);
    });
})
