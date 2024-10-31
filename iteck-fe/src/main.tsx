import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error";
import App from "./App";
import Main from "./containers/main";
import Login from "./containers/login";
import SignUp from "./containers/signup";
import Create from "./containers/create";
import CreateAnalysis from "./pages/analysis";
import CreateSimulation from "./pages/simulation";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "create",
        children: [
          {
            path: "",
            element: <Create />,
          },
          {
            path: "analysis",
            element: <CreateAnalysis />,
          },
          {
            path: "simulation",
            element: <CreateSimulation />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
