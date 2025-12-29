import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { decks } from "~/mock-data";
import { MoreVerticalIcon as OverflowIcon, PlusIcon } from "lucide-react"
import BottomNav from "../components/BottomNav";

export default function ManageDecks() {
    return (
        <div className="flex flex-col h-full w-full">
            <header className="p-4 flex items-center gap-1">
                <h1 className="font-medium">Manage Decks</h1>
            </header>
            <main className="h-full flex flex-col p-4 gap-4 items-center bg-gray-50 overflow-y-auto">
                <div className="flex justify-end w-full">
                    <Button asChild>
                        <Link to="/manage-decks/add-deck">
                            <PlusIcon />
                            <span>Add Deck</span>
                        </Link>
                    </Button>
                </div>
                <ul className="flex flex-col gap-1 w-full">
                    {
                        decks.map(deck => {
                            const cardsCount = deck.cards.length
                            return (
                                <li key={deck.id}>
                                    <div className="shadow bg-white w-full rounded-md flex items-center gap-1 lg:gap-2 p-2 lg:px-4 lg:py-2">
                                        <Link to={`/manage-decks/${deck.id}/cards`} className="w-full flex items-center gap-1 lg:gap-2">
                                            <span className="w-6 overflow-hidden flex justify-center items-center text-xs text-gray-600">{cardsCount}</span>
                                            <p className="font-medium text-sm lg:text-base w-full line-clamp-1">{deck.name}</p>
                                        </Link>
                                        <OverflowMenu />
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
            <BottomNav />
        </div>
    )
}


function OverflowMenu() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"ghost"}> <OverflowIcon /> </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}
