import { memo, useEffect, useMemo, useState } from "react";
import CardsListing from "./components/CardsListing";
import Editor from "~/pamflet/Editor";
import Renderer from "~/pamflet/Renderer";
import { testStrings } from "~/dummy_data";
import Button from "~/routes/components/Button";
import { ArrowLeftIcon, ArrowRightIcon, FlipHorizontal, FlipHorizontalIcon, FlipVerticalIcon, RepeatIcon } from "lucide-react";
import type { Route } from "./+types/cards-slide";
import type { TFlashcard } from "~/types";
import { useDeckContext } from "~/routes/contexts/DeckProvider";
import FlashcardNotFound from "~/routes/components/FlashcardNotFound";

const CardSide = {
    Front: "front",
    Back: "back"
} as const;

type TCardSide = typeof CardSide[keyof typeof CardSide];

export default function CardsSlidePage({ params }: Route.ComponentProps) {
    const [inputchars, setInputchars] = useState(testStrings[testStrings.length - 1]);
    const [side, setSide] = useState<TCardSide>(CardSide.Front);
    const { deck } = useDeckContext();

    const card = useMemo(() => {
        try {
            const num = parseInt(params.flashcardIndex);
            let index = num - 1;
            if (index < 0) {
                return null;
            }
            // find the card from the deck
            for (let i = 0; i < deck.cards.length; i++) {
                if (i == index) {
                    setSide(CardSide.Front);
                    return deck.cards[i];
                }
            }

            return null;
        } catch {
            return null;
        }
    }, [params.flashcardIndex]);


    useEffect(() => {
        console.log("card:", card);
    }, [card]);

    function toggleCardSide() {
        setSide(prev => {
            if (prev == CardSide.Back) {
                return CardSide.Front;
            }
            return CardSide.Back;
        })
    }

    return (
        <div className="gap-4 flex p-4 h-full w-full overflow-y-auto">
            <div className="hidden lg:flex w-full h-full max-w-50">
                <CardsListing />
            </div>
            <div className="flex flex-col items-center h-full justify-start md:justify-center w-full gap-4">
                {/* <Editor inputchars={inputchars} setInputchars={setInputchars} /> */}
                <div className="w-full flex flex-col max-w-90">
                    {
                        card ? (
                            <div className="flex flex-col gap-1 items-center w-full">
                                <Flashcard card={card} />
                                <Button onClick={toggleCardSide} variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5"><RepeatIcon />  </Button>
                            </div>
                        ) : (
                            <FlashcardNotFound />
                        )
                    }
                    <SlideBtns />
                </div>
            </div>
        </div >
    );
}

function SlideBtns() {
    return (
        <div className="w-full gap-4 flex justify-between">
            <Button variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5"><ArrowLeftIcon /> </Button>
            <Button variant="secondary" className="[&>svg]:w-5 [&>svg]:h-5"><ArrowRightIcon /> </Button>
        </div>
    );
}

function Flashcard({ card }: { card: TFlashcard }) {
    return (
        <div className="perspective-distant min-h-100 max-h-100 w-full max-w-90">
            <FlashcardFace side={CardSide.Front} content={card.front} />
            <FlashcardFace side={CardSide.Back} content={card.back} />
        </div>
    );
}

function FlashcardFace({ side, content }: { side: TCardSide, content: string }) {
    return (
        <div className="relative">
            <span className="rounded bg-gray-600 text-white absolute top-2 left-2 p-0.5">{side}</span>
            <Renderer inputchars={content} className="relative" />
        </div>
    );
}
