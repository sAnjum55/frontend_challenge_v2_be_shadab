export function valueFormater(str) {
    if (str == 'N/A') return null;
    if (str == 'Unknown') return null;
    if (!str) return null
    return str
}