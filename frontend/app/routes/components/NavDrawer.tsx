import { navItems } from "~/constants";
import Logo from "./Logo";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils";
import { Link, useLocation } from "react-router";

export default function NavDrawer() {
    const pathname = useLocation().pathname
    const username = "james"
    return (
        <div className="py-4 px-3 hidden lg:flex flex-col w-60 gap-8">
            <div className="flex items-center gap-1">
                <Logo />
                <span className="text-xl font-medium">Pamflet</span>
            </div>

            <nav className="flex flex-col h-full">
                <ul className="flex flex-col gap-2 items-center w-full h-full">
                    <li className="flex w-full h-fit">
                        <Button variant="ghost" asChild className="px-2">
                            <Link to="/cards-review/setup" className={cn("hover:bg-foreground rounded-md p-2 w-full flex items-center", pathname.startsWith("/cards-review") ? "bg-purple-100" : "")}>
                                <img src="/nav_card_review.svg" alt="" className="w-6" />
                                <span className="w-full">Cards Review</span>
                            </Link>
                        </Button>
                    </li>
                    <li className="flex w-full h-fit">
                        <Button variant="ghost" asChild className="px-2 hover:bg-gray-100">
                            <Link to="/manage-decks" className={cn("rounded-md p-2 w-full flex items-center", pathname == "/manage-decks" ? "bg-purple-100" : "")}>
                                <img src="/nav_cardholder.svg" alt="" className="w-6" />
                                <span className="w-full">Manage Decks</span>
                            </Link>
                        </Button>
                    </li>
                </ul>

                <li>
                    <Button variant="outline" asChild className="px-2">
                        <Link to="/profile" className={cn("flex items-center gap-2 w-full justify-start", pathname == "/profile" ? "bg-purple-100 border-purple-300" : "")}>
                            <span className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-full capitalize">{username[0] ?? "P"}</span>
                            <span className="">{username}</span>
                        </Link>
                    </Button>
                </li>
            </nav>
        </div>
    )
}
