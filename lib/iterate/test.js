const iterate = require('.');


describe('Lib', () => {
    describe('iterate', () => {
        let values;
        const lambda = (k, v) => values.push([k, v]);

        beforeEach(() => {
            values = [];
        });

        it('Supports iteration over objects', () => {
            const object = {a: 1, b: 2};
            iterate(object, lambda);

            values.forEach(([k, v]) => {
                expect(object[k]).to.equal(v);
            });
        });

        it('Supports iteration over maps', () => {
            const map = new Map();
            map.set('a', 1);
            map.set('b', 2);

            iterate(map, lambda);

            values.forEach(([k, v]) => {
                expect(map.get(k)).to.equal(v);
            });
        });
    });
});
