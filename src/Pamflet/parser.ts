import { Tokenizer, type Token } from "./tokenizer";
import { generateId, getLinkContentFromText, Keyword, todo } from "./utils";

const ParserState = {
    Data: "data",
    BeginTextElement: "begin_text_element",
    TextElement: "text_element",
    ElementProps: "element_prop",
    PropValue: "prop_value",
    PropName: "prop_name",
    ListElement: "list_element",
    ListItem: "list_item",
    MultichoiceElement: "multichoice_element",
    MultichoiceOption: "list_item",
    LinkElement: "link_element",
    LinkContent: "link_content",
} as const;

type TParserState = typeof ParserState[keyof typeof ParserState];

export type TElement = TLinkElement | TTextElement | TMultichoiceElement | TNilElement | TListElement;

type TNilElement = {
    type: "nil",
}

type GeneralProps = {
    id: string
    color: string,
    fontSize: string
};

export type TLinkElement = GeneralProps & {
    type: "link",
    label: string,
    href: string
    textAlign: "center" | "left" | "right",
}

export type TListElement = GeneralProps & {
    type: "list",
    items: { id: string, value: string }[]
};

export type TMultichoiceElement = GeneralProps & (TSingleselect | TMultiselect) & {
    type: "multichoice",
    options: { id: string, value: string }[]
};

export type TSingleselect = {
    variant: "single_answer",
    answerIndex: number
};

export type TMultiselect = {
    variant: "multi_answer",
    answerIndexes: number[]
};

export type TTextElement = GeneralProps & {
    type: "text",
    content: string
    textAlign: "center" | "left" | "right",
};

type TElementProperty = {
    name: string,
    value: string
};

const nilElement: TNilElement = { type: "nil" };
const nilElementProperty: TElementProperty = { name: "", value: "" };

export class Parser {
    state: TParserState;
    cursor: number;
    elements: TElement[];
    curr_element: TElement;
    tokens: Token[];
    curr_element_property: TElementProperty;

    constructor(inputchars: string, dummyTokens?: Array<Token>) {
        this.state = ParserState.Data;
        this.cursor = 0;
        this.elements = [];
        this.curr_element = nilElement;
        this.curr_element_property = nilElementProperty;

        this.tokens = dummyTokens ?? new Tokenizer(inputchars).tokenize();
    }

    consumeNextToken() {
        const token = this.tokens[this.cursor];
        this.cursor++;
        // console.log("token::", token);
        return token;
    }

    reconsume() {    // reconsumes the last token that was just consumed. This basically moves the cursor backwards by 1
        this.cursor--;
    }

    switchState(newState: TParserState) {
        this.state = newState;
        // console.log("switch state::", this.state);
    }

    toTextToken(token: Token) {
        const oldType = token.type;
        switch (oldType) {
            case "keyword": {
                token.type = "text";
                break;
            }
            default:
                todo();
        }
        // console.log(`token conversion:: ${oldType} to ${token.type}`);
    }

    flush_curr_element() {
        if (this.curr_element.type !== "nil") {
            this.flush_curr_element_property();
            this.elements.push(this.curr_element);
            // console.log(`Flushed:: ${this.curr_element.type} element`);
            this.curr_element = nilElement;
        }
    }

    flush_curr_element_property() {
        if (this.curr_element_property.name !== "") {
            switch (this.curr_element.type) {
                case "link": {
                    setPropertyOnLinkElement(this.curr_element, this.curr_element_property);
                    break;
                }
                case "text": {
                    setPropertyOnTextElement(this.curr_element, this.curr_element_property);
                    break;
                }
                case "list": {
                    if (this.curr_element_property.name == "answer") {
                        // convert list element to multichoice element; this copies all properties from the list element to the new multichoice element
                        this.curr_element = listToMultichoice(this.curr_element, this.curr_element_property.value);
                    } else {
                        setPropertyOnListElement(this.curr_element, this.curr_element_property);
                    }
                    break;
                }
                case "multichoice": {
                    setPropertyOnMultichoiceElement(this.curr_element, this.curr_element_property);
                    break;
                }
                default:
                    throw new Error("flush for element type not yet implemented:: " + this.curr_element.type);
            }
            this.curr_element_property = nilElementProperty;
        }
    }

