import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import DidYouKnow from "./pages/did-you-know/DidYouKnow.jsx";
import NotFoundPage from "./pages/not-found-page/NotFoundPage.jsx";
import TimePeriods from "./pages/time-periods/TimePeriods.jsx";
import DinosaursToday from "./pages/dinosaurs-today/DinosaursToday.jsx";
import Search from "./pages/search-page/Search.jsx";
import DinosaursIndex from "./pages/dinosaurs-index/DinosaursIndex.jsx";
import FeaturedDinos from "./pages/featured-dinos/FeaturedDinos.jsx";
import DinoIndexFacts from "./pages/dinosaurs-index/dinosaurs-index-facts/DinoIndexFacts.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dinosaurs-index", element: <DinosaursIndex /> },
  { path: "/dinosaurs-index/:name", element: <DinoIndexFacts /> },
  { path: "/time-periods", element: <TimePeriods /> },
  { path: "/dinosaurs-today", element: <DinosaursToday /> },
  { path: "/did-you-know", element: <DidYouKnow /> },
  { path: "/featured-dinos", element: <FeaturedDinos /> },

  { path: "/search", element: <Search /> },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
