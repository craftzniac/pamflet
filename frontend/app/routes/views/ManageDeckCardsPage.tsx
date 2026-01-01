import { PencilIcon, PlusIcon, TrashIcon, SaveIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { decks, flashcards } from "~/mock-data"
import BackButton from "../components/BackButton"
import { useMediaQuery } from "~/hooks"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import Renderer from "~/pamflet/Renderer"
import { FlashcardPreview } from "../components/FlashcardPreview"
import { useState } from "react"
import { FlashcardEditor } from "../components/FlashcardEditor"
import CardForm from "../components/CardForm"

export default function ManageDeckCards() {
    const deckId = "somethinothing"
    const [isMobile] = useMediaQuery()
    const currentCard = flashcards[0];
    const [card, setCard] = useState(flashcards[0])

    return (
        <div className="flex flex-col h-full w-full">
            <header className="p-2 md:p-4 flex justify-center gap-1">
                <BackButton />
                <div className="flex justify-center flex-col w-full">
                    <h1 className="font-medium">Deck</h1>
                    <p className="text-xs">practicing english words</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <Button variant="ghost">
                        <PencilIcon className="w-6" />
                    </Button>
                    <Button variant="ghost">
                        <TrashIcon className="w-6 text-destructive" />
                    </Button>
                </div>
            </header>
            <main className="h-full flex p-4 gap-4 items-center bg-gray-50 overflow-y-auto">
                <section className="h-full w-full lg:max-w-100 2xl:max-w-130 flex flex-col gap-4 items-center bg-gray-50 overflow-y-auto">
                    <div className="flex justify-end w-full">
                        <Button asChild>
                            <Link to={`/manage-decks/${deckId}/add-card`}>
                                <PlusIcon />
                                <span>Add Card</span>
                            </Link>
                        </Button>
                    </div>
                    <ul className="flex flex-col gap-1 w-full">
                        {
                            flashcards.map(card => {
                                return (
                                    <li key={card.id}>
                                        <div className="shadow bg-white w-full rounded-md flex items-center gap-1 lg:gap-2 p-2 lg:px-4 lg:py-2">
                                            <Link to={isMobile ? `/edit-cards/${card.id}` : `/manage-decks/${card.deckId}/cards/${card.id}`}
                                                className={card.front.trim() == "" ? "text-sm lg:text-base w-full text-gray-600 italic" : "text-sm lg:text-base w-full line-clamp-1"}
                                            >
                                                {card.front.trim() == "" ? `<Empty />` : card.front}
                                            </Link>
                                            <Button size="icon" variant="ghost" className="hover:bg-destructive text-destructive hover:text-destructive">
                                                <TrashIcon />
                                            </Button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <div className="h-full w-0.5 bg-gray-600/30 hidden lg:block" />
                <section className="hidden lg:flex w-full h-full justify-center overflow-y-auto">
                    {
                        !currentCard ? (
                            <div className="flex w-full h-full justify-center px-4 items-center">
                                <p className="text-center text-xl text-gray-600">Select any card to edit here</p>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full gap-4">
                                <header className="flex items-center gap-1 justify-between">
                                    <h2 className="text-xl">Edit Card</h2>
                                </header>
                                <CardForm mode="edit" initialCardState={card} />
                            </div>
                        )
                    }
                </section>
            </main>
        </div >
    )
}
