import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/layouts/RootLayout.tsx", [
    index("routes/views/index.tsx"),
    route("decks", "routes/views/decks/index.tsx"),

    route("decks/:deckId", "routes/layouts/DeckLayout.tsx", [
      route("cards", "routes/views/decks/deck/cards.tsx"),   // used in  mobile screens
      route("cards-slide/:flashcardIndex", "routes/views/decks/deck/cards-slide.tsx"),
      route("edit/cards", "routes/views/decks/deck/edit/cards.tsx"),
      route("edit/cards-slide", "routes/views/decks/deck/edit/cards-slide.tsx"),   // used in mobile screens
    ]),

    route("profile", "routes/views/profile.tsx"),
  ]),
] satisfies RouteConfig; 
