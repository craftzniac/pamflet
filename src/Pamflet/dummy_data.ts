import type { Token } from "./tokenizer";

export const dummyTokens: Array<Array<Token>> = [
    // 0
    [
        {
            "type": "text",
            "value": "But yet $23 thing to note."
        },
        {
            "type": "text",
            "value": "This is something"
        }
    ],



    // 1
    [
        {
            "type": "text",
            "value": "But yet $23 thing to note."
        },
        {
            "type": "text",
            "value": "This is something"
        },
        {
            "type": "property_name",
            "value": "width"
        },
        {
            "type": "property_value",
            "value": "green"
        },
        {
            "type": "property_name",
            "value": "block_size"
        },
        {
            "type": "property_value",
            "value": "3px"
        },
        {
            "type": "property_name",
            "value": "fontSize"
        },
        {
            "type": "property_value",
            "value": "23px"
        }
    ],


    // 2 
    [
        {
            "type": "list_item",
            "value": "Hello again"
        },
        {
            "type": "list_item",
            "value": "Say your - name."
        },
        {
            "type": "list_item",
            "value": "another th's to pay"
        },
        {
            "type": "property_name",
            "value": "answer"
        },
        {
            "type": "property_value",
            "value": "0,2"
        },
        {
            "type": "property_name",
            "value": "color_wrong"
        },
        {
            "type": "property_value",
            "value": "green"
        }
    ],


    // 3
    [
        {
            "type": "text",
            "value": "What are the various kinds of greetings?"
        },
        {
            "type": "list_item",
            "value": "Hello again"
        },
        {
            "type": "list_item",
            "value": "Say your - name."
        },
        {
            "type": "list_item",
            "value": "another th's to pay"
        },
        {
            "type": "property_name",
            "value": "answer"
        },
        {
            "type": "property_value",
            "value": "0,2"
        },
        {
            "type": "property_name",
            "value": "color_wrong"
        },
        {
            "type": "property_value",
            "value": "green"
        }
    ],


    // 4
    [
        {
            "type": "keyword",
            "value": "Lnk"
        },
        {
            "type": "text",
            "value": "hello world https://www.example.com/idontevenknow/sk"
        },
        {
            "type": "text",
            "value": "What are the various kinds of greetings?"
        },
        {
            "type": "list_item",
            "value": "Hello again"
        },
        {
            "type": "list_item",
            "value": "another th's to pay"
        },
        {
            "type": "property_name",
            "value": "answer"
        },
        {
            "type": "property_value",
            "value": "0"
        },
        {
            "type": "property_name",
            "value": "color_wrong"
        },
        {
            "type": "property_value",
            "value": "green"
        },
        {
            "type": "text",
            "value": "3color_wrong= green"
        }
    ],



    // 5
    [
        {
            "type": "keyword",
            "value": "Audio"
        },
        {
            "type": "text",
            "value": "./src.mp3"
        }
    ],
];

export const testStrings = [
    `But yet $23 thing to note.\nThis is something`,


    `But yet $23 thing to note.
This is something
.color=green
.block_size=3px
.fontSize = 23px`,


    `- Hello again
- Say your - name.
- another th's to pay
.answer = 0,2
.color_wrong = green`,


    `What are the various kinds of greetings?
- Hello again
- Say your - name.
- another th's to pay
.answer = 0,2
.color_wrong = green`,


    `Lnk hello world https://www.example.com/idontevenknow/sk

What are the various kinds of greetings?
- Hello again
- another th's to pay
.answer =0
.color_wrong= green

Lnk https://example.com/hello
.color = green

.3color_wrong= green
`,

    `
Audio ./src.mp3
`


];

