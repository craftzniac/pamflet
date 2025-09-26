import type { ClassNameValue } from "tailwind-merge";
import Button from "~/routes/components/Button";
import { cn } from "~/utils";

export default function DeleteDeckBtn({ deckId, className = "" }: { deckId: string, className?: ClassNameValue }) {
    return (
        <Button variant="destructive" className={cn(className)}> Delete Deck</Button>
    );
}
