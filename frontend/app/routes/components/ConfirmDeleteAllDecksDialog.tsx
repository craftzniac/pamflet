import { Button } from "~/components/ui/button"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"
import { TrashIcon } from "lucide-react"

export default function ConfirmDeleteAllDecksDialog() {
    return (
        <ConfirmDeleteDialog title="Delete All Deck" description="This will permanently delete all your decks. This action cannot be undone" triggerButton={
            <Button variant="outlineDestructive" className="gap-2 w-fit justify-start">
                <TrashIcon />
                <span>Delete All Decks</span>
            </Button>
        }
        />
    )
}
