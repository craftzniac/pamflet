export const keywords = ["Lnk", "Audio", "Img"];

export function isStartOfKeyword(char: string) {
    for (const keyword of keywords) {
        if (char === keyword[0]) {
            return true;
        }
    }
    return false;
}

export function todo(msg?: string) {
    throw new Error(msg ?? "This branch is not yet impelemented");
}

export function isLowerAlpha(char: string) {
    return /^[a-z]$/.test(char);
}
//
// function isUpperAlpha(char: string) {
//     return /^[A-Z]$/.test(char);
// }
//
//
export function isAlpha(char: string) {
    return /^[a-z]$/i.test(char);
}

function isAlphaNumeric(char: string) {
    return /^[a-z0-9]$/i.test(char);
}
