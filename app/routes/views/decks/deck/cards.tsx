import { flashcards } from "~/mock-data";
import CardsListing from "./components/CardsListing";

/**
 * To be used on mobile screens to display the cards list on a separate screen
 * */
export default function CardsPage() {
    return (
        <div className="gap-4 flex flex-col p-4 h-full w-full overflow-y-auto">
            <CardsListing />
        </div>
    );
}
