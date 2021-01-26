import {CHAR_NO_BREAK_SPACE} from '@taiga-ui/cdk';
import {formatNumber} from '../format-number';

describe('Number formatting', () => {
    it('Insert separator for numbers> 999', () => {
        expect(formatNumber(1000)).toBe(`1${CHAR_NO_BREAK_SPACE}000`);
    });

    it('Correctly inserts a separator for one major order', () => {
        expect(formatNumber(1234567)).toBe(
            `1${CHAR_NO_BREAK_SPACE}234${CHAR_NO_BREAK_SPACE}567`,
        );
    });

    it('Correctly inserts a separator for the two highest orders', () => {
        expect(formatNumber(12345678)).toBe(
            `12${CHAR_NO_BREAK_SPACE}345${CHAR_NO_BREAK_SPACE}678`,
        );
    });

    it('Correctly inserts a separator for the three highest orders', () => {
        expect(formatNumber(123456789)).toBe(
            `123${CHAR_NO_BREAK_SPACE}456${CHAR_NO_BREAK_SPACE}789`,
        );
    });

    it('Preserves minus', () => {
        expect(formatNumber(-123)).toBe('-123');
    });

    it('Preserves fractional part', () => {
        expect(formatNumber(1.234)).toBe('1,234');
    });

    it('Finishes the fractional part with zeros to the specified value', () => {
        expect(formatNumber(123, 2)).toBe('123,00');
    });

    it('Discards the extra fractional part', () => {
        expect(formatNumber(1.234, 2)).toBe('1,23');
    });

    it('Discards the fractional part altogether', () => {
        expect(formatNumber(5.678, 0)).toBe('5');
    });

    it('Accepts a custom decimal separator', () => {
        expect(formatNumber(123.45, 2, '.')).toBe('123.45');
    });
});
