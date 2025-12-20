import { Link } from "react-router"
import { Button } from "~/components/ui/button"

const navItems = [
    {
        id: "card_review",
        icon: "/nav_card_review.svg",
        text: "Card Review",
        url: "/cards-review/setup"
    },
    {
        id: "manage_decks",
        icon: "/nav_cardholder.svg",
        text: "Manage Decks",
        url: "/manage-decks"
    },
    {
        id: "profile",
        icon: "/nav_person.svg",
        text: "Profile",
        url: "/profile",
    }
]

export default function BottomNav() {
    return (
        <nav className="w-full lg:hidden">
            <ul className="flex justify-between gap-2 items-center w-full">
                {
                    navItems.map(it => (
                        <li key={it.id} className="flex px-3 py-1.5">
                            <Link to={it.url} className="flex flex-col items-center gap-0 group">
                                <div className="px-2.5 py-1 group-hover:bg-gray-100 rounded-full">
                                    <img src={it.icon} className="w-6 h-6" alt={it.text} />
                                </div>
                                <span className="text-xs font-medium">{it.text}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
