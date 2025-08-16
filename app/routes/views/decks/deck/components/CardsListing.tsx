import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import Button from "~/routes/components/Button";
import { useDeckContext } from "~/routes/contexts/DeckProvider";

export default function CardsListing({ mode = "preview" }: { mode?: "edit" | "preview" }) {
    const { deck } = useDeckContext();
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex items-center gap-4 justify-between">
                <Button variant="secondary" className="lg:w-full"> <PlusIcon /> Add card</Button>
                {mode === "edit" && <Button variant="destructive"> Delete Deck</Button>}
            </div>
            <div className="w-full h-full overflow-y-auto">
                <ul className="flex flex-col gap-1">
                    {deck.cards.map((_fc, index) => (
                        <li>
                            <Link to={mode === "edit" ? `/decks/${deck.id}/edit/cards-slide/${index + 1}` : `/decks/${deck.id}/cards-slide/${index + 1}`} className="w-full rounded hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-300 flex justify-center px-2 py-2.5">Card {index + 1}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
