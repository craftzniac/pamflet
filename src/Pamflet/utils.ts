export const Keyword = {
    Lnk: "Lnk",
    Audio: "Audio",
    Img: "Img",
} as const;

export const keywords = keywordValues();

function keywordValues() {
    type TKeywordTuple = [
        typeof Keyword["Lnk"],
        typeof Keyword["Audio"],
        typeof Keyword["Img"],
    ];
    return Object.values(Keyword) as TKeywordTuple;
}

export function isStartOfKeyword(char: string) {
    for (const keyword of keywords) {
        if (char === keyword[0]) {
            return true;
        }
    }
    return false;
}

export function todo(msg?: string): never {
    throw new Error(msg ?? "This branch is not yet impelemented");
}

export function isLowerAlpha(char: string) {
    return /^[a-z]$/.test(char);
}

export function isAlpha(char: string) {
    return /^[a-z]$/i.test(char);
}

export function getLinkContentFromText(text: string): [string, string] {
    const split = text.split(" ");
    const words = [];
    let url = "";
    for (let word of split) {
        word = word.trim();
        if (word.length > 0) {
            if (isValidUrl(word)) {
                url = word;
            } else {
                words.push(word);
            }
        }
    }
    return [words.join(" "), url];
}

function isValidUrl(text: string): boolean {
    try { new URL(text); return true; } catch { return false; }
}


export function generateId() {
    const charss = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
    const length = 24
    let id = ""
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * charss.length)
        id += charss[randIndex]
    }
    return id
}
