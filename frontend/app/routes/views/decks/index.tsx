import { PlusIcon } from "lucide-react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import Button from "~/routes/components/Button";
import { generateId } from "~/utils";
import { decks } from "~/mock-data";
import type { TDeck } from "~/types";
import { useMediaQuery } from "~/hooks";

export default function DecksPage() {
    return (
        <div className="overflow-y-auto w-full h-full flex flex-col p-4 gap-4 items-end">
            <Button>
                <PlusIcon /> Add Deck
            </Button>
            <ul className="h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 max-w-[2000px] w-full">
                {decks.map(deck => <li className="flex justify-center" key={deck.id}><Deck deck={deck} /></li>)}
            </ul>
            <Outlet />
        </div>
    );
}

type TColorCard = { id: string, bg: string, rotate: string };

function shuffleColorCards(): TColorCard[] {
    const rotates = [
        "origin-bottom -rotate-5 group-hover:-rotate-25 -translate-x-4 transition-all duration-300",
        "origin-bottom -rotate-1 group-hover:-rotate-5 transition-all duration-300",
        "origin-bottom rotate-5 group-hover:rotate-12 transition-all duration-300",
        "origin-bottom rotate-10 group-hover:rotate-25 translate-x-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-8",
    ];

    let bgCols = ["bg-[#EDBCA2]", "bg-[#92967A]", "bg-[#F68080]", "bg-[#B1B79F]"];

    const colorCards: TColorCard[] = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * bgCols.length);
        const color = bgCols[randomIndex];
        colorCards.push({ id: generateId(), rotate: rotates[i], bg: color });
        // remove the bgCol 
        bgCols = bgCols.filter(col => col != color);
    }
    return colorCards;
}

function Deck({ deck }: { deck: TDeck }) {
    const [isMobile] = useMediaQuery();
    return (
        <Link to={isMobile ? `/decks/${deck.id}/cards` : `/decks/${deck.id}/cards-slide/1`} className="min-h-0 rounded-lg group px-6 py-8 bg-gray-100 shadow w-full max-w-70 flex flex-col gap-10 hover:bg-gray-200 transition-colors duration-300">
            <div className="flex relative h-full w-full justify-center items-center">
                <div className="relative border-purple-800 w-25 h-35">
                    {
                        shuffleColorCards().map(cd => <span key={cd.id} className={`${cd.bg} ${cd.rotate}  rounded-lg inset-0 absolute`}></span>)
                    }
                </div>
            </div>
            <span className="flex gap-4 items-center">
                <h2 className="font-medium text-base lg:text-lg line-clamp-2 w-full">{deck.name}</h2>
                <span className="text-sm">{deck.cards.length}</span>
            </span>
        </Link>
    );
}
