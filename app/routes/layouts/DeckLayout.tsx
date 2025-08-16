import { Link, Outlet, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/DeckLayout";
import { decks } from "~/mock-data";
import Button from "../components/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalProvider";
import DeckProvider from "../contexts/DeckProvider";

export function loader({ params, request }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname;
  if (pathname === `/decks/${params.deckId}`) {    // redirect to the /decks/:id/cards route
    return redirect(`/decks/${params.deckId}/cards`);
  }

  const deckId = params.deckId;
  const deck = decks.find(deck => deck.id === deckId);
  if (!deck) {
    return {
      status: 404,
      error: "Deck not found"
    }
  }
  return {
    status: 200,
    deck
  };
}

export default function DeckLayout({ loaderData }: Route.ComponentProps) {
  const deckFetch = loaderData;
  if (deckFetch.status !== 200 || deckFetch.deck == undefined) {
    return (
      <div className="flex flex-col h-full w-full">
        <Header />
        <div className="flex justify-center items-center p-4 flex-col gap-4 h-full overflow-y-auto">
          <h2 className="text-2xl font-medium">{deckFetch.error}</h2>
          <GoBackToDecksBtn />
        </div>
      </div>
    );
  }

  const deck = deckFetch.deck;
  return (
    <DeckProvider deck={deck}>
      <div className="flex flex-col h-full w-full">
        <Header deckName={deck.name} />
        <Outlet />
      </div>
    </DeckProvider>
  );
}

function Header({ deckName }: { deckName?: string }) {
  const { user } = useGlobalContext();
  const username = user.username;
  return (
    <div className="lg:p-4">
      <header className="flex gap-4 rounded-b-lg shadow lg:rounded-lg ps-2.5 pe-4  py-3 bg-gray-100 justify-between items-center w-full">
        <div className="flex items-center lg:gap-1">
          <BackNavigationBtn />
          <h1 className="text-base font-medium line-clamp-1">{deckName ?? "Deck"}</h1>
        </div>
        <Link to="/profile" className="w-8 h-8 rounded-full flex capitalize items-center justify-center bg-gray-300 text-xl font-medium">{username.length > 0 ? username[0] : "P"}</Link>
      </header>
    </div>
  );
}

function GoBackToDecksBtn() {
  return (
    <Link to="/decks" className="text-sm rounded transition-colors duration-300 cursor-pointer font-medium px-4 py-2.5 gap-1 [&>svg]:w-4 [&>svg]:h-4 flex items-center justify-center w-fit bg-purple-500 text-white hover:bg-purple-600"><ArrowLeftIcon /> Go to Decks</Link>
  );
}

function BackNavigationBtn() {
  const navigate = useNavigate();
  return (
    <Button variant="icon" className="[&>svg]:w-5 [&>svg]:h-5 bg-transparent hover:bg-gray-200 p-2.5" onClick={() => navigate(-1)}>
      <ArrowLeftIcon />
    </Button>
  );
}
