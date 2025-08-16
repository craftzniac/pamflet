import CardsListing from "../components/CardsListing";

/**
 * To be used on mobile screens to display the cards list on a separate screen
 * */
export default function CardsPage() {
    return (
        <div className="p-4 gap-4 flex flex-col">
            <CardsListing mode="edit" />
        </div>
    );
}
