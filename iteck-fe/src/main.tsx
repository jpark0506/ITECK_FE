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
import ExpView from "./containers/view";
import FileForm from "./pages/exp/fileform";
import Analysis from "./pages/view/analysis";
import Simulation from "./pages/view/simulation";
import FactorSelectView from "./pages/view/factorSelectView";
import SimulationForm from "./pages/simulation";

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
        path: "/view/:id",
        element: <ExpView />,
      },
      {
        path: "/view/:id/analysis",
        element: <Analysis />
      },
      {
        path: "/view/:id/simulation",
        element: <SimulationForm />
      },
      {
        path: "/view/:id/factor/select",
        element: <FactorSelectView />
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
            element: <Simulation />,
          },

        ],
      }, {
        path: "/upload",
        element: <FileForm />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
