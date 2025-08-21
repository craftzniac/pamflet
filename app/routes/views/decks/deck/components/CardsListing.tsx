import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import Button from "~/routes/components/Button";
import { useDeckContext } from "~/routes/contexts/DeckProvider";
import { cn } from "~/utils";

export default function CardsListing({ mode = "preview", currCardIndex }: { mode?: "edit" | "preview", currCardIndex: number }) {
    const { deck } = useDeckContext();
    const navigate = useNavigate();
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
                            <Button variant="text" onClick={() => {
                                navigate(mode === "edit" ? `/decks/${deck.id}/edit/cards-slide/${index + 1}` : `/decks/${deck.id}/cards-slide/${index + 1}`, { replace: true });
                            }} className={cn("w-full rounded hover:bg-gray-100 transition-colors duration-300 flex justify-center px-2 py-2.5", currCardIndex == index ? "bg-gray-200" : "")}>
                                Card {index + 1}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
