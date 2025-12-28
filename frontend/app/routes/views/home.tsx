import { Button } from "~/components/ui/button";
import Logo from "../components/Logo";
import Playstore from "/playstore.svg"
import { Link } from "react-router";

export default function HomePage() {
    return (
        <div className="h-full w-full flex flex-col">
            <header className="w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo />
                    <p className="font-medium">Pamflet</p>
                </div>
                <div className="flex gap-2">
                    <Button className="rounded-full text-sm" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
            </header>
            <main className="h-full w-full overflow-y-auto flex justify-center items-center">
                <div className="w-full p-4 lg:p-8 flex flex-col gap-8 items-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4 flex-col">
                            <img src="/logo.svg" alt="logo" className="w-20 md:w-36 lg:w-[10rem]"/>
                            <h1 className="text-[2rem] lg:text-[6rem] font-medium">Pamflet</h1>
                        </div>
                        <p className="text-gray-700 text-center lg:text-start lg:text-xl">Elevate your flashcard game by using interactive flashcards</p>
                    </div>
                    <Button variant={"outline"} size="lg" className="flex items-center gap-1 bg-color-white p-6">
                        <img src={Playstore} alt="google playstore" className="w-8" />
                        <span className="text-lg"> Get Android app </span>
                    </Button>
                </div>
            </main>
        </div>
    );
}
