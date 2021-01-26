import {CHAR_NO_BREAK_SPACE} from '@taiga-ui/cdk';
import {maskedNumberStringToNumber} from '../masked-number-string-to-number';

describe('Converts the text value of the number obtained from the mask to a number', () => {
    it('The separator works correctly', () => {
        expect(
            maskedNumberStringToNumber(
                `12${CHAR_NO_BREAK_SPACE}345${CHAR_NO_BREAK_SPACE}678`,
            ),
        ).toBe(12345678);
    });

    it('Correctly fulfills the fractional part', () => {
        expect(maskedNumberStringToNumber('1,23')).toBe(1.23);
    });

    it('Returns NaN if the string cannot be converted to a number', () => {
        expect(maskedNumberStringToNumber('Game')).toBeNaN();
    });
});
