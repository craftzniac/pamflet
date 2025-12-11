import { Trash } from "lucide-react";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/utils";

type Props = React.ComponentProps<"button"> & {
    variant?: keyof typeof variants
};

type TVariants = {
    primary: ClassNameValue,
    secondary: ClassNameValue,
    link: ClassNameValue,
    icon: ClassNameValue,
    text: ClassNameValue,
    destructive: ClassNameValue
};

const variants: TVariants = {
    primary: `bg-purple-500 text-white hover:bg-purple-600`,
    secondary: `border-gray-400 border-[1px] bg-white hover:bg-gray-100`,
    destructive: `border-red-300 text-red-500 border-[1px] hover:bg-red-100`,
    icon: `text-gray-800 p-2.5 rounded-full bg-white hover:bg-gray-100`,
    text: `p-2.5 rounded-full bg-white hover:bg-gray-100`,
    link: `underline text-purple-500`,
}
function getVariantStyle(variant: keyof typeof variants): ClassNameValue {
    switch (variant) {
        case "primary": return variants.primary;
        case "secondary": return variants.secondary;
        case "destructive": return variants.destructive;
        case "icon": return variants.icon;
        case "text": return variants.text;
        case "link": return variants.link;
        default: return "";
    }
}

export default function Button({ variant = "primary", children, ...props }: Props) {
    return (
        <button {...props} className={cn("text-sm rounded transition-colors disabled:pointer-events-none disabled:opacity-40 duration-300 cursor-pointer font-medium px-4 py-2.5 gap-1 [&>svg]:w-4 [&>svg]:h-4 flex items-center justify-center text-gray-800 w-fit", getVariantStyle(variant), props.className)} >
            {variant === "destructive" && <Trash />}
            {children}
        </button>
    );
}
