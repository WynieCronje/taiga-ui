import {CHAR_NO_BREAK_SPACE} from '@taiga-ui/cdk';
import {capitalize} from '../capitalize';

describe('Capitalize', () => {
    it('Capitalizes the first letter of a word', () => {
        expect(capitalize('бэн')).toBe('Бэн');
    });

    it('Capitalizes the first letter of each word', () => {
        expect(capitalize('папаша торк')).toBe('Папаша Торк');
    });

    it('Makes the rest of the word lowercase', () => {
        expect(capitalize('FULL THROTTLE')).toBe('Full Throttle');
    });

    it('Works for non-breaking space character', () => {
        expect(
            capitalize(
                `тяжёлый${CHAR_NO_BREAK_SPACE}запах${CHAR_NO_BREAK_SPACE}асфальта`,
            ),
        ).toBe(`Тяжёлый${CHAR_NO_BREAK_SPACE}Запах${CHAR_NO_BREAK_SPACE}Асфальта`);
    });

    it('A hyphenated word does not count as two words', () => {
        expect(capitalize('корлей-моторс')).toBe('Корлей-моторс');
    });

    it(`A dot inside a word doesn't split it in two`, () => {
        expect(capitalize('adrian.ripburger')).toBe('Adrian.ripburger');
    });

    it('A comma inside a word does not split it in two', () => {
        expect(capitalize('malcolm,corley')).toBe('Malcolm,corley');
    });

    it('Correctly fulfills all sorts of things', () => {
        expect(
            capitalize(
                'Добавь тЕст. где 2 предложения: с!Разными №знаками;препинания, ок?',
            ),
        ).toBe('Добавь Тест. Где 2 Предложения: С!разными №знаками;препинания, Ок?');
    });
});
