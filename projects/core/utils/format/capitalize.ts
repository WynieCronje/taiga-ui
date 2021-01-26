/**
 * Converts a string, replacing it with lowercase and making the first letter of each word uppercase
 * @param value line
 */
export function capitalize(value: string): string {
    return value.toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
}
