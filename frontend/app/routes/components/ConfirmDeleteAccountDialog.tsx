import { Button } from "~/components/ui/button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { TrashIcon } from "lucide-react";

export default function ConfirmDeleteAccountDialog() {
    return (
        <ConfirmDeleteDialog showAlertIcon title="Delete Account" description="This will permanently delete your account along with all your data. This action cannot be undone"
            triggerButton={
                <Button variant="outlineDestructive" className="gap-2 w-fit justify-start">
                    <TrashIcon />
                    <span>Delete Account</span>
                </Button>
            }
        />
    )
}
