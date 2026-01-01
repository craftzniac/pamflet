import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/views/HomePage.tsx"),
  layout("routes/layouts/AuthLayout.tsx", [
    route("/login", "routes/views/auth/LoginPage.tsx"),
    route("/signup", "routes/views/auth/SignupPage.tsx"),
  ]),
  layout("routes/layouts/MainAppLayout.tsx", [
    route("/cards-review/setup", "routes/views/SetupCardsReviewPage.tsx"),
    route("/cards-review", "routes/views/CardsReviewPage.tsx"),
    route("/manage-decks", "routes/views/ManageDecksPage.tsx"),
    // route("/manage-decks/:deckId/cards", "routes/views/ManageDeckCardsPage.tsx"),  
    route("/manage-decks/:deckId/cards/:cardId?", "routes/views/ManageDeckCardsPage.tsx"),  // used for card edit on large screens
    route("/edit-cards/:cardId", "routes/views/EditCardPage.tsx"),    // used for card edit on small screens
    route("/manage-decks/:deckId/add-card", "routes/views/AddCardPage.tsx"),    
    route("/profile", "routes/views/ProfilePage.tsx"),
  ]),
] satisfies RouteConfig; 
