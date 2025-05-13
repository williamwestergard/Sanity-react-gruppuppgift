import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import FunFacts from "./pages/fun-facts/FunFacts.jsx";
import NotFoundPage from "./pages/not-found-page/NotFoundPage.jsx";
import TimePeriods from "./pages/time-periods/TimePeriods.jsx";
import DinosaursToday from "./pages/dinosaurs-today/DinosaursToday.jsx";
import Search from "./pages/search-page/Search.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/time-periods", element: <TimePeriods /> },
  { path: "/dinosaurs-today", element: <DinosaursToday /> },
  { path: "/fun-facts", element: <FunFacts /> },
  { path: "/search", element: <Search /> },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
