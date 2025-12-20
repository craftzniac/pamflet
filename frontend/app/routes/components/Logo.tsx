import { cn } from "~/utils";

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <img src="/logo.svg" className={cn("w-8 h-8", className)} />
    );
}
