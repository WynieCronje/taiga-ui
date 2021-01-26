import {TuiTextMaskPipeResult} from '../../../mask/text-mask-pipe-result';
import {tuiCreateAutoCorrectedNumberPipe} from '../create-auto-corrected-money-pipe';

const DUMMY: any = 'any';

function wrapper(
    rawString: string,
    decimalLimit?: number,
    decimalSymbol?: ',' | '.',
): string {
    return (tuiCreateAutoCorrectedNumberPipe(decimalLimit, decimalSymbol)(
        rawString,
        DUMMY,
    ) as TuiTextMaskPipeResult).value;
}

describe('tuiCreateAutoCorrectedNumberPipe returns', () => {
    describe('the original string if it is', () => {
        it('empty', () => {
            expect(wrapper('')).toBe('');
        });

        it('if there is no comma in it, and it is not needed (by default)', () => {
            expect(wrapper('-123')).toBe('-123');
        });

        it('if the fractional part matches the format', () => {
            expect(wrapper('123,45', 2)).toBe('123,45');
        });

        it('if there is a dot and a separator character is a dot', () => {
            expect(wrapper('123.45', 2, '.')).toBe('123.45');
        });
    });

    describe('corrected string if fractional part', () => {
        it('shorter than given', () => {
            expect(wrapper('123,00', 4)).toBe('123,0000');
        });

        it('completely absent, but needed', () => {
            expect(wrapper('123', 2)).toBe('123,00');
        });

        it('completely absent, but needed, with a dot separator', () => {
            expect(wrapper('123', 2, '.')).toBe('123.00');
        });
    });
});
