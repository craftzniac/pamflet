import { Button } from "~/components/ui/button";
import BackButton from "../components/BackButton";
import { TrashIcon } from "lucide-react";
import CardForm from "../components/CardForm";
import { useState } from "react";
import { flashcards } from "~/mock-data";

export default function EditCardPage() {
    const card = flashcards[0]
    return (
        <div className="flex flex-col h-full w-full">
            <header className="p-2 md:p-4 flex justify-center gap-1">
                <BackButton />
                <div className="flex justify-center flex-col w-full">
                    <h1 className="font-medium">Edit Card</h1>
                </div>
                <div className="flex items-center gap-0.5">
                    <Button variant="ghost">
                        <TrashIcon className="w-6 text-destructive" />
                    </Button>
                </div>
            </header>
            <main className="h-full w-full overflow-y-auto bg-gray-50 p-4">
                <CardForm mode="edit" initialCardState={card} />
            </main>
        </div>
    )
}
