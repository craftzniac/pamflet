import { memo, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import CardsListing from "./CardsListing";
import Editor from "~/pamflet/Editor";
import Renderer from "~/pamflet/Renderer";
import Button from "~/routes/components/Button";
import { ArrowLeftIcon, ArrowRightIcon, FlipHorizontal, FlipHorizontalIcon, FlipVerticalIcon, RepeatIcon } from "lucide-react";
import type { TFlashcard } from "~/types";
import { useDeckContext } from "~/routes/contexts/DeckProvider";
import FlashcardNotFound from "~/routes/components/FlashcardNotFound";
import { cn, getCardFromDeck, getCardIndex } from "~/utils";
import { useNavigate } from "react-router";
import type { CardSide } from "~/constants";

type TCardSide = typeof CardSide[keyof typeof CardSide];

type Props = {
    mode: "edit" | "preview",
    cardIndexString: string
};

export default function CardsSlide({ mode, cardIndexString }: Props) {
    const [side, setSide] = useState<TCardSide>(CardSide.Front);
    const { deck } = useDeckContext();
    const [isFlipped, setIsFlipped] = useState(() => calcIsFlipped(side));
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const [card, setCard] = useState<TFlashcard | null>(null);

    useEffect(() => setIsFlipped(calcIsFlipped(side)), [side]);

    const cardIndex = useMemo(() => {
        return getCardIndex(cardIndexString);
    }, [cardIndexString]);


    useEffect(() => {
        setSide(CardSide.Front)
        setCard(getCardFromDeck(cardIndex, deck))
    }, [cardIndex])

    function calcIsFlipped(side: TCardSide): boolean {
        if (side === CardSide.Front) {
            return false;
        }
        return true;
    }

    function flipcard() {
        setSide(prev => {
            if (prev == CardSide.Back) {
                return CardSide.Front;
            }
            return CardSide.Back;
        })
    }

    function goToPrevCard() {
        let newIndex = cardIndex - 1;
        if (newIndex < 0)
            newIndex = cardIndex;
        goToCard(newIndex);
    }

    function goToNextCard() {
        let newIndex = cardIndex + 1;
        if (newIndex >= deck.cards.length)
            newIndex = cardIndex;
        goToCard(newIndex);
    }

    function goToCard(index: number) {
        navigate(`/decks/${deck.id}/cards-slide/${index + 1}`, { replace: true });
    }

    function updateCardFront(front: string) {
        setCard(prev => ({ ...prev, front: front } as TFlashcard));
    }

    function updateCardBack(back: string) {
        setCard(prev => ({ ...prev, back } as TFlashcard));
    }


    return (
        <div className="gap-4 flex p-4 h-full w-full overflow-y-auto">
            <div className="hidden lg:flex w-full h-full max-w-50">
                <CardsListing currCardIndex={cardIndex} mode={mode} />
            </div>
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full flex items-center gap-4">
                    <h2 className="w-full font-medium">Card {cardIndex + 1}</h2>
                    <p>{cardIndex + 1}/{deck.cards.length}</p>
                </div>
                <div className="flex flex-col items-center h-full justify-start md:justify-center w-full gap-4">
                    {
                        mode === "edit" ? (
                            <div className={cn("w-full flex flex-col", mode == "edit" ? "max-w-180" : "max-w-90")}>
                                {
                                    card ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 justify-between">
                                                <Button>Save</Button>
                                                <div className="flex md:hidden bg-gray-100 gap-1 p-2 rounded">
                                                    <Button variant="secondary" className={cn("text-xs h-8 w-15 font-medium border-transparent", isEdit ? "border-2 border-gray-400 bg-white" : "bg-transparent")} onClick={() => setIsEdit(true)}>Edit</Button>
                                                    <Button variant="secondary" className={cn("text-xs h-8 w-15 font-medium border-transparent", isEdit ? "" : "border-2 border-gray-400 bg-white")} onClick={() => setIsEdit(false)}>Preview</Button>
                                                </div>
                                                <Button variant="destructive"><span className="hidden lg:block">Delete card</span></Button>
                                            </div>
                                            <div className="flex gap-2 items-center w-full" >
                                                <div className="h-full flex w-full">
                                                    <FlashcardEditor  updateBack={updateCardBack} updateFront={updateCardFront} card={card} isFlipped={isFlipped} />
                                                </div>
                                                <div className="flex flex-col items-center gap-2 w-full">
                                                    <FlashcardPreview card={card} isFlipped={isFlipped} />
                                                    <Button onClick={flipcard} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5"><RepeatIcon />  </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <FlashcardNotFound />
                                    )
                                }
                                <div className="w-full gap-4 flex justify-between">
                                    <Button disabled={cardIndex === 0} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5" onClick={goToPrevCard}><ArrowLeftIcon /> </Button>
                                    <Button disabled={cardIndex === deck.cards.length - 1} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5" onClick={goToNextCard}><ArrowRightIcon /> </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col max-w-90">
                                {
                                    card ? (
                                        <div className="flex flex-col gap-2 items-center w-full" >
                                            <FlashcardPreview card={card} isFlipped={isFlipped} />
                                            <Button onClick={flipcard} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5"><RepeatIcon />  </Button>
                                        </div>
                                    ) : (
                                        <FlashcardNotFound />
                                    )
                                }
                                <div className="w-full gap-4 flex justify-between">
                                    <Button disabled={cardIndex === 0} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5" onClick={goToPrevCard}><ArrowLeftIcon /> </Button>
                                    <Button disabled={cardIndex === deck.cards.length - 1} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5" onClick={goToNextCard}><ArrowRightIcon /> </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div >
        </div >
    );
}

