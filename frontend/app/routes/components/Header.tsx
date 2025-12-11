import { Link, useLocation } from "react-router";
import { useGlobalContext } from "../contexts/GlobalProvider";

function getTitle(path: string): string | null {
    let title: string | null = "Decks";
    if (path == "/") {
        title = "Decks";
    } else if (path == "/profile") {
        title = "Profile";
    } else if (path.match(/^\/decks\/([a-zA-Z0-9_-]+)([\/a-zA-Z0-9_-]*)$/)) {
        title = null;   // basically hide the header
    }
    return title;
}

export default function Header() {
    const { user } = useGlobalContext();
    const location = useLocation();
    const returns = getTitle(location.pathname);
    if (returns === null) {
        return <></>    // hide this header 
    }

    const title = returns;
    return (
        <div className="lg:p-4">
            <header className="flex gap-4 rounded-b-lg shadow lg:rounded-lg p-4 bg-gray-100 justify-between items-center w-full">
                <h1 className="text-base font-medium capitalize">{title}</h1>
                <Link to="/profile" className="w-8  capitalize h-8 rounded-full flex items-center justify-center bg-gray-300 text-xl font-medium">{user.username[0] ?? "P"}</Link>
            </header>
        </div>
    );
}
