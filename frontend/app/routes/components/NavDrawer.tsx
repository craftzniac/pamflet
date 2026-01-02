import { navItems as _navItems } from "~/constants";
import Logo from "./Logo";
import { Button } from "~/components/ui/button";
import { cn, isCurrentParentNavPath } from "~/utils";
import { Link, useLocation } from "react-router";
import { BookOpen as BookIcon, Library as CardholderIcon } from "lucide-react"


export default function NavDrawer() {
    const pathname = useLocation().pathname
    const username = "james"
    const navItems = _navItems.slice(0, 2)
    return (
        <div className="py-4 px-3 hidden lg:flex flex-col w-60 gap-8">
            <div className="flex items-center gap-1">
                <Logo />
                <span className="text-xl font-medium">Pamflet</span>
            </div>

            <nav className="flex flex-col h-full gap-2">
                <ul className="flex flex-col gap-2 items-center w-full h-full">
                    <div className="flex flex-col w-full gap-2 h-full">
                        {
                            navItems.map(it => (
                                <li key={it.id} className="flex w-full h-fit">
                                    <Button variant="ghost" asChild className="px-2 hover:bg-gray-100" size="lg">
                                        <Link to={it.url} className={cn("hover:bg-foreground rounded-md p-2 w-full flex items-center", isCurrentParentNavPath(pathname, it.url) ? "bg-purple-100" : "")}>
                                            <it.icon isSelected={isCurrentParentNavPath(pathname, it.url)} />
                                            <span className={`w-full ${isCurrentParentNavPath(pathname, it.url) ? "text-primary" : ""}`}>{it.text}</span>
                                        </Link>
                                    </Button>
                                </li>
                            ))
                        }
                    </div>
                    <li className="w-full">
                        <Link to="/profile" className={cn("px-2 py-2 rounded-md font-medium flex items-center gap-2 w-full justify-start border-1", pathname.startsWith("/profile") ? "bg-purple-100 border-purple-300" : "")}>
                            <span className="w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full capitalize">{username[0] ?? "P"}</span>
                            <span className={pathname.startsWith("/profile") ? "text-primary" : ""}>{username}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
