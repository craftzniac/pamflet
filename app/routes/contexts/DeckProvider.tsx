import { createContext, useContext, type ReactNode } from "react";
import type { TDeck } from "~/types";

type TDeckContext = {
    deck: TDeck
};

type Props = {
    deck: TDeckContext["deck"]
    children: ReactNode
};

const DeckContext = createContext<TDeckContext>({
    deck: { cards: [], id: "", name: "" }
});

export function useDeckContext() {
    return useContext(DeckContext);
}

export default function DeckProvider({ children, deck }: Props) {
    return (
        <DeckContext.Provider value={{ deck }}>{children}</DeckContext.Provider>
    );
}
