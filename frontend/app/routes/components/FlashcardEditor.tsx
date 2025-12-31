import { CardSide } from "~/constants";
import Editor from "~/pamflet/Editor";
import type { TFlashcard } from "~/types";
import { cn } from "~/utils";

export function FlashcardEditor({ card, isFlipped, updateFront, updateBack }: {
    card: TFlashcard,
    isFlipped: boolean,
    updateFront: (front: string) => void,
    updateBack: (back: string) => void
}) {
    return (
        <div className="perspective-distant transform-3d relative w-60 lg:w-70 2xl:w-100 aspect-[3/4]">
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden w-full  h-full", isFlipped ? "rotate-y-180" : "")}>
                <Editor text={card.front} updateText={(front) => updateFront(front)} />
                <span className="rounded-full bg-gray-700 text-white absolute text-sm top-1 left-1 px-2 py-0.5">{CardSide.Front}</span>
            </div >
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", isFlipped ? "rotate-y-0" : "-rotate-y-180")}>
                <Editor text={card.back} updateText={(back) => updateBack(back)} />
                <span className="rounded-full bg-gray-700 text-white absolute text-sm top-1 left-1 px-2 py-0.5">{CardSide.Back}</span>
            </div >
        </div>
    );
}
