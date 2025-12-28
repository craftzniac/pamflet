import { CardSide } from "~/constants";
import Renderer from "~/pamflet/Renderer";
import type { TFlashcard } from "~/types";
import { cn } from "~/utils";

export function FlashcardPreview({ card, isFlipped }: { card: TFlashcard, isFlipped: boolean }) {
    return (
        <div className="perspective-distant transform-3d relative w-80 lg:w-90 2xl:w-100 aspect-[3/4]">
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden w-full  h-full", isFlipped ? "rotate-y-180" : "")}>
                <Renderer inputchars={card.front} className="relative" />
                <span className="rounded-full bg-gray-700 text-white absolute top-1 left-1 px-2 py-0.5">{CardSide.Front}</span>
            </div >
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", isFlipped ? "rotate-y-0" : "-rotate-y-180")}>
                <Renderer inputchars={card.back} className="relative" />
                <span className="rounded-full bg-gray-700 text-white absolute top-1 left-1 px-2 py-0.5">{CardSide.Back}</span>
            </div >
        </div>
    );
}