    parse() {
        while (this.cursor < this.tokens.length) {
            switch (this.state) {
                case ParserState.Data: {
                    const token = this.consumeNextToken();
                    switch (token.type) {
                        case "text": {
                            this.reconsume();
                            this.switchState(ParserState.TextElement);
                            break;
                        }
                        case "property_name": {
                            this.reconsume();
                            this.switchState(ParserState.PropName);
                            break;
                        }
                        case "list_item": {
                            this.reconsume();
                            this.switchState(ParserState.ListElement);
                            break;
                        }
                        case "keyword": {
                            // find out what keyword this is and route to the appropriate branch
                            switch (token.value) {
                                case Keyword.Lnk: {
                                    this.reconsume();
                                    this.switchState(ParserState.LinkElement);
                                    break;
                                }
                                default:
                                    // if keyword isn't recognized, treat it as a text
                                    this.reconsume();
                                    // actually convert the token to a text token
                                    this.toTextToken(token);
                                    this.switchState(ParserState.TextElement);
                            }
                            break;
                        }
                        default:
                        // silently ignore token
                    }
                    break;
                }
                case ParserState.LinkElement: {
                    const token = this.consumeNextToken();
                    if (token.type === "keyword" && token.value === Keyword.Lnk) {
                        this.curr_element = createLinkElement();
                        this.switchState(ParserState.LinkContent);
                    } else {
                        todo();
                    }
                    break;
                }
                case ParserState.LinkContent: {
                    const token = this.consumeNextToken();
                    if (token.type !== "text" || this.curr_element.type !== "link") {
                        todo();
                    }
                    // try to split text into "label" and "href";
                    const [label, url] = getLinkContentFromText(token.value);
                    this.curr_element.label = label;
                    this.curr_element.href = url;
                    this.switchState(ParserState.ElementProps);
                    break;
                }
                case ParserState.ListElement: {
                    const token = this.consumeNextToken();
                    if (token.type !== "list_item") {
                        throw new Error("Expected list_item token but got a " + token.type + " token instead");
                    }
                    this.reconsume();
                    this.curr_element = createListElement();
                    this.switchState(ParserState.ListItem);
                    break;
                }
                case ParserState.ListItem: {
                    const token = this.consumeNextToken();
                    if (token.type === "list_item") {
                        if (this.curr_element.type !== "list") {
                            throw new Error(`Expected a list element here but got a ${this.curr_element.type} element instead`);
                        } else {
                            this.curr_element.items.push({ id: generateId(), value: token.value });
                        }
                    } else {
                        this.reconsume();
                        this.switchState(ParserState.Data);
                    }
                    break;
                }
                case ParserState.TextElement: {
                    const token = this.consumeNextToken();
                    if (token.type !== "text") {
                        throw new Error("text token expected here but got a " + token.type + " instead");
                    }
                    this.curr_element = createTextElement({ content: token.value });
                    this.switchState(ParserState.ElementProps);
                    break;
                }
                case ParserState.ElementProps: {
                    const token = this.consumeNextToken();
                    if (token.type == "property_name") {
                        this.reconsume();
                        this.switchState(ParserState.PropName);
                    } else {
                        this.reconsume();
                        this.flush_curr_element();
                        this.switchState(ParserState.Data);
                    }
                    break;
                }
                case ParserState.PropName: {
                    const token = this.consumeNextToken();
                    if (token.type === "property_name") {
                        this.curr_element_property = { name: token.value, value: "" };
                        this.switchState(ParserState.PropValue);
                    } else {
                        this.reconsume();
                        this.flush_curr_element();
                        this.switchState(ParserState.Data);
                    }

                    break;
                }
                case ParserState.PropValue: {
                    const token = this.consumeNextToken();
                    if (token.type === "property_value") {
                        this.curr_element_property.value = token.value;
                        this.flush_curr_element_property();
                        this.switchState(ParserState.PropName);
                    } else {
                        this.flush_curr_element_property();
                        this.switchState(ParserState.Data);
                    }
                    break;
                }
                default:
                    todo();
            }
        }
        this.flush_curr_element();
        return this.elements;
    }
}

