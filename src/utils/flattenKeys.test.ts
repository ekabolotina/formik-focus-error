import flattenKeys from './flattenKeys';

describe('flattenKeys', () => {
    it('should work with objects', () => {
        const input = {
            a: 'a',
            b: 'b',
            c: 'c',
        };
        const output = {
            a: 'a',
            b: 'b',
            c: 'c',
        };

        expect(flattenKeys(input)).toStrictEqual(output);
    });

    it('should work with nested objects', () => {
        const input = {
            a: {
                b: {
                    c: 'c',
                },
                d: 'd',
            },
            e: 'e',
        };
        const output = {
            'a.b.c': 'c',
            'a.d': 'd',
            e: 'e',
        };

        expect(flattenKeys(input)).toStrictEqual(output);
    });

    it('should work with nested arrays', () => {
        const input = {
            a: {
                b: {
                    c: 'c',
                },
            },
            d: 'd',
            e: [
                {
                    f: 'f',
                    g: 'g',
                },
                'h',
                ['i', 'j', 'k'],
            ],
        };
        const output = {
            'a.b.c': 'c',
            d: 'd',
            'e[0].f': 'f',
            'e[0].g': 'g',
            'e[1]': 'h',
            'e[2][0]': 'i',
            'e[2][1]': 'j',
            'e[2][2]': 'k',
        };

        expect(flattenKeys(input)).toStrictEqual(output);
    });

    it('should do nothing with empty object', () => {
        expect(flattenKeys({})).toStrictEqual({});
    });

    it('should not mutate input object', () => {
        const input = {
            a: {
                b: {
                    c: 'c',
                },
                d: 'd',
            },
            e: 'e',
        };

        flattenKeys(input);

        expect(input).toStrictEqual(input);
    });
});
