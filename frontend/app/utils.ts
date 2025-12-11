import { twMerge, type ClassNameValue } from "tailwind-merge"
import type { TDeck } from "./types";
export function cn(...cls: ClassNameValue[]) {
	return twMerge(cls);
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

export function getCardIndex(indexString: string): number {
	try {
		const num = parseInt(indexString);
		let index = num - 1;
		if (index < 0) {
			return -1;
		}
		return index;
	} catch {
		return -1;
	}

}

export function getCardFromDeck(cardIndex: number, deck: TDeck) {
	if (cardIndex < 0) {
		return null;
	}
	// find the card from the deck
	for (let i = 0; i < deck.cards.length; i++) {
		if (i == cardIndex) {
			return deck.cards[i];
		}
	}
	return null;
}
