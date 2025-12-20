import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

// export default [
//   route("/", "routes/layouts/RootLayout.tsx", [
//     index("routes/views/index.tsx"),
//     route("decks", "routes/views/decks/index.tsx"),
//
//     route("decks/:deckId", "routes/layouts/DeckLayout.tsx", [
//       route("cards", "routes/views/decks/deck/cards.tsx"),   // used in  mobile screens
//       route("cards-slide/:flashcardIndex", "routes/views/decks/deck/cards-slide.tsx"),
//
//       route("edit/cards", "routes/views/decks/deck/edit/cards.tsx"),// used in mobile screens
//       route("edit/cards-slide/:flashcardIndex", "routes/views/decks/deck/edit/cards-slide.tsx"),
//     ]),
//
//     route("profile", "routes/views/profile.tsx"),
//   ]),
// ] satisfies RouteConfig; 
//


export default [
  index("routes/views/home.tsx"),
  layout("routes/layouts/AuthLayout.tsx", [
    route("/login", "routes/views/auth/login.tsx"),
    route("/signup", "routes/views/auth/signup.tsx"),
  ]),

  // layout("routes/views/layouts/MainLayout.tsx", [
  //   route("/", "routes/views/")
  // ]),

  // route("/", "routes/layouts/RootLayout.tsx", [
  //   index("routes/views/index.tsx"),
  //   route("decks", "routes/views/decks/index.tsx"),
  //
  //   route("decks/:deckId", "routes/layouts/DeckLayout.tsx", [
  //     route("cards", "routes/views/decks/deck/cards.tsx"),   // used in  mobile screens
  //     route("cards-slide/:flashcardIndex", "routes/views/decks/deck/cards-slide.tsx"),
  //
  //     route("edit/cards", "routes/views/decks/deck/edit/cards.tsx"),// used in mobile screens
  //     route("edit/cards-slide/:flashcardIndex", "routes/views/decks/deck/edit/cards-slide.tsx"),
  //   ]),
  //
  //   route("profile", "routes/views/profile.tsx"),
  // ]),
] satisfies RouteConfig; 
