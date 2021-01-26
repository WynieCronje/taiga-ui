import {formatPhone} from '../format-phone';

describe('Formatting your phone', () => {
    it('Inserts brackets and hyphens correctly', () => {
        expect(formatPhone('+78005557778', '+7', '(###) ###-##-##')).toEqual(
            `+7 (800) 555-77-78`,
        );
    });

    it('Works correctly with a string without countryCode', () => {
        expect(formatPhone('8005557778', '+7', '(###) ###-##-##')).toBe(
            `+7 (800) 555-77-78`,
        );
    });

    it('Inserts any other characters correctly', () => {
        expect(formatPhone('+78005557778', '+7', '/###/###_##_##')).toBe(
            `+7 /800/555_77_78`,
        );
    });

    it('returns country code with whitespace if only country code was inputed', () => {
        expect(formatPhone('+7', '+7', '/###/###_##_##')).toBe(`+7 `);
    });
});
