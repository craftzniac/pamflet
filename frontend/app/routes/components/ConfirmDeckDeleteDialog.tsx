import { Button } from "~/components/ui/button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { TrashIcon } from "lucide-react";

type Props = { showLabel?: boolean }

export default function ConfirmDeckDeleteDialog({ showLabel = false }: Props) {
    return (
        <ConfirmDeleteDialog title="Delete Deck" description="Are you sure you want to delete this deck?" triggerButton={
            <Button variant="ghost" className="gap-2 w-full justify-start text-destructive hover:text-destructive">
                <TrashIcon />
                {showLabel && <span>Delete</span>}
            </Button>
        }
        />
    )
}
