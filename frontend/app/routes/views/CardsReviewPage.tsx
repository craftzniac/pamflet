import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel, type CarouselApi } from "~/components/ui/carousel";
import BottomNav from "../components/BottomNav";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Renderer from "~/pamflet/Renderer";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { FlashcardPreview } from "../components/FlashcardPreview";
import { flashcards } from "~/mock-data";
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import type { TFlashcard } from "~/types";

export default function CardsReviewPage() {
    const [api, setApi] = useState<CarouselApi | undefined>(undefined)
    const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null)
    const [currentCard, setCurrentCard] = useState<TFlashcard | null>(null)
    const [count, setCount] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        if (!api) return
        setCount(api.scrollSnapList().length)
        setCurrentCardIndex(api.selectedScrollSnap())

        api.on("select", () => {
            const index = api.selectedScrollSnap()
            setCurrentCardIndex(index)
            setCurrentCard(flashcards[index])
        })
    }, [api])

    useEffect(() => {
        setIsFlipped(false)   // clear flip
    }, [currentCardIndex])

    function toggleCurrentCardFlip() {
        setIsFlipped(prev => !prev)
    }

    return (
        <div className="w-full h-full flex flex-col">
            <header className="p-2 md:p-4 flex items-center gap-1">
                <BackButton />
                <h1 className="font-medium">Cards Review</h1>
            </header>
            <main className="h-full flex flex-col p-4 items-center bg-gray-100 overflow-y-auto">
                <div className={cn("flex justify-end w-full", typeof currentCardIndex === "number" ? "opacity-100" : "opacity-0")}>
                    {currentCardIndex != null ? currentCardIndex + 1 : ""}/{count}
                </div>
                <div className="flex flex-col gap-2 relative w-full max-w-md h-fit">
                    <div className="w-full justify-end flex">
                        <Button className="" variant="outline" size="icon" asChild disabled={currentCard == null}>
                            <Link to={`/edit-cards/${currentCard?.id}`}>
                                <img src="/pencil.svg" alt="" />
                            </Link>
                        </Button>
                    </div>
                    <Carousel className="w-full h-full flex" setApi={setApi}>
                        <CarouselContent className="h-full p-1">
                            {flashcards.map((card, index) => (
                                <CarouselItem key={card.id} className="flex justify-center w-full h-full">
                                    <FlashcardPreview card={card} isFlipped={
                                        index == currentCardIndex ? isFlipped : false
                                    } />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                    <div className="w-full flex justify-center">
                        <Button variant="secondary" size="icon" onClick={toggleCurrentCardFlip}>
                            <img src="/arrow_counter_clockwise.svg" alt="arrow counter clockwise" className="w-6" />
                        </Button>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    )
}
