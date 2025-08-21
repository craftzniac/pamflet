import { memo, useEffect, useMemo, useState } from "react";
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

const CardSide = {
    Front: "front",
    Back: "back"
} as const;

type TCardSide = typeof CardSide[keyof typeof CardSide];

type Props = {
    mode: "edit" | "preview",
    cardIndexString: string
};

export default function CardsSlide({ mode, cardIndexString }: Props) {
    const [side, setSide] = useState<TCardSide>(CardSide.Front);
    const { deck } = useDeckContext();
    const [isFlipped, setIsFlipped] = useState(() => calcIsFlipped(side));
    const navigate = useNavigate();

    useEffect(() => setIsFlipped(calcIsFlipped(side)), [side]);

    const cardIndex = useMemo(() => {
        return getCardIndex(cardIndexString);
    }, [cardIndexString]);

    const card = useMemo(() => {
        setSide(CardSide.Front);
        return getCardFromDeck(cardIndex, deck);
    }, [cardIndex]);

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
                            <div className="w-full flex flex-col max-w-90">
                                {
                                    card ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 justify-between">
                                                <Button>Save</Button>
                                                <EditPreviewToggle />
                                                <Button variant="destructive"><span className="hidden lg:block">Delete card</span></Button>
                                            </div>
                                            <div className="flex gap-2 items-center w-full" >
                                                <FlashcardEditor card={card} isFlipped={isFlipped} />
                                                <div className="flex flex-col items-center gap-2">
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


function EditPreviewToggle({ }) {
    const [isEdit, setIsEdit] = useState(false);

    const selectedOptionStyle = "border-2 border-gray-400 bg-white";
    return (
        <div className="hidden lg:flex bg-gray-100 gap-1">
            <Button variant="secondary" className={cn("text-xs font-medium", isEdit ? selectedOptionStyle : "bg-transparent")} onClick={() => setIsEdit(true)}>Edit</Button>
            <Button variant="secondary" className={cn("text-xs font-medium", isEdit ? "" : selectedOptionStyle)} onClick={() => setIsEdit(false)}>Preview</Button>
        </div>
    );
}

function FlashcardEditor({ card, isFlipped }: { card: TFlashcard, isFlipped: boolean }) {
    return (
        <div className="perspective-distant transform-3d relative min-h-120 max-h-120 w-full max-w-90">
            <FlashcardEditFace className={isFlipped ? "rotate-y-180" : ""} side={CardSide.Front} content={card.front} />
            <FlashcardEditFace className={isFlipped ? "rotate-y-0" : "-rotate-y-180"} side={CardSide.Back} content={card.back} />
        </div>
    );
}

function FlashcardEditFace({ side, content, className = "" }: { side: TCardSide, content: string, className?: string }) {
    return (
        <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", className)}>
            <Editor inputchars={content} setInputchars={() => { }} />
            <span className="rounded-full bg-gray-600 text-white absolute top-1 left-4 px-2 py-0.5">{side}</span>
        </div >
    );
}

function FlashcardPreview({ card, isFlipped }: { card: TFlashcard, isFlipped: boolean }) {
    return (
        <div className="perspective-distant transform-3d relative min-h-120 max-h-120 w-full max-w-90">
            <FlashcardPreviewFace className={isFlipped ? "rotate-y-180" : ""} side={CardSide.Front} content={card.front} />
            <FlashcardPreviewFace className={isFlipped ? "rotate-y-0" : "-rotate-y-180"} side={CardSide.Back} content={card.back} />
        </div>
    );
}

function FlashcardPreviewFace({ side, content, className = "" }: { side: TCardSide, content: string, className?: string }) {
    return (
        <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", className)}>
            <Renderer inputchars={content} className="relative" />
            <span className="rounded-full bg-gray-600 text-white absolute top-1 left-4 px-2 py-0.5">{side}</span>
        </div >
    );
}
