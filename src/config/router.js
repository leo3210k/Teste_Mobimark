import { createBrowserRouter } from "react-router-dom";
import App from "../main/App";
import Main from "../components/Main";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
]);

export default router