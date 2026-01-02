import { Link, useLocation } from "react-router"
import { navItems } from "~/constants"
import { cn, isCurrentParentNavPath } from "~/utils"

export default function BottomNav() {
    const pathname = useLocation().pathname
    return (
        <nav className="w-full lg:hidden">
            <ul className="flex justify-between gap-2 items-center w-full">
                {
                    navItems.map(it => (
                        <li key={it.id} className="flex px-3 py-1.5">
                            <Link to={it.url} className={cn("flex flex-col items-center gap-0 group", isCurrentParentNavPath(pathname, it.url) ? "text-primary" : "")}>
                                <div className={cn("px-2.5 py-1 group-hover:bg-gray-100 rounded-full", isCurrentParentNavPath(pathname, it.url) ? "bg-primary/10" : "")}>
                                    <it.icon isSelected={isCurrentParentNavPath(pathname, it.url)} />
                                </div>
                                <span className="text-xs font-medium">{it.text}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
