import type { TDeckWithCardCount } from "~/types";
import DeckFormDialog from "./DeckFormDialog";
type Props = { showLabel?: boolean }

export default function EditDeckDialog({ showLabel = false }: Props) {
    const deck: TDeckWithCardCount = { id: "akdasdf", name: "borrow checker in rust", cardCount: 3 }
    return (
        <DeckFormDialog mode="edit" deck={deck} showTriggerButtonLabel={showLabel} />
    )
}
