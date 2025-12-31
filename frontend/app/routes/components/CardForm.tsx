import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { decks } from "~/mock-data";
import { FlashcardEditor } from "./FlashcardEditor";
import { FlashcardPreview } from "./FlashcardPreview";
import { Button } from "~/components/ui/button";
import type { TFlashcard } from "~/types";
import { HamburgerIcon, MenuIcon, ImageIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

type Props = {
    initialCardState: TFlashcard,
    mode: "edit"
} | { mode: "add", initialCardState?: TFlashcard }

const EditPreviewTabOption = {
    Edit: "edit",
    Preview: "preview"
}

export default function CardForm(props: Props) {
    const mode = props.mode

    const [card, setCard] = useState<TFlashcard>(
        mode == "edit" ? props.initialCardState : (
            props.initialCardState ?? { back: "", deckId: "", front: "", id: "" }
        )
    )

    const [isFlipped, setIsFlipped] = useState(false)
    function toggleCurrentCardFlip() {
        setIsFlipped(prev => !prev)
    }

    function updateFront(front: string) {
        setCard(prev => ({ ...prev, front }))
    }

    function updateBack(back: string) {
        setCard(prev => ({ ...prev, back }))
    }

    function handleFormSubmit() {
        console.log("form submitted")
    }

    return (
        <form onSubmit={() => handleFormSubmit()} className="flex flex-col gap-4">
            <div className="flex items-center gap-1 w-full px-1 justify-between">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="select-trigger">Select a deck</Label>
                    <Select>
                        <SelectTrigger className="w-full min-w-28 max-w-58" id="select-trigger">
                            <SelectValue placeholder="Choose Deck" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    decks.map(deck => (
                                        <SelectItem key={deck.id} value={deck.id}>{deck.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit">
                    <SaveIcon />
                    <span>Save</span>
                </Button>
            </div>

            <div className="w-full flex justify-center">
                <div className="flex flex-col gap-4 w-full max-w-170 items-center">
                    <div className="flex gap-1 w-full justify-center">
                        {/* Mobile */}
                        <Tabs defaultValue={EditPreviewTabOption.Edit} className="lg:hidden">
                            <div className="w-full flex justify-center">
                                <TabsList>
                                    <TabsTrigger value={EditPreviewTabOption.Edit}>
                                        <MenuIcon />
                                    </TabsTrigger>
                                    <TabsTrigger value={EditPreviewTabOption.Preview}>
                                        <ImageIcon />
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value={EditPreviewTabOption.Edit} className="w-fit h-fit flex">
                                <FlashcardEditor card={card} isFlipped={isFlipped} updateFront={updateFront} updateBack={updateBack} />
                            </TabsContent>
                            <TabsContent value={EditPreviewTabOption.Preview} className="w-fit h-fit flex">
                                <FlashcardPreview card={card} isFlipped={isFlipped} />
                            </TabsContent>
                        </Tabs>

                        {/* Desktop */}
                        <div className="hidden gap-1 w-full lg:flex justify-center">
                            <FlashcardEditor card={card} isFlipped={isFlipped} updateFront={updateFront} updateBack={updateBack} />
                            <FlashcardPreview card={card} isFlipped={isFlipped} />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Button type="button" variant="secondary" size="icon" onClick={toggleCurrentCardFlip}>
                            <img src="/arrow_counter_clockwise.svg" alt="arrow counter clockwise" className="w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </form>

    )
}
