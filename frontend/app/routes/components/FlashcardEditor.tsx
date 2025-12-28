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
        <div className="perspective-distant transform-3d relative h-120 max-h-120 w-full max-w-90">
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", isFlipped ? "rotate-y-180" : "")}>
                <Editor text={card.front} updateText={(front) => updateFront(front)} />
                <span className="rounded-full bg-gray-600 text-white absolute top-1 left-4 px-2 py-0.5">{CardSide.Front}</span>
            </div >
            <div className={cn("absolute inset-0 transition-all duration-800 backface-hidden", isFlipped ? "rotate-y-0" : "-rotate-y-180")}>
                <Editor text={card.back} updateText={(back) => updateBack(back)} />
                <span className="rounded-full bg-gray-600 text-white absolute top-1 left-4 px-2 py-0.5">{CardSide.Back}</span>
            </div >
        </div>
    );
}
