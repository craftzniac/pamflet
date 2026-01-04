import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import TextField from "./TextField";
import { Button } from "~/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import type { TDeckWithCardCount } from "~/types";

type Props = ({ mode: "edit", deck: TDeckWithCardCount } | { mode: "add" }) & { showTriggerButtonLabel?: boolean }

export default function DeckFormDialog({ mode, showTriggerButtonLabel = false }: Props) {
    //TODO: use the deck object later for edit 
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {
                        mode === "edit" ? (
                            <Button variant="ghost" className="w-full  justify-start">
                                <PencilIcon />
                                {
                                    showTriggerButtonLabel && <span>Edit</span>
                                }
                            </Button>
                        ) : (
                            <Button className="w-full">
                                <PlusIcon />
                                {
                                    showTriggerButtonLabel && <span>Add Deck</span>
                                }
                            </Button>
                        )
                    }
                </DialogTrigger>
                <DialogContent className="sm:max-w-90">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{mode === "edit" ? "Edit Deck" : "Add Deck"}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <TextField id="deck-name" label="Name" />
                    </div>
                    <DialogFooter>
                        <Button className="gap-1 items-center">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
