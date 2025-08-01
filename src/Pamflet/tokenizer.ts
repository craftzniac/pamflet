import { isAlpha, isStartOfKeyword, keywords, todo } from "./utils";

const TokenizerState = {
    /**
     * this is the state that is used to read the inputchars by default
     * */
    Data: "data",
    /* 
     * switch to this when you encounter a new line.
     * Tokenizer begins with this state
     */
    StartOfLine: "start_of_line",
    /*
     * begin the tokenization of plain text. Also create the token here
     * */
    BeginPlainText: "begin_plain_text",
    /*
     * the state used to tokenize a plaintext
     * */
    PlainText: "plain_text",
    /*
     * to create token for property name
     * */
    BeginPropertyName: "begin_property_name",
    PropertyName: "property_name",

    // switch to this state when you encounter a "=" while in the PropertyName state
    BeginPropertyValue: "begin_property_value",
    PropertyValue: "property_value",
    Keyword: "keyword",
    /**
     * to begin tokenization of list item; create a list item token 
     * */
    BeginListItem: "begin_list_item",
    /**
     * switch to this state from the StartOfLine state when an "-" which has an " " after it, is encountered is encounted
     * */
    ListItem: "list_item"

} as const;

type TTokenizerState = typeof TokenizerState[keyof typeof TokenizerState];

type TokenType =
    "nil"    // only used when setting the initial value for this.curr_token
    | "text"
    | "property_name"
    | "property_value"
    | "keyword"
    | "list_item";

export type Token = {
    type: TokenType,
    value: string
};

const nilToken: Token = { type: "nil", value: "" };

export class Tokenizer {
    inputchars: string;
    cursor: number;
    state: TTokenizerState;
    reconsume: boolean;
    tokens: Token[];
    curr_token: Token;

    constructor(inputchars: string) {
        this.inputchars = inputchars;
        this.cursor = 0;
        this.reconsume = false;
        this.state = TokenizerState.Data;
        this.tokens = [];
        this.curr_token = nilToken;
    }

    consumeNextChar() {
        if (this.reconsume) {
            this.cursor--;
            this.reconsume = false;
        }
        const char = this.inputchars[this.cursor];
        this.cursor++;
        return char;
    }

    switchState(newState: TTokenizerState) {
        this.state = newState;
    }

    // by default, it starts from the next character but can be made to start from current character
    peekForward({ length, fromCurrentChar = false }: { length: number, fromCurrentChar?: boolean }) {
        if (fromCurrentChar) {
            // substring begins from the current character
            // but first get index of current character which always lags this.cursor by 1
            const startIndex = this.cursor - 1;
            return this.inputchars.slice(startIndex, startIndex + length);
        }
        // substring begins from the next character
        return this.inputchars.slice(this.cursor, this.cursor + length);
    }

    // by default, it starts from the next character but can be made to start from current character
    consumeForward({ length, fromCurrentChar = false }: { length: number, fromCurrentChar?: boolean }) {
        let str: string;
        if (fromCurrentChar) {
            this.cursor -= 1;
            str = this.inputchars.slice(this.cursor, this.cursor + length);
            this.cursor += length;
            return str;
        }
        str = this.inputchars.slice(this.cursor, this.cursor + length);
        this.cursor += length;
        return str;
    }