function createTextElement(el: Partial<TTextElement>): TTextElement {
    return {
        id: generateId(),
        color: el.color ?? "",
        content: el.content ?? "",
        fontSize: el.fontSize ?? "",
        type: "text",
        textAlign: "center"
    };
}

function createListElement(): TListElement {
    return { id: generateId(), color: "", fontSize: "", items: [], type: "list" };
}

function createLinkElement(): TLinkElement {
    return {
        id: generateId(),
        color: "",
        fontSize: "",
        type: "link",
        href: "",
        label: "",
        textAlign: "left"
    };
}


function setPropertyOnTextElement(element: TTextElement, property: TElementProperty) {
    switch (property.name) {
        case "color":
            element.color = property.value;
            break;
        case "content":
            element.content = property.value;
            break;
        case "fontSize":
            element.fontSize = property.value;
            break;
        case "textAlign":
            switch (property.value) {
                case "right":
                    element.textAlign = "right";
                    break;
                case "left":
                    element.textAlign = "left";
                    break;
                default:
                    element.textAlign = "center";
                    break;
            }
            break;
        default:
        // ignore it
    }
}

function setPropertyOnMultichoiceElement(element: TMultichoiceElement, property: TElementProperty) {
    // Since TMultichoiceElement is always derived from TListElement, 
    // it is guaranteed that the options, answerIndex/answerIndexes and variant props have already been set
    // by the time this function is run and so there is no need to set those again. 
    switch (property.name) {
        case "color":
            element.color = property.value;
            break;
        case "fontSize":
            element.fontSize = property.value;
            break;
        default:
        // ignore the property
    }
}

function setPropertyOnLinkElement(element: TLinkElement, property: TElementProperty) {
    switch (property.name) {
        case "color":
            element.color = property.value;
            break;
        case "label":
            element.label = property.value;
            break;
        case "href":
            element.href = property.value;
            break;
        case "fontSize":
            element.fontSize = property.value;
            break;
        case "textAlign":
            switch (property.value) {
                case "right":
                    element.textAlign = "right";
                    break;
                case "center":
                    element.textAlign = "center";
                    break;
                default:
                    element.textAlign = "left";
                    break;
            }
            break;
        default:
        // ignore it
    }
}

function parseToNumberArray(vals: string[]): number[] | false {
    const result: number[] = [];
    if (vals.length == 0) {
        return false;
    }

    for (const val of vals) {
        const parsedNumber = parseInt(val);
        if (isNaN(parsedNumber)) return false;
        result.push(parsedNumber);
    }
    return result;
}

function hasNegativeNumber(nums: number[]): boolean {
    for (const num of nums) {
        if (num < 0) return true;
    }
    return false;
}

function listToMultichoice(list: TListElement, answer: string): TMultichoiceElement {
    const split = answer.split(",");
    let parsedSplit = parseToNumberArray(split);
    let variant: TMultichoiceElement["variant"];
    let answerIndex: number = -1;
    let answerIndexes: number[] = [];

    if (parsedSplit !== false && hasNegativeNumber(parsedSplit)) {
        parsedSplit = false;
    }

    if (parsedSplit === false) {
        variant = "single_answer";
        answerIndex = -1;   // -1 is for invalid answer
    } else {
        if (parsedSplit.length > 1) {
            variant = "multi_answer";
            answerIndexes = parsedSplit;
        } else {
            variant = "single_answer";
            answerIndex = parsedSplit[0];
        }
    }

    if (variant == "single_answer") {
        return {
            id: list.id,
            color: list.color,
            type: "multichoice",
            options: list.items,
            fontSize: list.fontSize,
            variant,
            answerIndex
        }
    }

    // TODO: make sure the indexes are not out of bounds!!

    return {
        id: list.id,
        color: list.color,
        type: "multichoice",
        options: list.items,
        fontSize: list.fontSize,
        variant,
        answerIndexes
    }
}

function setPropertyOnListElement(element: TListElement, property: TElementProperty) {
    switch (property.name) {
        case "color":
            element.color = property.value;
            break;
        case "fontSize":
            element.fontSize = property.value;
            break;
        default:
        // ignore it
    }
}
