import { flashcards } from "~/mock-data";
import type { Route } from "./+types/cards-slide";
import CardsListing from "../components/CardsListing";
import CardsSlide from "../components/CardsSlide";

export default function CardsSlideEditPage({ params }: Route.ComponentProps) {
    const cardIndexString = params.flashcardIndex;
    return <CardsSlide mode="edit" cardIndexString={cardIndexString} />;
}
