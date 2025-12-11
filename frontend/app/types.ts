export type TFlashcard = {
	id: string,
	front: string,
	back: string,
}

export type TDeck = {
	id: string, name: string, cards: TFlashcard[]
}

