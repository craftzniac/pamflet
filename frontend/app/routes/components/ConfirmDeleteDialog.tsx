import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react"
import type { ReactNode } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel } from "~/components/ui/alert-dialog"

type Props = {
    title: string,
    description: string,
    triggerButton: ReactNode,
    showAlertIcon?: boolean
}

export default function ConfirmDeleteDialog({
    title, description, triggerButton, showAlertIcon =  false
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerButton}
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-90">
                <AlertDialogHeader>
                    {
                        showAlertIcon && (
                            <AlertTriangleIcon className="text-destructive" />
                        )
                    }
                    <AlertDialogTitle className="text-xl text-destructive">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-900">{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-destructive/90 hover:bg-destructive">Proceed</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
