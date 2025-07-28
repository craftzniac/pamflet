import { Tokenizer } from "./tokenizer";

const ParserState = {
    /**
     * this is the state that is used to read the inputchars by default
     * */
    Data: "data",
}

type TParserState = typeof ParserState[keyof typeof ParserState];

export class Parser {
    state: TParserState;
    tokenizer: Tokenizer;
    cursor: number

    constructor(inputchars: string) {
        this.state = ParserState.Data;
        this.tokenizer = new Tokenizer(inputchars);
        this.cursor = 0;
    }

    run() {
        this.tokenizer.tokenize();
        const tokens = this.tokenizer.tokens;

        while (this.cursor < tokens.length) {
            console.log("curi", this.cursor);
            this.cursor ++
        }
    }

}
