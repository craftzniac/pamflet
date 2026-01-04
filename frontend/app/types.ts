export type TFlashcard = {
	id: string,
	front: string,
	back: string,
	deckId: string
}

export type TDeck = {
	id: string, name: string, cards: TFlashcard[]
}

export type TDeckWithCardCount = {
	id: string, name: string, cardCount: number
}
