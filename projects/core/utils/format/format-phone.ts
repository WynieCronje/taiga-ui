/**
 * Formats a string with a phone format + 7XXXXXXXXXX or XXXXXXXXXX by adding brackets and hyphens
 * @param value string to format
 * @param countryCode country dialing code
 * @param phoneMask phone number mask
 * @return formatted phone line like +7 XXX XXX-XX-XX
 */
export function formatPhone(
    value: string,
    countryCode: string,
    phoneMask: string,
): string {
    if (!value) {
        return '';
    }

    let result = countryCode;

    if (!value.startsWith(countryCode)) {
        value = countryCode + value.replace('+', '');
    }

    const splitPhoneMask = phoneMask.split('');
    const splitValue = value.slice(countryCode.length).split('');

    result += ' ';

    if (splitValue.length === 0) {
        return result;
    }

    for (let i = 0; i < splitPhoneMask.length; i++) {
        if (splitValue.length === 0) {
            break;
        }

        if (splitPhoneMask[i] === '#') {
            result += splitValue[0] || '';
            splitValue.splice(0, 1);
        } else {
            result += splitPhoneMask[i];
        }
    }

    return result;
}
