import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
type Props = {
    id: string,
    type?: HTMLInputElement["type"],
    label: string,
    msg?: ErrMsg | InfoMsg,
    disabled?: boolean
}

type ErrMsg = { type: "error", message: string }
type InfoMsg = { type: "info", message: string }

function isInfoMsg(msg: any): msg is InfoMsg {
    return Object.hasOwn(msg, "type") && msg.type == "info"
}

export default function TextField({ id, label, type = "text", msg = undefined, disabled = false }: Props) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <Label aria-disabled={disabled} htmlFor={id}>{label}</Label>
            <Input id={id} type={type} disabled={disabled} className="w-full" />
            {
                msg !== undefined && (isInfoMsg(msg) ? (
                    <p className="text-sm text-foreground">{msg.message}</p>
                ) : (
                    <p className="text-sm text-destructive">{msg!!.message}</p>
                ))
            }
        </div>
    )
}
