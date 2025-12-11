import { redirect } from "react-router";

export function loader() {
    return redirect("/decks");
}

export default function HomePage() {
    return (
        <div className="w-full h-full flex">
            home
        </div>
    );
}
