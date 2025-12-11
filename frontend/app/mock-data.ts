import type { TDeck, TFlashcard } from "./types";

export const flashcards: TFlashcard[] = [
	{
		id: "wiajdfasdikfja",
		front: `What is the biggest fish in the ocean called?
.color = brown
.fontSize = 24px`,
		back: "Shark"
	},
	{
		id: "andfo23ijaiofjasdf",
		front: `What is the output type of the \`input()\` function in Python?
- String
- Integer
- Float
- Boolean
.answer = 0`,
		back: ""
	},
	{
		id: "0ajsdlfaksdfjaoi",
		front: `Python uses curly braces {} to define code blocks
- True
- False
.answer = 1`,
		back: "Python uses indentation instead of curly braces {} to define code blocks"
	},
	{
		id: "andsfo2wijhasdf",
		front: `which of the following are scalar types in rust?
- i32
- f64
- bool
- &str
- char
.answer = 0,1,2,4`,
		back: `&str is a reference type, not scalar
Lnk https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html rust doc
`
	},
];

export const decks: TDeck[] = [
	{
		id: "kjasdlf20jfaf",
		name: "Ownership in Rust",
		cards: flashcards,
	},
	{
		id: "oiaefjaoiwjfasf",
		name: "Fundamentals of Linear algebra",
		cards: flashcards,
	},
	{
		id: "mmao2ij20ai0iao--afasf",
		name: "Learning about physics engines",
		cards: flashcards,
	},
];
