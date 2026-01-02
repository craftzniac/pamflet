import Cardholder from "./components/icons/Cardholder";
import CardReview from "./components/icons/CardReview";
import Person from "./components/icons/Person";

export const CardSide = {
    Front: "front",
    Back: "back"
} as const;


export const navItems = [
    {
        id: "card_review",
        icon: CardReview,
        text: "Card Review",
        url: "/cards-review/setup"
    },
    {
        id: "manage_decks",
        icon: Cardholder,
        text: "Manage Decks",
        url: "/manage-decks"
    },
    {
        id: "profile",
        icon: Person,
        text: "Profile",
        url: "/profile",
    }
]