    tokenize(): Token[] {
        // NOTE: No explicit check for EOF since we're tokenizing from regular string, and not directly from a file
        while (this.cursor < this.inputchars.length) {
            let char: string;
            switch (this.state) {
                case TokenizerState.Data:
                    if (this.cursor == 0) {
                        this.switchState(TokenizerState.StartOfLine);
                        continue;
                    }
                    char = this.consumeNextChar();
                    if (char == "\n") {
                        this.switchState(TokenizerState.StartOfLine);
                    } if (char == "=") {
                        this.switchState(TokenizerState.BeginPropertyValue);
                    } else {
                        // ignore
                        // continue;
                        this.reconsume = true;
                        this.switchState(TokenizerState.BeginPlainText);
                    }
                    break;
                case TokenizerState.StartOfLine:
                    char = this.consumeNextChar();
                    if (isStartOfKeyword(char)) {
                        this.reconsume = true;
                        this.switchState(TokenizerState.Keyword);
                    } else if (char == ".") {
                        const nextChar = this.peekForward({ length: 1 });
                        // TODO: probably use isLowerAlpha() instead to enforce that property_name can only begin with lowercase letter. In that case, if nextChar is uppercase, it should be treated as plaintext
                        if (isAlpha(nextChar)) {
                            this.switchState(TokenizerState.BeginPropertyName);
                        } else {
                            // treat as plain text
                            this.switchState(TokenizerState.BeginPlainText);
                        }
                    } else if (char == "-") {
                        const nextChar = this.peekForward({ length: 1 });
                        if (nextChar == " ") {
                            this.consumeForward({ length: 1 });
                            this.switchState(TokenizerState.BeginListItem);
                        } else {
                            this.switchState(TokenizerState.BeginPlainText);
                        }
                    } else {
                        this.reconsume = true;
                        this.switchState(TokenizerState.BeginPlainText);
                    }
                    break;
                case TokenizerState.BeginListItem:
                    this.curr_token = { type: "list_item", value: "" };
                    this.switchState(TokenizerState.ListItem);
                    break;
                case TokenizerState.BeginPlainText:
                    char = this.consumeNextChar();
                    if (char == "\n") {
                        this.switchState(TokenizerState.StartOfLine);
                    } else {
                        this.reconsume = true;
                        this.curr_token = { type: "text", value: "" };
                        this.switchState(TokenizerState.PlainText);
                    }
                    break;
                case TokenizerState.PlainText:
                    char = this.consumeNextChar();
                    if (char == "\n") {
                        this.flush_curr_token();
                        this.switchState(TokenizerState.StartOfLine);
                    } else {
                        this.curr_token.value += char;
                    }
                    break;
                case TokenizerState.ListItem:
                    char = this.consumeNextChar();
                    if (char == "\n") {
                        this.flush_curr_token();
                        this.switchState(TokenizerState.StartOfLine);
                    } else {  // pretty much any other character is allowed at this point.
                        this.curr_token.value += char;
                    }
                    break;
                case TokenizerState.Keyword: {
                    char = this.consumeNextChar();

                    let isKeyword = false;
                    let forwardConsumeLength = 0;
                    // check if it's a keyword
                    for (const keyword of keywords) {
                        const paddedKeyword = (keyword + " ");
                        const forwardPeek = this.peekForward({ length: paddedKeyword.length, fromCurrentChar: true });
                        if (forwardPeek === paddedKeyword) {
                            isKeyword = true;
                            forwardConsumeLength = paddedKeyword.length;
                            break;
                        }
                    }

                    if (isKeyword) {
                        const value = this.consumeForward({ length: forwardConsumeLength, fromCurrentChar: true });
                        this.curr_token = { type: "keyword", value: value.trim() };
                        this.flush_curr_token();
                        this.switchState(TokenizerState.Data);
                    } else {
                        // since there was no keyword match, this char is just the start of a plain text
                        this.reconsume = true;
                        this.switchState(TokenizerState.BeginPlainText);
                    }
                    break;
                }
                case TokenizerState.BeginPropertyName:
                    this.curr_token = { type: "property_name", value: "" };
                    this.switchState(TokenizerState.PropertyName);
                    break;
                case TokenizerState.PropertyName:
                    char = this.consumeNextChar();
                    if (isAlpha(char) || char === "_" || char === "-") {
                        this.curr_token.value += char;
                    } else if (char === " " || char == "\n" || char == "=") {
                        this.flush_curr_token();
                        if (char == " ") {
                            this.switchState(TokenizerState.Data);
                        } else if (char == "=") {
                            this.switchState(TokenizerState.BeginPropertyValue);
                        } else {
                            this.switchState(TokenizerState.StartOfLine);
                        }
                    } else {
                        // silently ignore the character
                    }
                    break;
                case TokenizerState.BeginPropertyValue:
                    char = this.consumeNextChar();
                    if (char == " ") {
                        // ignore 
                        continue;
                    } else if (char === "\n") {
                        this.switchState(TokenizerState.StartOfLine);
                    } else {
                        this.curr_token = { type: "property_value", value: "" };
                        this.reconsume = true;
                        this.switchState(TokenizerState.PropertyValue);
                    }
                    break;
                case TokenizerState.PropertyValue:
                    char = this.consumeNextChar();
                    if (char == " " || char == "\n") {
                        this.flush_curr_token();
                        if (char == " ") {
                            this.switchState(TokenizerState.Data);
                        } else {
                            this.switchState(TokenizerState.StartOfLine);
                        }
                    } else {
                        this.curr_token.value += char;
                    }
                    break;
                default:
                    // silently ignore the token
                    this.switchState(TokenizerState.Data);
            }
        }

        this.flush_curr_token();
        console.log("tokens::", this.tokens);
        return this.tokens;
    }

    flush_curr_token() {
        if (this.curr_token.type != "nil") {
            this.tokens.push(this.curr_token);
            this.curr_token = nilToken;
        }
    }
}
