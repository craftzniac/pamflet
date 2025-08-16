import { flashcards } from "~/mock-data";
import type { Route } from "./+types/cards-slide";
import CardsListing from "../components/CardsListing";

export default function CardsSlideEditPage({ params }: Route.ComponentProps) {
    const deckId = params.id;
    return (
        <div>
            <CardsListing flashcards={flashcards} />
        </div>
    );
}
