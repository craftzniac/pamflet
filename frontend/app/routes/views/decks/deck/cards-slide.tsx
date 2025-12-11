import CardsSlide from "./components/CardsSlide";
import type { Route } from "./+types/cards-slide";

export default function CardsSlidePage({ params }: Route.ComponentProps) {
    const cardIndexString = params.flashcardIndex;
    return <CardsSlide mode="preview" cardIndexString={cardIndexString} />;
}

